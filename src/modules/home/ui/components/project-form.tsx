"use client"

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon, SparklesIcon, Wand2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import {useClerk} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PROJECT_TEMPLATES } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";


const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required." })
        .max(10000, { message: "Value is too long" }),
})

export const ProjectForm = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const clerk = useClerk();
    const queryClient = useQueryClient();
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: "",
        },
    })

    // Auto-suggestions based on user input
    const suggestions = [
        "✨ A modern e-commerce store with AI recommendations",
        "🚀 A SaaS landing page with animated features",
        "📱 A social media dashboard with real-time analytics",
        "🎨 A creative portfolio with 3D interactions",
        "💼 A professional business website with booking system",
        "🌟 A blog platform with AI-powered content suggestions"
    ];

    const createProject = useMutation(trpc.projects.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                trpc.projects.getMany.queryOptions(),
            );
            router.push(`/projects/${data.id}`);
            // TODO: Invalidate Usage Status
        },
        onError: (error) => {
            toast.error(error.message);
            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn();
            }
        },
    }));

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createProject.mutateAsync({
            value: values.value,
        })
    };

    const onSelect = (value: string) => {
        form.setValue("value", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
         });
    }

    const isPending = createProject.isPending;
    const isButtonDisabled = isPending || !form.formState.isValid;

    return (
        <Form {...form}>
            <motion.section 
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Premium form container */}
                <motion.form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        "relative border-2 p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-500 ease-out overflow-hidden",
                        "glass-premium-dark shadow-luxury",
                        "bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/10 dark:to-white/[0.02]",
                        isFocused 
                            ? "border-luxury shadow-glow-premium scale-[1.01]" 
                            : "border-premium hover:border-luxury hover:shadow-glow-premium hover:scale-[1.005]"
                    )}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Simple background gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-500/3 via-purple-500/3 to-pink-500/3 -z-10 rounded-2xl"
                        animate={{
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <motion.div
                                className="relative"
                                whileFocus={{ scale: 1.005 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Interactive focus glow */}
                                <AnimatePresence>
                                    {isFocused && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm -z-10"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1.05 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </AnimatePresence>

                                <TextareaAutosize
                                    {...field}
                                    disabled={isPending}
                                    onFocus={() => {
                                        setIsFocused(true);
                                        setShowSuggestions(true);
                                    }}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        setTimeout(() => setShowSuggestions(false), 200);
                                    }}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setCharCount(e.target.value.length);
                                    }}
                                    minRows={3}
                                    maxRows={8}
                                    className={cn(
                                        "w-full resize-none border-none outline-none bg-transparent relative z-10",
                                        "text-base sm:text-lg placeholder:text-muted-foreground/60 placeholder:font-medium",
                                        "font-medium leading-relaxed py-2 transition-all duration-300",
                                        isFocused && "text-shadow-glow"
                                    )}
                                    placeholder="✨ Describe your dream website and watch the magic happen..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                            e.preventDefault();
                                            form.handleSubmit(onSubmit)(e);
                                        }
                                    }}
                                />

                                {/* Character counter with animation */}
                                <AnimatePresence>
                                    {isFocused && charCount > 10 && (
                                        <motion.div
                                            className="absolute bottom-2 right-2 text-xs text-white/50 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                        >
                                            {charCount}/10000
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Interactive suggestions popup */}
                                <AnimatePresence>
                                    {showSuggestions && field.value.length < 5 && (
                                        <motion.div
                                            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-50"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <Wand2Icon className="w-4 h-4 text-indigo-400" />
                                                <span className="text-sm font-medium text-white/80">AI Suggestions</span>
                                            </div>
                                            <div className="space-y-2">
                                                {suggestions.slice(0, 3).map((suggestion, index) => (
                                                    <motion.button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => {
                                                            onSelect(suggestion);
                                                            setShowSuggestions(false);
                                                        }}
                                                        className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/30 transition-all duration-200 group"
                                                        whileHover={{ scale: 1.02, x: 4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                                            {suggestion}
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {/* Enhanced premium focus glow */}
                                <AnimatePresence>
                                    {isFocused && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg blur-xl -z-10"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1.1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )} 
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-x-4 items-start sm:items-end justify-between pt-4 sm:pt-6 border-t border-white/10 mt-4 sm:mt-6">
                        <motion.div 
                            className="text-xs text-muted-foreground/80 font-medium flex items-center gap-2 order-2 sm:order-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <SparklesIcon className="w-3 h-3" />
                            <kbd className="inline-flex h-5 sm:h-6 select-none items-center gap-1 rounded-md border border-white/20 bg-white/5 px-1 sm:px-2 font-mono text-xs font-medium backdrop-blur-sm">
                                <span>⌘</span>Enter
                            </kbd>
                            <span className="hidden sm:inline">to create magic</span>
                            <span className="sm:hidden">to create</span>
                        </motion.div>
                        
                        <motion.div
                            className="order-1 sm:order-2 self-end"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                disabled={isButtonDisabled}
                                className={cn(
                                    "w-10 h-10 sm:w-12 sm:h-12 rounded-full relative overflow-hidden transition-all duration-300",
                                    !isButtonDisabled 
                                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl hover:shadow-purple-500/25" 
                                        : "bg-muted/50 border border-muted"
                                )}
                            >
                                {isPending ? (
                                    <Loader2Icon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white" />
                                ) : (
                                    <ArrowUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                )}
                            </Button>
                        </motion.div>
                    </div>
                </motion.form>
                
                {/* Premium template buttons */}
                <motion.div 
                    className="flex-wrap justify-center gap-2 sm:gap-3 flex sm:hidden md:flex max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {PROJECT_TEMPLATES.map((template, index) => (
                    <motion.div
                        key={template.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "relative overflow-hidden border-2 transition-all duration-300",
                                "glass-premium-dark hover:glass-premium hover:border-luxury",
                                "hover:shadow-glow-premium hover:shadow-lg",
                                "bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                                "text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                            )}
                            onClick={() => onSelect(template.prompt)}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                            />
                            <span className="relative z-10 flex items-center gap-1 sm:gap-2 font-medium">
                                <span className="text-base sm:text-lg">{template.emoji}</span>
                                <span className="hidden sm:inline">{template.title}</span>
                                <span className="sm:hidden text-xs">{template.title.split(' ')[0]}</span>
                            </span>
                        </Button>
                    </motion.div>
                  ))}
                </motion.div>
            </motion.section>
        </Form>
    )
}