"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SparklesIcon, RocketIcon, HeartIcon } from "lucide-react";

export const ProjectsList = () => {
    const trpc = useTRPC();
    const { user } = useUser();
    const { data: projects, isLoading, error } = useQuery(trpc.projects.getMany.queryOptions());
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted before showing date-dependent content
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div className="w-full relative">
            {/* Simple background - no animations for better performance */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-50" />

            {/* Main container - simplified for performance */}
            <div className="relative z-10 glass-dark rounded-2xl p-8 border border-white/10 shadow-xl backdrop-blur-md">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 border border-white/10">
                        <SparklesIcon className="w-5 h-5 text-indigo-400" />
                        <span className="text-white/90 font-medium">Your Projects</span>
                    </div>
                </div>

                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center py-20"
                        >
                            <div className="flex items-center gap-3 text-white/60">
                                <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                                <span>Loading your projects...</span>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center py-20"
                        >
                            <div className="text-red-400 font-medium">
                                Failed to load projects. Please try again.
                            </div>
                        </motion.div>
                    )}

                    {projects && projects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center py-20 space-y-6"
                        >
                            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                <RocketIcon className="w-8 h-8 text-indigo-400" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-white/90">No Projects Yet</h3>
                                <p className="text-white/60 max-w-md mx-auto">
                                    Start building something amazing! Create your first project above to get started.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {projects && projects.length > 0 && (
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredProject(project.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className={`
                                        relative overflow-hidden rounded-xl border transition-all duration-200
                                        ${hoveredProject === project.id 
                                            ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
                                            : 'border-white/10 hover:border-white/20'
                                        }
                                        bg-white/5 backdrop-blur-sm hover:bg-white/10
                                    `}>
                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-white/90 text-lg mb-2 line-clamp-2">
                                                        {project.name}
                                                    </h3>
                                                    <p className="text-white/60 text-sm line-clamp-3 mb-4">
                                                        No description available
                                                    </p>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <HeartIcon className="w-5 h-5 text-white/40" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <div className="text-xs text-white/50">
                                                    {mounted 
                                                        ? formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })
                                                        : new Date(project.createdAt).toLocaleDateString()
                                                    }
                                                </div>
                                                <Link href={`/projects/${project.id}`}>
                                                    <Button 
                                                        size="sm" 
                                                        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border-indigo-500/20 hover:border-indigo-400/30"
                                                    >
                                                        View Project
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
