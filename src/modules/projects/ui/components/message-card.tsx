import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FragmentCardProps {
    fragment: Fragment;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
}

const FragmentCard = ({ fragment, isActiveFragment, onFragmentClick }: FragmentCardProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 30 }
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
            className={cn(
                "flex items-start text-start gap-2 p-3 w-fit border rounded-lg group relative overflow-hidden",
                "bg-gray-50 hover:bg-gray-100 border-gray-200",
                "dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600",
                "shadow-sm hover:shadow-md",
                isActiveFragment && 
                "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100 shadow-md " +
                "dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-500/50 dark:hover:bg-blue-900/40"
            )}
            onClick={() => onFragmentClick(fragment)}>
            <motion.div 
                className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10",
                    isActiveFragment ? "from-blue-400 to-purple-400" : "from-gray-400 to-gray-500"
                )}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <Code2Icon className={cn(
                    "size-4 mt-0.5 relative z-10",
                    isActiveFragment ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                )}/>
            </motion.div>
            <div className="flex flex-col flex-1 relative z-10">
              <span className="text-sm font-medium line-clamp-1">
                {fragment.title}
              </span>
              <span className={cn(
                "text-sm",
                isActiveFragment ? "text-blue-700 dark:text-blue-300" : "text-gray-600 dark:text-gray-400"
              )}>
                Preview
              </span>
            </div>
            <motion.div 
                className="flex items-center justify-center mt-0.5 relative z-10"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <ChevronRightIcon className={cn(
                    "size-4",
                    isActiveFragment ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                )} />
            </motion.div>
        </motion.button>
    )
}

interface UserMessageProps {
    content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
    return (
        <motion.div 
            className="flex justify-end pb-4 pr-2 pl-10"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        >
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <Card className="rounded-lg p-3 shadow-sm border max-w-[80%] break-words bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-100">
                    {content}
                </Card>
            </motion.div>
        </motion.div>
    )
}

interface AssistantMessageProps {
    content: string;
    fragment: Fragment | null;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
    type: MessageType;
}

const AssistantMessage = ({
    content,
    fragment,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type,
}: AssistantMessageProps) => {
    return (
        <motion.div 
            className={cn(
                "flex flex-col group px-2 pb-4",
                type === "ERROR" && "text-red-700 dark:text-red-400",
            )}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        >
            <motion.div 
                className="flex items-center gap-2 pl-2 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <Image
                            src="/logo.svg"
                            alt="Vibe"
                            width={18}
                            height={18}
                            className="shrink-0 drop-shadow-sm"
                        />
                    </motion.div>
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-sm"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Vibe</span>
                <motion.span 
                    className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
                </motion.span>
            </motion.div>
            <motion.div 
                className="pl-7 flex flex-col gap-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{content}</span>
                {fragment && type === "RESULT" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <FragmentCard
                          fragment={fragment}
                          isActiveFragment={isActiveFragment}
                          onFragmentClick={onFragmentClick}
                        />
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

interface MessageCardProps {
    content: string;
    role: MessageRole;
    fragment: Fragment | null;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick: () => void;
    type: MessageType;
}

export const MessageCard = ({
    content,
    role,
    fragment,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type,
}: MessageCardProps) => {
    if (role === "ASSISTANT") {
        return (
            <AssistantMessage
                content={content}
                fragment={fragment}
                createdAt={createdAt}
                isActiveFragment={isActiveFragment}
                onFragmentClick={onFragmentClick}
                type={type}
            />
        )
    }

    return (
        <UserMessage content={content} />
    )
}