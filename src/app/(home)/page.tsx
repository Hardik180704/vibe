"use client";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full relative">
      {/* Optimized Hero Section - Reduced animations for better performance */}
      <motion.section 
        className="relative space-y-12 py-[20vh] 2xl:py-56 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Simplified background - Static gradients for better performance */}
        <div className="absolute inset-0 -z-10">
          {/* Single static luxury gradient */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(240, 147, 251, 0.08) 0%, transparent 50%)
              `
            }}
          />
        </div>

        {/* Minimal floating elements - Reduced for performance */}
        <motion.div
          className="absolute top-20 right-20 w-2 h-2 bg-purple-400/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Logo with simplified animation */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <Image
              src="/logo.svg"
              alt="Vibe"
              width={60}
              height={60}
              className="relative z-10 w-12 h-12 md:w-16 md:h-16"
            />
          </motion.div>
        </motion.div>

        {/* Optimized main heading */}
        <motion.h1 
          className="text-4xl md:text-7xl font-black text-center leading-[0.9] tracking-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Premium "Build Something" with enhanced effects */}
          <motion.div className="relative mb-3">
            <motion.span
              className="relative inline-block text-6xl md:text-8xl font-black tracking-tight"
              style={{
                background: `linear-gradient(135deg, 
                  #667eea 0%, 
                  #764ba2 25%, 
                  #f093fb 50%, 
                  #f5576c 75%, 
                  #4facfe 100%
                )`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3))'
              }}
              whileHover={{ 
                scale: 1.02,
                filter: 'drop-shadow(0 6px 20px rgba(102, 126, 234, 0.5))',
                transition: { duration: 0.3 }
              }}
            >
              Build Something
              
              {/* Premium glow effect */}
              <motion.div
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, 
                    #667eea 0%, 
                    #764ba2 25%, 
                    #f093fb 50%, 
                    #f5576c 75%, 
                    #4facfe 100%
                  )`
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </motion.div>
          
          {/* Premium "with Vibe" with luxury styling */}
          <motion.div className="relative">
            <motion.span
              className="inline-block text-4xl md:text-6xl font-bold tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="text-foreground/60 font-light mr-4">with</span>
              
              <motion.span
                className="relative inline-block"
                style={{
                  background: `linear-gradient(135deg, 
                    #ffeaa7 0%, 
                    #fab1a0 25%, 
                    #fd79a8 50%, 
                    #fdcb6e 75%, 
                    #e17055 100%
                  )`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px rgba(253, 121, 168, 0.4))'
                }}
                whileHover={{ 
                  scale: 1.05,
                  filter: 'drop-shadow(0 4px 16px rgba(253, 121, 168, 0.6))',
                  transition: { duration: 0.3 }
                }}
              >
                Vibe
                
                {/* Premium floating elements */}
                <motion.span
                  className="absolute -top-4 -right-3 text-2xl"
                  animate={{ 
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.4, 1, 0.4],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.span>
                
                <motion.span
                  className="absolute -top-2 -left-4 text-lg opacity-60"
                  animate={{ 
                    scale: [0.6, 1.1, 0.6],
                    opacity: [0.2, 0.8, 0.2],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  💫
                </motion.span>
                
                {/* Premium underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-50"
                  style={{
                    background: `linear-gradient(90deg, 
                      #ffeaa7 0%, 
                      #fab1a0 25%, 
                      #fd79a8 50%, 
                      #fdcb6e 75%, 
                      #e17055 100%
                    )`
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
                
                {/* Luxury glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 blur-2xl opacity-20"
                  style={{
                    background: `linear-gradient(135deg, 
                      #ffeaa7 0%, 
                      #fab1a0 25%, 
                      #fd79a8 50%, 
                      #fdcb6e 75%, 
                      #e17055 100%
                    )`
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.span>
            </motion.span>
          </motion.div>
        </motion.h1>

        {/* Simplified subtitle */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Create stunning applications and websites by{" "}
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              chatting with AI
            </span>
          </motion.p>
          
          <motion.p
            className="text-sm md:text-base text-muted-foreground/80 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <span>No coding required.</span>{" "}
            <span>Just your imagination.</span>{" "}
            <span>Unlimited possibilities.</span>
          </motion.p>
        </motion.div>

        {/* Optimized project form container */}
        <motion.div 
          className="max-w-3xl mx-auto w-full"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <div className="relative z-10">
              <ProjectForm />
            </div>
          </motion.div>
        </motion.div>

        {/* Simplified scroll indicator */}
        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-3 text-sm text-muted-foreground bg-black/10 dark:bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Scroll to see your projects</span>
            <span className="text-base">↓</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* What You Can Build Section - More authentic and human */}
      <motion.section
        className="relative py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="relative max-w-4xl mx-auto">
          {/* Simple, honest introduction */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
              What can you build?
            </h2>
            <p className="text-white/60 text-lg">
              Honestly? Pretty much anything. Here are some ideas to get you started.
            </p>
          </motion.div>

          {/* Realistic examples */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            {[
              {
                title: "Portfolio Site",
                description: "Show off your work, share your story. Clean, simple, yours.",
                examples: "Designer, developer, photographer, writer"
              },
              {
                title: "Small Business Site", 
                description: "Get online without the hassle. Professional but not corporate.",
                examples: "Coffee shop, consulting, freelance services"
              },
              {
                title: "Landing Page",
                description: "Promote your app, course, or product. No fluff, just results.",
                examples: "SaaS signup, course sales, product launch"
              },
              {
                title: "Personal Blog",
                description: "Share your thoughts, build an audience, own your content.",
                examples: "Tech blog, travel stories, cooking recipes"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <h3 className="font-semibold text-white/90 mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-white/70 mb-3 text-sm leading-relaxed">
                  {item.description}
                </p>
                <p className="text-white/50 text-xs">
                  {item.examples}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Honest disclaimer */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.4 }}
          >
            <p className="text-white/50 text-sm">
              Still figuring things out? That's okay. Start with something simple and iterate.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Integrated Projects Section with smooth transition */}
      <motion.section
        className="relative pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        {/* Smooth gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        {/* Unified Projects Area */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <ProjectsList />
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Page;