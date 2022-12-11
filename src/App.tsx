import { Box, Button, Flex, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { mockFiles } from "./mockFiles";

export type Folder = {
  name: string;
  type: "folder" | "file";
  children?: Folder[];
  isOpen?: boolean;
};

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <FileExplorer initialFolders={mockFiles} />
      </ChakraProvider>
    </div>
  );
}

export default App;

type Props = {
  initialFolders: Folder[];
};

// todos: would be good if folders had more unique identifier than name
const FileExplorer: React.FC<Props> = ({ initialFolders }) => {
  const [folderName, setFolderName] = useState<any>({});
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
      console.log("check new", newFolders);
      setCurrentFolders([...newFolders, folder]);
    } else {
      setCurrentFolders([...currentFolders, folder]);
    }
  };

  const handleDeleteFolder = (folder: Folder, index: number) => {
    // Remove the clicked folder from the current folders list
    if (currentFolders[0].children) {
      removeFolder(currentFolders[0], currentFolders[0].children, folder.name);

      const updatedCurrentFolder = currentFolders.filter((f) => f !== folder);
      // index (inclusive) until end
      if (index < currentFolders.length - 1) {
        const mutateFolders = [...updatedCurrentFolder];
        const newFolders = mutateFolders.splice(0, index);
        setCurrentFolders([...newFolders]);
      } else {
        // todo: bug: if remove is in middle, all to the right need to be removed as well with splice
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
    setFolderName((prev: any) => ({ ...prev, [index]: "" }));
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

  useEffect(() => {
    console.log("update currentFolders", currentFolders);
  }, [currentFolders]);

  return (
    <Flex m="4" flexDirection="row">
      {currentFolders.map((folder, index) => {
        return (
          <Box key={index} p={2} style={{ flexDirection: "column" }}>
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
            {folder?.children?.map((file) => {
              return (
                <Box my="2" key={file.name}>
                  {file.type === "folder" ? (
                    <Button
                      variant="outline"
                      colorScheme={
                        file.name === currentFolders[index + 1]?.name
                          ? "blue"
                          : ""
                      }
                      onClick={() => handleFolderClick(file, index)}
                    >
                      {file.name}
                    </Button>
                  ) : (
                    file.name
                  )}
                </Box>
              );
            })}
            {folder?.children?.length === 0 && "empty"}
            <VStack alignItems="flex-start">
              <Input
                size="xs"
                width="auto"
                value={folderName[index]}
                onChange={(e) =>
                  setFolderName((prev: any) => ({
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
                Create folder
              </Button>
            </VStack>
          </Box>
        );
      })}
    </Flex>
  );
};
