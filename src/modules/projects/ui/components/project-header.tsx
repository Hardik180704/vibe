import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import {
    ChevronDownIcon,
    ChevronLeftIcon,
    SunMoonIcon
} from 'lucide-react';

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
    projectId: string;
}

export const ProjectHeader = ({projectId}:Props) => {
    const trpc = useTRPC();
    const {data: project} = useSuspenseQuery(
        trpc.projects.getOne.queryOptions({id: projectId})
    );

    const {setTheme, theme} = useTheme()

    return(
    <motion.header 
      className="p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        delay: 0.1
      }}
    >
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Button
            variant="ghost"
            size="sm"
            className="focus-visible:ring-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors pl-2 text-gray-900 dark:text-gray-100 group"
            >
             <motion.div
               whileHover={{ 
                 rotate: [0, -10, 10, -10, 0],
                 scale: 1.2
               }}
               transition={{ 
                 duration: 0.5,
                 ease: "easeInOut"
               }}
             >
               <Image
               src="/logo.svg"
               alt="Vibe"
               width={18}
               height={18}
               className="mr-2"
               />
             </motion.div>
             <motion.span 
               className="text-sm font-medium"
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
             >
               {project.name}
             </motion.span>
             <motion.div
               animate={{ rotate: 0 }}
               whileHover={{ rotate: 180 }}
               transition={{ duration: 0.3 }}
             >
               <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400"/> 
             </motion.div>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DropdownMenuItem asChild>
             <Link href="/" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
               <ChevronLeftIcon className="w-4 h-4"/>
               <span>
                Go to Dashboard
               </span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700"/>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <SunMoonIcon className="size-4 text-gray-500 dark:text-gray-400"/>
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                       <DropdownMenuRadioItem value="light" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <span>Light</span>
                       </DropdownMenuRadioItem>
                       <DropdownMenuRadioItem value="dark" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <span>Dark</span>
                       </DropdownMenuRadioItem>
                       <DropdownMenuRadioItem value="system" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <span>System</span>
                       </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
       </DropdownMenu>
    </motion.header>
    );
}