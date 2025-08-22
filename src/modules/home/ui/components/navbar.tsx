"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import UserControl from "@/components/user-control";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted before using theme
    useEffect(() => {
        setMounted(true);
    }, []);

    // Track scroll for navbar effects - only after mount
    useEffect(() => {
        if (!mounted) return;
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mounted]);

    // Track mouse for interactive effects - only after mount
    useEffect(() => {
        if (!mounted) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mounted]);

    // Cycle through themes: light -> dark -> system
    const cycleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    // Get current theme icon
    const getThemeIcon = () => {
        if (!mounted) return <SunIcon className="w-4 h-4" />;
        
        switch (theme) {
            case 'dark':
                return <MoonIcon className="w-4 h-4" />;
            case 'system':
                return <MonitorIcon className="w-4 h-4" />;
            default:
                return <SunIcon className="w-4 h-4" />;
        }
    };

    // Get theme label
    const getThemeLabel = () => {
        if (!mounted) return 'Light';
        
        switch (theme) {
            case 'dark':
                return 'Dark';
            case 'system':
                return 'System';
            default:
                return 'Light';
        }
    };

    // Get next theme for title - consistent during SSR
    const getNextThemeTitle = () => {
        if (!mounted) return 'Toggle theme'; // Generic title during SSR
        
        if (theme === 'light') {
            return 'Switch to dark theme';
        } else if (theme === 'dark') {
            return 'Switch to system theme';
        } else {
            return 'Switch to light theme';
        }
    };

    return (
        <motion.nav 
            className={`p-3 sm:p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
                : 'bg-transparent border-b border-transparent'
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            {/* Interactive background gradient that follows mouse - only after mount */}
            {mounted && (
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
                    }}
                />
            )}

            <div className="max-w-5xl mx-auto w-full flex justify-between items-center relative">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className="flex items-center gap-3 group relative"
                    >
                        {/* Enhanced animated logo container */}
                        <motion.div
                            className="relative"
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            whileHover={{
                                scale: 1.2,
                                rotate: 0,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Multi-layered glow effects */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-lg"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.4, 0.8, 0.4]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-md"
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    opacity: [0.2, 0.6, 0.2],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            
                            <motion.div
                                animate={{
                                    rotate: [0, -360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <Image 
                                    src="/logo.svg" 
                                    alt="Vibe" 
                                    width={28} 
                                    height={28}
                                    className="relative z-10 drop-shadow-sm"
                                />
                            </motion.div>
                        </motion.div>
                        
                        {/* Enhanced animated text with interactive effects */}
                        <motion.span 
                            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent relative"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                backgroundSize: '200% 200%'
                            }}
                            whileHover={{
                                scale: 1.1,
                                textShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                            }}
                        >
                            Vibe
                            
                            {/* Interactive sparkle on hover */}
                            <motion.span
                                className="absolute -top-2 -right-1 text-xs opacity-0 group-hover:opacity-100"
                                animate={{
                                    rotate: [0, 360],
                                    scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            >
                                ✨
                            </motion.span>
                        </motion.span>
                        
                        {/* Enhanced hover particles with interactive trails */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {Array.from({ length: 5 }, (_, i) => (
                                <motion.div
                                    key={`particle-${i}`}
                                    className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                                    style={{
                                        left: `${15 + i * 12}%`,
                                        top: `${25 + Math.sin(i) * 30}%`,
                                    }}
                                    animate={{
                                        y: [0, -15, 0],
                                        x: [0, Math.cos(i) * 10, 0],
                                        opacity: [0, 1, 0],
                                        scale: [0.3, 1.2, 0.3]
                                    }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </Link>
                </motion.div>

                {/* Interactive buttons section with mobile responsiveness */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme toggle button */}
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={cycleTheme}
                            className="relative overflow-hidden group border-white/20 hover:border-indigo-400/50 transition-all duration-300 flex items-center gap-2 min-h-[40px] sm:min-h-auto"
                            title={getNextThemeTitle()}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"
                            />
                            
                            {/* Animated icon transition */}
                            <motion.div
                                key={theme || 'default'}
                                initial={{ rotateY: 180, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                {getThemeIcon()}
                            </motion.div>
                            
                            <span className="relative z-10 hidden sm:inline text-xs font-medium">
                                {getThemeLabel()}
                            </span>
                            
                            {/* Shimmer effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                            />
                        </Button>
                    </motion.div>

                    {/* Auth buttons with mobile responsiveness */}
                    <SignedOut>
                        <div className="flex gap-2 sm:gap-3">
                            <SignUpButton>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="relative overflow-hidden group border-white/20 hover:border-indigo-400/50 transition-all duration-300 min-h-[40px] sm:min-h-auto px-3 sm:px-4"
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"
                                        />
                                        <span className="relative text-xs sm:text-sm">Sign up</span>
                                        
                                        {/* Shimmer effect on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                        />
                                    </Button>
                                </motion.div>
                            </SignUpButton>
                            <SignInButton>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="relative overflow-hidden group bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-400/30 hover:border-indigo-400/60 transition-all duration-300 min-h-[40px] sm:min-h-auto px-3 sm:px-4"
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                                        />
                                        <span className="relative text-xs sm:text-sm">Sign in</span>
                                        
                                        {/* Glow effect on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 to-purple-400/0 group-hover:from-indigo-400/20 group-hover:to-purple-400/20 blur-sm transition-all duration-300"
                                        />
                                    </Button>
                                </motion.div>
                            </SignInButton>
                        </div>
                    </SignedOut>
                    
                    <SignedIn>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Hide name on mobile, show on desktop */}
                            <div className="block sm:hidden">
                                <UserControl showName={false} />
                            </div>
                            <div className="hidden sm:block">
                                <UserControl showName={true} />
                            </div>
                        </motion.div>
                    </SignedIn>
                </div>
            </div>

            {/* Scroll progress indicator */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{
                    width: scrolled ? '100%' : '0%'
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.nav>
    );
};