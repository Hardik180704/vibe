"use client"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { MessagesContainer } from "../components/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { EyeIcon, CodeIcon, CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";
import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";
import { ThreeScene } from "@/components/three-scene";
import { CodeVisualization } from "@/components/code-visualization";

interface Props {
    projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");


    return (
        <motion.div 
            className="h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <ThreeScene className="opacity-30 dark:opacity-20" showDNA={!!activeFragment} />
            <motion.div
                className="relative z-10 h-full"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
            <ResizablePanelGroup direction="horizontal" className="h-full">
                <ResizablePanel
                    defaultSize={30}
                    minSize={25}
                    maxSize={45}
                    className="flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                        <ErrorBoundary fallback={
                            <div className="p-4 text-center">
                                <p className="text-sm text-red-600 dark:text-red-400">Project header error</p>
                            </div>
                        }>
                        <Suspense fallback={
                            <div className="p-4">
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        }>
                        <ProjectHeader projectId={projectId}/>
                        </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary fallback={
                            <div className="flex-1 p-4 text-center">
                                <p className="text-sm text-red-600 dark:text-red-400">Messages container error</p>
                            </div>
                        }>
                    <Suspense fallback={
                        <div className="flex-1 p-4">
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    }>
                        <MessagesContainer 
                        projectId={projectId}
                        activeFragment={activeFragment}
                        setActiveFragment={setActiveFragment}
                         />
                    </Suspense>
                    </ErrorBoundary>
                </ResizablePanel>
                <ResizableHandle className="w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors"/>
                <ResizablePanel
                    defaultSize={70}
                    minSize={55}
                    className="bg-white dark:bg-gray-800 flex flex-col"
                    >
                     <Tabs
                       className="h-full flex flex-col"
                       defaultValue="preview"
                       value={tabState}
                       onValueChange={(value) => setTabState(value as "preview" | "code")}
                       > 
                       <motion.div 
                         className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm"
                         initial={{ y: -20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 0.5, duration: 0.3 }}
                       >  
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <TabsList className="h-9 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 shadow-sm">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                  <TabsTrigger value="preview" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300">
                                    <EyeIcon className="w-4 h-4"/> 
                                    <span>Preview</span>
                                  </TabsTrigger>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                  <TabsTrigger value="code" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">
                                    <CodeIcon className="w-4 h-4"/> 
                                    <span>Files</span>
                                  </TabsTrigger>
                                </motion.div>
                            </TabsList>
                          </motion.div>
                        <motion.div 
                          className="flex items-center gap-3"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <Button asChild size="sm" variant="default" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 text-white border-0 shadow-sm hover:shadow-md transition-all">
                              <Link href="/pricing" className="flex items-center gap-2">
                              <CrownIcon className="w-4 h-4"/> 
                              <span>Pro</span>
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <UserControl/>
                          </motion.div>
                        </motion.div>
                    </motion.div>

                    <TabsContent value="preview" className="flex-1 min-h-0">
                        {!!activeFragment ? (
                            <motion.div 
                              className="h-full relative overflow-hidden"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 30,
                                delay: 0.3
                              }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>
                                <div className="absolute top-4 right-4 pointer-events-none">
                                    <motion.div 
                                      className="w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
                                      animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                      }}
                                      transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    />
                                </div>
                                <div className="relative z-10 h-full">
                                    <FragmentWeb data={activeFragment} />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                              className="h-full relative overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 400, 
                                damping: 30,
                                delay: 0.4
                              }}
                            >
                                <CodeVisualization className="opacity-40 dark:opacity-30" type="preview" />
                                <div className="absolute inset-0 opacity-30">
                                    <motion.div 
                                      className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full"
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
                                      className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/20 rounded-full"
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
                                      className="absolute top-1/2 left-1/3 w-1 h-1 bg-indigo-400/40 rounded-full"
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
                                  className="text-center space-y-4 p-8 relative z-10"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                    <motion.div 
                                      className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-lg group"
                                      whileHover={{ 
                                        scale: 1.1,
                                        rotate: [0, -10, 10, 0]
                                      }}
                                      transition={{ 
                                        duration: 0.3,
                                        rotate: { duration: 0.5 }
                                      }}
                                    >
                                        <EyeIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                                    </motion.div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ready to Preview</h3>
                                        <p className="text-gray-500 dark:text-gray-400">Generate content in the chat to see your preview here</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </TabsContent>

                    <TabsContent value="code" className="flex-1 min-h-0">
                     {!!activeFragment?.files ? (
                        <motion.div 
                          className="h-full"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 30,
                            delay: 0.3
                          }}
                        >
                            <FileExplorer
                              files={activeFragment.files as {[path: string]: string}}
                            />
                        </motion.div>
                     ) : (
                        <motion.div 
                          className="h-full relative overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 30,
                            delay: 0.4
                          }}
                        >
                            <CodeVisualization className="opacity-40 dark:opacity-30" type="code" />
                            <div className="absolute inset-0 opacity-20">
                                <motion.div 
                                  className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-400/30 rounded-full"
                                  animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0.8, 0.3]
                                  }}
                                  transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.2
                                  }}
                                />
                                <motion.div 
                                  className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-blue-400/20 rounded-full"
                                  animate={{ 
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.6, 0.2]
                                  }}
                                  transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.7
                                  }}
                                />
                                <motion.div 
                                  className="absolute top-2/3 left-1/4 w-1 h-1 bg-indigo-400/40 rounded-full"
                                  animate={{ 
                                    y: [-8, 8, -8],
                                    opacity: [0.3, 0.7, 0.3]
                                  }}
                                  transition={{
                                    duration: 3.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.2
                                  }}
                                />
                            </div>
                            <motion.div 
                              className="text-center space-y-4 p-8 relative z-10"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            >
                                <motion.div 
                                  className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-lg group"
                                  whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -10, 10, 0]
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    rotate: { duration: 0.5 }
                                  }}
                                >
                                    <CodeIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
                                </motion.div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Files Yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Code files will appear here once generated</p>
                                </div>
                            </motion.div>
                        </motion.div>
                     )}
                    </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
            </motion.div>
        </motion.div>
    )
};

export default ProjectView;