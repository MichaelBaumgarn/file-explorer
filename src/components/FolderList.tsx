import { Box, Button, Text } from "@chakra-ui/react";

import { Folder } from "./FileExplorer";

export interface IFolderListProps {
  folder: Folder;
  currentFolders: Folder[];
  index: number;
  handleFolderClick: (file: Folder, index: number) => void;
}
export function FolderList({
  folder,
  currentFolders,
  index,
  handleFolderClick,
}: IFolderListProps) {
  if (folder?.children?.length === 0) {
    return <Text>empty</Text>;
  }
  return (
    <div>
      {folder?.children?.map((file) => {
        return (
          <Box my="2" key={file.name}>
            {file.type === "folder" ? (
              <Button
                minWidth="150"
                variant="outline"
                colorScheme={
                  file.name === currentFolders[index + 1]?.name ? "blue" : ""
                }
                onClick={() => handleFolderClick(file, index)}
                justifyContent="flex-start"
              >
                {file.name}
              </Button>
            ) : (
              file.name
            )}
          </Box>
        );
      })}
    </div>
  );
}
