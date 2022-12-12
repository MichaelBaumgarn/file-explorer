import { Button, HStack } from "@chakra-ui/react";

import { Folder } from "./FileExplorer";

export interface IFolderHeaderProps {
  folder: Folder;
  index: number;
  handleDeleteFolder: (folder: Folder, index: number) => void;
}
export function FolderHeader({
  folder,
  index,
  handleDeleteFolder,
}: IFolderHeaderProps) {
  return (
    <HStack>
      <h3>{folder.name}</h3>
      {index > 0 && (
        <Button
          variant="outline"
          colorScheme="pink"
          size="xs"
          onClick={() => handleDeleteFolder(folder, index)}
        >
          X
        </Button>
      )}
    </HStack>
  );
}
