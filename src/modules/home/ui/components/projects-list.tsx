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
import { toast } from "sonner";

export const ProjectsList = () => {
    const trpc = useTRPC();
    const { user } = useUser();
    const { data: projects, isLoading, error } = useQuery(trpc.projects.getMany.queryOptions());
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted before showing date-dependent content
    useEffect(() => {
        setMounted(true);
        // Load liked projects from localStorage
        const savedLikes = localStorage.getItem('likedProjects');
        if (savedLikes) {
            setLikedProjects(new Set(JSON.parse(savedLikes)));
        }
    }, []);

    // Handle heart button click
    const handleLikeToggle = (projectId: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevent navigation
        event.stopPropagation(); // Prevent event bubbling
        
        const isCurrentlyLiked = likedProjects.has(projectId);
        
        setLikedProjects(prev => {
            const newLikedProjects = new Set(prev);
            if (newLikedProjects.has(projectId)) {
                newLikedProjects.delete(projectId);
            } else {
                newLikedProjects.add(projectId);
            }
            
            // Save to localStorage
            localStorage.setItem('likedProjects', JSON.stringify(Array.from(newLikedProjects)));
            
            return newLikedProjects;
        });
        
        // Show toast notification
        if (isCurrentlyLiked) {
            toast("💔 Removed from favorites", {
                description: "Project removed from your favorites",
                duration: 2000,
            });
        } else {
            toast("❤️ Added to favorites!", {
                description: "Project added to your favorites",
                duration: 2000,
            });
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="w-full relative">
            {/* Modern background with dark mode support */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20 rounded-2xl" />
            <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl" />

            {/* Main container with enhanced dark mode */}
            <div className="relative z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300">
                <div className="text-center space-y-4 sm:space-y-6">
                    <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <motion.div
                                className="h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent flex-1 max-w-8 sm:max-w-16"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            />
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                                {user?.firstName ? `${user.firstName}'s Projects` : 'My Projects'}
                            </h2>
                            <motion.div
                                className="h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent flex-1 max-w-8 sm:max-w-16"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            />
                        </div>
                        
                                                {projects && projects.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                                <motion.div 
                                    className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-700/60 rounded-full px-3 sm:px-4 py-2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        <SparklesIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                    </motion.div>
                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                        {projects.length} project{projects.length !== 1 ? 's' : ''}
                                    </span>
                                </motion.div>
                                
                                {likedProjects.size > 0 && (
                                    <motion.div 
                                        className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/30 border border-red-200/60 dark:border-red-700/60 rounded-full px-3 sm:px-4 py-2"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                    >
                                        <motion.div
                                            animate={{ 
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{ 
                                                duration: 2, 
                                                repeat: Infinity, 
                                                ease: "easeInOut" 
                                            }}
                                        >
                                            <HeartIcon className="w-4 h-4 text-red-500 dark:text-red-400 fill-current" />
                                        </motion.div>
                                        <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                                            {likedProjects.size} favorite{likedProjects.size !== 1 ? 's' : ''}
                                        </span>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center py-20"
                        >
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <div className="w-5 h-5 border-2 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                                <span className="font-medium">Loading your projects...</span>
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
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/60 rounded-xl p-6">
                                <div className="text-red-600 dark:text-red-400 font-medium">
                                    Failed to load projects. Please try again.
                                </div>
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
                            <motion.div
                                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border border-blue-200/40 dark:border-blue-700/40 shadow-sm"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <RocketIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                            </motion.div>
                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">No Projects Yet</h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                                    Start building something amazing! Create your first project above to get started.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {projects && projects.length > 0 && (
                        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredProject(project.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <motion.div 
                                        className={`
                                            relative overflow-hidden rounded-xl border transition-all duration-300
                                            ${likedProjects.has(project.id)
                                                ? 'border-red-300/60 dark:border-red-600/60 shadow-lg shadow-red-500/10 dark:shadow-red-400/20'
                                                : hoveredProject === project.id 
                                                    ? 'border-blue-300/60 dark:border-blue-600/60 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/20 scale-[1.02]' 
                                                    : 'border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80'
                                            }
                                            bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-900/90
                                        `}
                                        whileHover={{ y: -4 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div className={`
                                            absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 
                                            dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20
                                            transition-opacity duration-300
                                            ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                                        `} />
                                        
                                        {/* Liked indicator */}
                                        {likedProjects.has(project.id) && (
                                            <motion.div
                                                className="absolute top-3 right-3 z-10"
                                                initial={{ scale: 0, rotate: -90 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <div className="w-6 h-6 bg-red-500 dark:bg-red-400 rounded-full flex items-center justify-center shadow-lg">
                                                    <HeartIcon className="w-3 h-3 text-white fill-current" />
                                                </div>
                                            </motion.div>
                                        )}
                                        
                                        <div className="relative p-4 sm:p-6 space-y-3 sm:space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                                        {project.name}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
                                                        A creative project built with modern tools and technologies.
                                                    </p>
                                                </div>
                                                <motion.button 
                                                    className="ml-3 sm:ml-4 flex-shrink-0 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                                                    animate={hoveredProject === project.id ? { scale: 1.1 } : { scale: 1 }}
                                                    whileHover={{ scale: 1.15 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => handleLikeToggle(project.id, e)}
                                                    title={likedProjects.has(project.id) ? "Remove from favorites" : "Add to favorites"}
                                                >
                                                    <motion.div
                                                        animate={likedProjects.has(project.id) ? { scale: [1, 1.3, 1] } : {}}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <HeartIcon 
                                                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
                                                                likedProjects.has(project.id) 
                                                                    ? 'text-red-500 dark:text-red-400 fill-current' 
                                                                    : hoveredProject === project.id 
                                                                        ? 'text-red-400 dark:text-red-300' 
                                                                        : 'text-gray-400 dark:text-gray-500 group-hover:text-red-400 dark:group-hover:text-red-300'
                                                            }`} 
                                                        />
                                                    </motion.div>
                                                </motion.button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                    {mounted 
                                                        ? formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })
                                                        : new Date(project.createdAt).toLocaleDateString()
                                                    }
                                                </div>
                                                <Link href={`/projects/${project.id}`}>
                                                    <Button 
                                                        size="sm" 
                                                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                                                    >
                                                        <span className="hidden sm:inline">View Project</span>
                                                        <span className="sm:hidden">View</span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
