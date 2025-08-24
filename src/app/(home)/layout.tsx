"use client";

import { Navbar } from "@/modules/home/ui/components/navbar";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />
      
      {/* Revolutionary Dynamic Geometric Pattern */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Primary animated mesh grid */}
        <svg className="absolute inset-0 w-full h-full opacity-25 dark:opacity-15">
          <defs>
            <pattern id="dynamicMesh" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {/* Central hub */}
              <motion.circle
                cx="60" cy="60" r="3"
                fill="url(#hubGradient)"
                animate={{
                  r: [2, 5, 2],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Connecting nodes */}
              {[
                { cx: 20, cy: 20 }, { cx: 100, cy: 20 },
                { cx: 20, cy: 100 }, { cx: 100, cy: 100 },
                { cx: 60, cy: 20 }, { cx: 60, cy: 100 },
                { cx: 20, cy: 60 }, { cx: 100, cy: 60 }
              ].map((node, i) => (
                <motion.circle
                  key={`node-${node.cx}-${node.cy}-${i}`}
                  cx={node.cx} cy={node.cy} r="1.5"
                  fill="url(#nodeGradient)"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    r: [1, 2.5, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
              
              {/* Dynamic connecting lines */}
              <motion.line
                x1="60" y1="60" x2="20" y2="20"
                stroke="url(#lineGradient)" strokeWidth="0.5"
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  strokeWidth: [0.5, 1.5, 0.5]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              <motion.line
                x1="60" y1="60" x2="100" y2="100"
                stroke="url(#lineGradient)" strokeWidth="0.5"
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  strokeWidth: [0.5, 1.5, 0.5]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              />
              
              {/* Hexagonal elements */}
              <motion.polygon
                points="40,30 50,25 60,30 60,40 50,45 40,40"
                fill="none" stroke="url(#hexGradient)" strokeWidth="0.5"
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  rotate: [0, 60, 120]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </pattern>
            
            <radialGradient id="hubGradient">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.9)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" />
            </radialGradient>
            
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.8)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
            </radialGradient>
            
            <linearGradient id="lineGradient">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.6)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.7)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
            </linearGradient>
            
            <linearGradient id="hexGradient">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
            </linearGradient>
          </defs>
          
          <motion.rect 
            width="100%" height="100%" 
            fill="url(#dynamicMesh)"
            animate={{
              x: [0, 60, 0],
              y: [0, 60, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + ((i * 9) % 60)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.4, 0.8]
            }}
            transition={{
              duration: 10 + (i * 1.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            {i % 3 === 0 ? (
              // Triangle
              <svg width="20" height="20" viewBox="0 0 20 20">
                <polygon
                  points="10,2 18,18 2,18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-indigo-400/40 dark:text-indigo-300/25"
                />
              </svg>
            ) : i % 3 === 1 ? (
              // Diamond
              <svg width="16" height="16" viewBox="0 0 16 16">
                <polygon
                  points="8,1 15,8 8,15 1,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-purple-400/40 dark:text-purple-300/25"
                />
              </svg>
            ) : (
              // Circle
              <svg width="18" height="18" viewBox="0 0 18 18">
                <circle
                  cx="9" cy="9" r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-pink-400/40 dark:text-pink-300/25"
                />
              </svg>
            )}
          </motion.div>
        ))}
        
        {/* Morphing wave patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-15 dark:opacity-8">
          <motion.path
            d="M0,50 Q25,20 50,50 T100,50"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            transform="scale(4) translate(0, 20)"
            animate={{
              d: [
                "M0,50 Q25,20 50,50 T100,50",
                "M0,50 Q25,80 50,50 T100,50",
                "M0,50 Q25,20 50,50 T100,50"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M0,80 Q25,50 50,80 T100,80"
            stroke="url(#waveGradient2)"
            strokeWidth="1.5"
            fill="none"
            transform="scale(4) translate(0, -10)"
            animate={{
              d: [
                "M0,80 Q25,50 50,80 T100,80",
                "M0,80 Q25,110 50,80 T100,80",
                "M0,80 Q25,50 50,80 T100,80"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <defs>
            <linearGradient id="waveGradient">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.7)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
            </linearGradient>
            <linearGradient id="waveGradient2">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.6)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Enhanced Energy Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full shadow-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 165, 0, 0.6) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)'
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 2.5, 1],
            x: [0, 50, -20, 0],
            y: [0, -30, 15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full shadow-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.9) 0%, rgba(138, 43, 226, 0.6) 50%, transparent 100%)',
            boxShadow: '0 0 25px rgba(255, 20, 147, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.4)'
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 3, 0.8],
            x: [0, -60, 20, 0],
            y: [0, 40, -15, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-3.5 h-3.5 rounded-full shadow-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 191, 255, 0.9) 0%, rgba(30, 144, 255, 0.7) 50%, transparent 100%)',
            boxShadow: '0 0 30px rgba(0, 191, 255, 0.7), inset 0 0 18px rgba(255, 255, 255, 0.5)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1.2, 0.6, 1.8, 1.2],
            rotate: [0, 270, 540],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Plasma trail effects */}
        <motion.div
          className="absolute top-1/6 right-1/6 w-2 h-2 rounded-full"
          style={{
            background: 'linear-gradient(45deg, rgba(50, 205, 50, 0.8), rgba(0, 255, 127, 0.6))',
            boxShadow: '0 0 15px rgba(50, 205, 50, 0.8)'
          }}
          animate={{
            x: [0, 80, -50, 20, 0],
            y: [0, -40, 60, -30, 0],
            opacity: [0.3, 0.9, 0.6, 0.8, 0.3],
            scale: [1, 1.8, 1.2, 1.5, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/6 right-2/3 w-2.5 h-2.5 rounded-full"
          style={{
            background: 'linear-gradient(45deg, rgba(255, 69, 0, 0.8), rgba(255, 20, 147, 0.6))',
            boxShadow: '0 0 20px rgba(255, 69, 0, 0.9)'
          }}
          animate={{
            x: [0, -70, 40, -20, 0],
            y: [0, 45, -25, 35, 0],
            scale: [1, 2, 1.3, 0.8, 1],
            rotate: [0, 180, 360, 540, 720]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Dynamic neural connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-12">
          <motion.path
            d="M 15% 30% Q 45% 20% 70% 40% Q 85% 60% 75% 80%"
            stroke="url(#neuralGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6,10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.8, 0],
              strokeDashoffset: [0, 32]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M 80% 25% Q 60% 45% 40% 35% Q 20% 65% 30% 85%"
            stroke="url(#neuralGradient2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.7, 0],
              strokeDashoffset: [0, 24]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <defs>
            <linearGradient id="neuralGradient">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.9)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.7)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
            </linearGradient>
            <linearGradient id="neuralGradient2">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.8)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Much more visible pulsing intersections */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-indigo-400/60 to-purple-400/60 rounded-full shadow-xl"
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-gradient-to-r from-pink-400/70 to-orange-400/70 rounded-full shadow-xl"
          animate={{
            scale: [0, 2.5, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        
        {/* Additional moving dots for more activity */}
        <motion.div
          className="absolute top-1/6 right-1/6 w-1.5 h-1.5 bg-emerald-400/80 rounded-full shadow-md"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -25, 40, 0],
            opacity: [0.3, 0.8, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/6 right-2/3 w-2 h-2 bg-rose-400/80 rounded-full shadow-md"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -15, 0],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />
      
      {/* Floating orbs for depth */}
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 rounded-full blur-xl pointer-events-none"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-500/8 to-pink-500/8 rounded-full blur-lg pointer-events-none"
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="flex-1 flex flex-col px-4 pb-4 relative z-20">{children}</div>
    </main>
  );
};

export default Layout;
