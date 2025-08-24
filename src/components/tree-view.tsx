import { type TreeItem } from "@/types";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

interface TreeViewProps {
  data: TreeItem[];
  value?: string | null;
  onSelect?: (value: string) => void;
}

export const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full bg-gray-50 dark:bg-gray-800 border-none">
        <SidebarContent className="bg-transparent">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="p-2">
                {data.map((item, index) => (
                  <Tree
                    key={index}
                    item={item}
                    selectedValue={value}
                    onSelect={onSelect}
                    parentPath=""
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail className="bg-gray-200 dark:bg-gray-700" />
      </Sidebar>
    </SidebarProvider>
  );
};

interface TreeProps {
  item: TreeItem;
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  parentPath: string;
}

const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;

  if (!items.length) {
    // Its a file
    const isSelected = selectedValue === currentPath;

    return (
      <SidebarMenuButton
        isActive={isSelected}
        className="data-[active=true]:bg-blue-100 dark:data-[active=true]:bg-blue-900/30 data-[active=true]:text-blue-900 dark:data-[active=true]:text-blue-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        onClick={() => onSelect?.(currentPath)}
      >
        <FileIcon className={isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
        <span className="truncate">
            {name}
        </span>
      </SidebarMenuButton>
    );
  }

    // Its a folder
    return (
        <SidebarMenuItem>
           <Collapsible
           className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
           defaultOpen
           >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <ChevronRightIcon className="transition-transform text-gray-500 dark:text-gray-400" />
                <FolderIcon className="text-blue-500 dark:text-blue-400" />
                <span className="truncate">
                    {name}
                </span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {items.map((subItem, index) => (
                    <Tree
                        key={index}
                        item={subItem}
                        selectedValue={selectedValue}
                        onSelect={onSelect}
                        parentPath={currentPath}
                    />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
           </Collapsible>
        </SidebarMenuItem>
    );
};
