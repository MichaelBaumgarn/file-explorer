import { Button, Input, VStack } from "@chakra-ui/react";
import { Folder, NameStore } from "./FileExplorer";

export interface ICreateFolderProps {
  folderName: NameStore;
  index: number;
  folder: Folder;
  label: string;
  setFolderName: (cb: (value: NameStore) => NameStore) => void;
  handleCreateFolder: (index: number, folder: Folder) => void;
}

export function CreateFolder({
  folderName,
  index,
  folder,
  setFolderName,
  handleCreateFolder,
  label,
}: ICreateFolderProps) {
  return (
    <VStack my="4" alignItems="flex-start">
      <Input
        size="xs"
        width="auto"
        value={folderName[index] || ""}
        onChange={(e) =>
          setFolderName((prev) => ({
            ...prev,
            [index]: e.target.value,
          }))
        }
      ></Input>
      <Button
        size="xs"
        variant="outline"
        onClick={() => handleCreateFolder(index, folder)}
      >
        {label}
      </Button>
    </VStack>
  );
}
