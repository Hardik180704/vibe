import { useState } from "react";
import { ExternalLinkIcon, RefreshCcwIcon, CheckIcon, CopyIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface Props {
    data: Fragment;
}

export function FragmentWeb({ data }: Props) {
    const [fragmentKey, setFragmentKey] = useState(0);
    const [copied, setCopied] = useState(false);

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1);
    };

    const handleCopy = async () => {
        if (!data.sandboxUrl) return;
        
        try {
            await navigator.clipboard.writeText(data.sandboxUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
  } catch {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = data.sandboxUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleOpenInNewTab = () => {
        if (!data.sandboxUrl) return;
        window.open(data.sandboxUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <motion.div 
          className="flex flex-col w-full h-full bg-white dark:bg-gray-900"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            duration: 0.5
          }}
        >
            <motion.div 
              className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-x-2 shadow-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
                <Hint text="Refresh preview" side="bottom" align="start">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={onRefresh}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                          <motion.div
                            animate={fragmentKey > 0 ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            <RefreshCcwIcon className="w-4 h-4" />
                          </motion.div>
                      </Button>
                    </motion.div>
                </Hint>
                
                <Hint text={copied ? "Copied!" : "Click to copy URL"} side="bottom">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCopy}
                          disabled={!data.sandboxUrl}
                          className="flex-1 justify-start text-start font-normal min-w-0 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-full"
                      >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                              <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                      key="check"
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      exit={{ scale: 0, rotate: 180 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                      key="copy"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <CopyIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                    </motion.div>
                                )}
                              </AnimatePresence>
                              <motion.span 
                                className="truncate text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                  {data.sandboxUrl || "No URL available"}
                              </motion.span>
                          </div>
                      </Button>
                    </motion.div>
                </Hint>
                
                <Hint text="Open in new tab" side="bottom" align="start">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <Button
                          size="sm"
                          disabled={!data.sandboxUrl}
                          variant="outline"
                          onClick={handleOpenInNewTab}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                          <ExternalLinkIcon className="w-4 h-4" />
                      </Button>
                    </motion.div>
                </Hint>
            </motion.div>
            <motion.div 
              className="flex-1 bg-white dark:bg-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
                <AnimatePresence mode="wait">
                  {data.sandboxUrl ? (
                      <motion.iframe
                          key={`iframe-${fragmentKey}`}
                          className="h-full w-full border-0"
                          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                          loading="lazy"
                          src={data.sandboxUrl}
                          title="Preview"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ 
                            duration: 0.5,
                            ease: "easeInOut"
                          }}
                      />
                  ) : (
                      <motion.div 
                        className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 30 
                        }}
                      >
                          <div className="text-center space-y-3 p-8">
                              <motion.div 
                                className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center"
                                whileHover={{ 
                                  scale: 1.1,
                                  rotate: [0, -10, 10, 0]
                                }}
                                transition={{ 
                                  scale: { duration: 0.2 },
                                  rotate: { duration: 0.5 }
                                }}
                              >
                                  <ExternalLinkIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                              </motion.div>
                              <motion.div 
                                className="space-y-1"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Preview Available</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">The preview URL is not ready yet</p>
                              </motion.div>
                          </div>
                      </motion.div>
                  )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}