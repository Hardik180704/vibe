import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";
import { Fragment } from "@/generated/prisma";
import { MessageLoading } from "./message-loading";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

export const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions(
      {
        projectId: projectId,
      },
      {
        // TODO: Temporary live message update
        refetchInterval: 2000,
      }
    )
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === "ASSISTANT"
    );

    if (
        lastAssistantMessage?.fragment && 
        lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
        setActiveFragment(lastAssistantMessage.fragment);
        lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";

  return (
    <motion.div 
      className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className="pt-2 pr-1 bg-gradient-to-b from-gray-50/30 to-transparent dark:from-gray-900/30 dark:to-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {messages.length === 0 ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 px-8 py-16 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                delay: 0.3
              }}
            >
              <div className="absolute inset-0 opacity-30">
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/15 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/3 w-1 h-1 bg-indigo-400/25 rounded-full"
                  animate={{ 
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
              <motion.div 
                className="relative z-10 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <motion.div 
                  className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mx-auto"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <svg
                    className="w-8 h-8 text-blue-500 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Start Your Conversation
                </motion.h3>
                <motion.p 
                  className="text-center text-gray-500 dark:text-gray-400 max-w-sm"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Ask questions about your code, request modifications, or get help with debugging.
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ y: 50, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -50, opacity: 0, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    delay: index * 0.1
                  }}
                  layout
                >
                  <MessageCard
                    content={message.content}
                    role={message.role}
                    fragment={message.fragment}
                    createdAt={message.createdAt}
                    isActiveFragment={activeFragment?.id === message.fragment?.id}
                    onFragmentClick={() => setActiveFragment(message.fragment)}
                    type={message.type}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          {isLastMessageUser && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <MessageLoading />
            </motion.div>
          )}
          <div ref={bottomRef} />
        </motion.div>
      </div>
      <motion.div 
        className="relative p-3 pt-1 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          delay: 0.4
        }}
      >
        <motion.div
          className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent 
                to-gray-50 dark:to-gray-800 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
        <MessageForm projectId={projectId} />
      </motion.div>
    </motion.div>
  );
};
