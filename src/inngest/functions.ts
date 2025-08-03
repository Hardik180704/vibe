import { z } from "zod";
import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent, createTool, createNetwork,type Tool, type Message, createState } from "@inngest/agent-kit";
import { inngest } from "./client";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";
import { FRAGMENT_TITLE_PROMPT, PROMPT, RESPONSE_PROMPT } from "@/prompt";
import { prisma } from "@/lib/db";
import { isArray } from "util";

interface AgentState {
  summary: string;
  files: {[path: string]: string};
}

export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-web-builder");
      return sandbox.sandboxId;
    });

    const previousMessages = await step.run("get-previous-messages", async () => {
      const formattedMessages: Message[] = [];
      const messages = await prisma.message.findMany({
        where: {
          projectId: event.data.projectId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      for (const message of messages) {
        formattedMessages.push({
          type: "text",
          role: message.role === "ASSISTANT" ? "assistant" : "user",
          content:  message.content,
        });
      }

      return formattedMessages;
    });

    const state = createState<AgentState>({
      summary: "",
      files: {},
    },
    {
      messages: previousMessages,
    }
  );

    const codeAgent = createAgent<AgentState>({
      name: "code-agent",
      description: "An expert coding agent",
      system: PROMPT,
      model: openai({
        model: "gpt-4.1",
        defaultParameters: {
          temperature: 0.1,
        },
      }),
      tools: [
        createTool({
          name: "terminal",
          description: "Use the terminal to run commands",
          parameters: z.object({
            command: z.string(),
          }) as any,
          handler: async ({ command }, { step }) => {
            return await step?.run("run-terminal-command", async () => {
              const buffers = { stdout: "", stderr: "" };
              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                  },
                });
                return result.stdout;
              } catch (e) {
                console.log(`Command failed: ${e}\nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}`);
                return `Command failed: ${e}\nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}`;
              }
            });
          },
        }),

        createTool({
          name: "createOrUpdateFiles",
          description: "Create or update files in the sandbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              })
            ),
          }),
          handler: async ({ files }, { step, network }: Tool.Options<AgentState>) => {
            if (!network) throw new Error("Network is undefined");

            const updatedFiles = await step?.run("update-files-in-sandbox", async () => {
              try {
                const currentFiles = network.state.data.files || {};
                const sandbox = await getSandbox(sandboxId);
                for (const file of files) {
                  await sandbox.files.write(file.path, file.content);
                  currentFiles[file.path] = file.content;
                }
                return currentFiles;
              } catch (e) {
                return "Error: " + e;
              }
            });

            if (typeof updatedFiles === "object") {
              network.state.data.files = updatedFiles;
            }

            return updatedFiles;
          },
        }),

        createTool({
          name: "readFiles",
          description: "Read files from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step }) => {
            return await step?.run("read-files-from-sandbox", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents = [];

                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }

                return JSON.stringify(contents);
              } catch (e) {
                return "Error: " + e;
              }
            });
          },
        }),
      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText = lastAssistantTextMessageContent(result);
          if (lastAssistantMessageText?.includes("<task_summary>") && network) {
            network.state.data.summary = lastAssistantMessageText;
          }
          return result;
        },
      },
    });

    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents: [codeAgent],
      maxIter: 15,
      defaultState: state,
      router: async ({ network }) => {
        const summary = network?.state?.data?.summary;
        if (summary) return;
        return codeAgent;
      },
    });

    const result = await network.run(event.data.value, { state });

    const fragmentTitleGenerator = createAgent({
      name: "fragment-title-generator",
      description: "A fragment title generator",
      system: FRAGMENT_TITLE_PROMPT,
      model: openai({
        model: "gpt-4o",
      }),
    })

    const responseGenerator = createAgent({
      name: "response-generator",
      description: "A response generator",
      system: RESPONSE_PROMPT,
      model: openai({
        model: "gpt-4o",
      }),
    })

    const { output: fragmentTitleOutput } = await fragmentTitleGenerator.run(
      result.state.data.summary,
    )

    const { output: responseOutput } = await responseGenerator.run(
      result.state.data.summary,
    )

    const generateFragmentTitle = () => {
      const output = fragmentTitleOutput[0];

      if (output.type !== "text") {
        return "Fragment";
      }
      if (Array.isArray(output.content)) {
        return output.content.map((txt) => txt).join("");
      } else {
        return output.content;
      }
    }

    const generateResponse = () => {
      const output = responseOutput[0];

      if (output.type !== "text") {
        return "Here you go!";
      }
      if (Array.isArray(output.content)) {
        return output.content.map((txt) => txt).join("");
      } else {
        return output.content;
      }
    }

    const isError = 
      !result.state.data.summary ||
      Object.keys(result.state.data.files || {}).length === 0;

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    await step.run("save-result", async ()=>{
      if (isError) {
        return await prisma.message.create({
          data: {
            projectId: event.data.projectId,
            content : "Something went wrong. Please try again.",
            role: "ASSISTANT",
            type: "ERROR",
          },
        });
      }

      return prisma.message.create({
        data: {
          projectId: event.data.projectId,
          content: generateResponse(),
          role: "ASSISTANT",
          type: "RESULT",
          fragment: {
            create : {
              sandboxUrl: sandboxUrl,
              title : generateFragmentTitle(),
              files: result.state.data.files,
            }
          }
        }
      })
    })

    return {
      url: sandboxUrl,
      title: "Fragment",
      files: result?.state?.data?.files,
      summary: result?.state?.data?.summary,
    };
  }
);
