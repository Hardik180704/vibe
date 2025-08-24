import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { motion } from "framer-motion";

interface Props {
    projectId: string;
}

const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required." })
        .max(10000, { message: "Value is too long" }),
})

export const MessageForm = ({ projectId }: Props) => {

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: "",
        },
    })

    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries(
                trpc.messages.getMany.queryOptions({projectId}),
            );
            // TODO: Invalidate Usage Status
        },
        onError: (error) => {
            // TODO: Redirect to pricing page if specific error 
            toast.error(error.message);
        },
    }));

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createMessage.mutateAsync({
            value: values.value,
            projectId,
        })
    };

    const [isFocused, setIsFocused] = useState(false);
    const showUsage = false;
    const isPending = createMessage.isPending;
    const isButtonDisabled = isPending || !form.formState.isValid;

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30,
                delay: 0.2
            }}
        >
            <Form {...form}>
                <motion.form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        "relative border p-4 pt-1 rounded-xl transition-all duration-200",
                        "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600",
                        "hover:border-gray-300 dark:hover:border-gray-500",
                        isFocused && "shadow-lg border-blue-300 dark:border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/50",
                        showUsage && "rounded-t-none",
                    )}
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <TextareaAutosize
                                    {...field}
                                    disabled={isPending}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    minRows={2}
                                    maxRows={8}
                                    className="pt-4 resize-none border-none w-full outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                    placeholder="What would you like to build?"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                            e.preventDefault();
                                            form.handleSubmit(onSubmit)(e);
                                        }
                                    }}
                                />
                            </motion.div>
                        )} />
                    <motion.div 
                        className="flex gap-x-2 items-end justify-between pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div 
                            className="text-[10px] text-gray-500 dark:text-gray-400 font-mono"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center
                            gap-1 rounded border bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-1.5 font-mono text-[10px] font-medium text-gray-600 dark:text-gray-300">
                                <span>&#8984;</span>Enter
                            </kbd>
                            &nbsp;to submit
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                            <Button
                                disabled={isButtonDisabled}
                                className={cn(
                                    "size-8 rounded-full transition-all duration-200 group relative overflow-hidden",
                                    "bg-blue-500 hover:bg-blue-600 border-0 shadow-md hover:shadow-lg",
                                    "dark:bg-blue-600 dark:hover:bg-blue-700",
                                    isButtonDisabled && "bg-gray-300 dark:bg-gray-600 cursor-not-allowed shadow-none"
                                )}>
                                <motion.div 
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-transform duration-300",
                                        !isButtonDisabled && "group-hover:scale-110 group-hover:rotate-3",
                                        isButtonDisabled && "opacity-50"
                                    )}
                                    animate={!isButtonDisabled ? { 
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, 0]
                                    } : {}}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                {
                                    isPending ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Loader2Icon className="size-4 text-white relative z-10" />
                                        </motion.div>
                                    ) : (
                                        <ArrowUpIcon className={cn(
                                            "size-4 text-white relative z-10 transition-transform duration-200",
                                            !isButtonDisabled && "group-hover:scale-110 group-hover:-translate-y-0.5"
                                        )} />
                                    )}
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.form>
            </Form>
        </motion.div>
    )
}