import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { CreateFolder } from "./CreateFolder";
import { FolderHeader } from "./FolderHeader";
import { FolderList } from "./FolderList";

export type Folder = {
  name: string;
  type: "folder" | "file";
  children?: Folder[];
  isOpen?: boolean;
};

type Props = {
  initialFolders: Folder[];
};

export type NameStore = {
  [key: string]: string;
};

// todos: would be good if folders had more unique identifier than name
export const FileExplorer: React.FC<Props> = ({ initialFolders }) => {
  const [folderName, setFolderName] = useState<NameStore>({});
  const [fileName, setFileName] = useState<NameStore>({});
  const [currentFolders, setCurrentFolders] = useState([...initialFolders]);

  const handleFolderClick = (folder: Folder, index: number) => {
    if (folder.name === currentFolders[currentFolders.length - 1].name) {
      return;
    }

    // Add the clicked folder to the current folders list
    // getFolderByName(folder.name)
    // rm all folders set open
    // find current folder, set is open true
    if (index !== currentFolders.length - 1) {
      const mutateFolders = [...currentFolders];
      const newFolders = mutateFolders.splice(0, index + 1);
      setCurrentFolders([...newFolders, folder]);
    } else {
      setCurrentFolders([...currentFolders, folder]);
    }
  };

  const handleCreateFile = (index: number, currentFolder: Folder) => {
    const newFile: Folder = {
      name: fileName[index],
      type: "file",
    };

    addFolder(currentFolders[0], currentFolder.name, newFile);

    setCurrentFolders([...currentFolders]);
    setFileName((prev) => ({ ...prev, [index]: "" }));
  };

  const handleDeleteFolder = (folder: Folder, index: number) => {
    if (currentFolders[0].children) {
      removeFolder(currentFolders[0], currentFolders[0].children, folder.name);

      const updatedCurrentFolder = currentFolders.filter((f) => f !== folder);
      // index (inclusive) until end
      if (index < currentFolders.length - 1) {
        const mutateFolders = [...updatedCurrentFolder];
        const newFolders = mutateFolders.splice(0, index);
        setCurrentFolders([...newFolders]);
      } else {
        setCurrentFolders(updatedCurrentFolder);
      }
    }
  };

  const handleCreateFolder = (index: number, currentFolder: Folder) => {
    const newFolder: Folder = {
      name: folderName[index],
      type: "folder",
      children: [],
    };

    addFolder(currentFolders[0], currentFolder.name, newFolder);

    setCurrentFolders([...currentFolders]);
    setFolderName((prev) => ({ ...prev, [index]: "" }));
  };

  const removeFolder = (
    parent: Folder | null,
    children: Folder[],
    name: string
  ) => {
    const findTarget = children.find((c) => c.name === name);
    if (!findTarget) {
      children.forEach((child) => {
        if (child.children) {
          return removeFolder(child, child.children, name);
        }
      });
    }
    const newChildren = children.filter((c) => c.name !== name);
    if (parent) {
      parent.children = newChildren;
      return;
    }
  };

  const addFolder = (root: Folder, name: string, newFolder: Folder) => {
    if (root.type !== "folder") return;

    if (!root.children) {
      root.children = [];
    }
    if (
      name === root.name &&
      !root.children.find((c) => c.name === newFolder.name) &&
      newFolder.name.trim() !== ""
    ) {
      root.children.push(newFolder);
      return;
    }
    root.children.forEach((child) => {
      if (child.type === "folder") addFolder(child, name, newFolder);
    });
  };

  return (
    <Flex m="4" flexDirection="row">
      {currentFolders.map((folder, index) => {
        return (
          <Box key={index} p={2} style={{ flexDirection: "column" }}>
            <FolderHeader
              folder={folder}
              index={index}
              handleDeleteFolder={handleDeleteFolder}
            />
            <FolderList
              folder={folder}
              currentFolders={currentFolders}
              index={index}
              handleFolderClick={handleFolderClick}
            />
            <CreateFolder
              folderName={folderName}
              index={index}
              folder={folder}
              setFolderName={setFolderName}
              handleCreateFolder={handleCreateFolder}
              label="Create Folder"
            />
            <CreateFolder
              folderName={fileName}
              index={index}
              folder={folder}
              setFolderName={setFileName}
              handleCreateFolder={handleCreateFile}
              label="Create File"
            />
          </Box>
        );
      })}
    </Flex>
  );
};
