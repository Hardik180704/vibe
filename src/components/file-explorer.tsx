import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment } from "react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { CodeView } from "@/components/code-view";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { convertFilesToTreeItems } from "@/lib/utils";
import { TreeView } from "./tree-view";

type FileCollection = { [path: string]: string };

function getLanguageFromExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension || "text";
}

interface FileBreadcrumbProps {
  filePath: string;
}

const FileBreadcrumb = ({ filePath }: FileBreadcrumbProps) => {
  const pathSegments = filePath.split("/");
  const maxSegments = 3;
  
  const renderBreadcrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium text-gray-900 dark:text-gray-100">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">
                  {segment}
                </span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator/>}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length-1]
      
      return (
        <BreadcrumbItem>
        <span className="text-muted-foreground">
          {firstSegment}
        </span>
        <BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbEllipsis/>
        </BreadcrumbItem>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium">
            {lastSegment}
          </BreadcrumbPage> 
        </BreadcrumbItem>
        </BreadcrumbItem>
      )
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  )
};

interface FileExplorerProps {
  files: FileCollection;
}

export const FileExplorer = ({ files }: FileExplorerProps) => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null; 
  });

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);

  const handleFileSelect = useCallback((filePath: string) => {
    if (files[filePath]) {
      setSelectedFile(filePath);
    }
  }, [files]);

  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(files[selectedFile])
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
    }
  }, [selectedFile, files]);

  return (
    <ResizablePanelGroup direction="horizontal" className="bg-white dark:bg-gray-900">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <TreeView
         data={treeData}
         value={selectedFile}
         onSelect={handleFileSelect}
        />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors bg-gray-200 dark:bg-gray-700"/>
      <ResizablePanel defaultSize={70} minSize={50} className="bg-white dark:bg-gray-900">
        {selectedFile && files[selectedFile] ? (
            <div className="h-full w-full flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 flex justify-between items-center gap-x-2">
                  <FileBreadcrumb filePath={selectedFile} />
                  <Hint text="Copy to clipboard" side="bottom">
                    <Button
                     variant="outline"
                     size="icon"
                     className="ml-auto border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                     onClick={handleCopy}
                     disabled={copied}
                    >
                      {copied ? (
                        <CopyCheckIcon className="text-green-600 dark:text-green-400"/>
                      ) : (
                        <CopyIcon className="text-gray-600 dark:text-gray-400"/>
                      )}
                    </Button>
                  </Hint>
                </div>
                <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
                  <CodeView
                   code={files[selectedFile]}
                   lang={getLanguageFromExtension(selectedFile)}
                  />
                </div>
            </div>
        ) : (
            <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No File Selected</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Choose a file from the sidebar to view its content</p>
                  </div>
                </div>
            </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
