import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { mockFiles } from "./mockFiles";

export type Folder = {
  name: string;
  type: "folder" | "file";
  children?: Folder[];
  isOpen?: boolean;
};

// todo: names should be unique
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

const FileExplorer: React.FC<Props> = ({ initialFolders }) => {
  const [folderName, setFolderName] = useState<any>({});
  const [currentFolders, setCurrentFolders] = useState([...initialFolders]);

  const handleFolderClick = (folder: Folder, index: number) => {
    if (folder.name === currentFolders[currentFolders.length - 1].name) {
      return;
    }
    console.log("open", folder, index);

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

  const handleDeleteFolder = (folder: Folder) => {
    // Remove the clicked folder from the current folders list
    setCurrentFolders(currentFolders.filter((f) => f !== folder));
  };

  const handleCreateFolder = (
    // name: string,
    index: number,
    currentFolder: Folder
  ) => {
    // Create a new folder and add it to the current folders list
    console.log("check name", folderName, index, folderName[index]);

    const newFolder: Folder = {
      name: folderName[index],
      type: "folder",
      children: [],
    };

    addFolder(currentFolders[0], currentFolder.name, newFolder);

    setCurrentFolders([...currentFolders]);
  };

  const addFolder = (root: Folder, name: string, newFolder: Folder) => {
    if (root.type !== "folder") return;

    if (!root.children) {
      root.children = [];
    }
    if (name === root.name) {
      root.children.push(newFolder);
      return;
    }
    root.children.forEach((child) => {
      if (child.type === "folder") addFolder(child, name, newFolder);
    });
  };
  // const getFolderByName = (children: Folder[], name: string) => {
  //   const next = children.find((c) => c.name === name);
  //   console.log("check name next", next);
  //   if (next) {
  //     return next;
  //   } else {
  //     children.forEach((child) => {
  //       if (child.children) getFolderByName(child.children, name);
  //     });
  //   }
  // };

  // const getCurrentIndex = (children: Folder[], index: number): number => {
  //   console.log("check children inside", children, currentFolders);

  //   const next = children.find((c) => c.isOpen);
  //   console.log("check next", next);
  //   if (!next?.children) {
  //     return index;
  //   } else {
  //     return getCurrentIndex(next.children, index++);
  //   }
  // };
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
                  onClick={() => handleDeleteFolder(folder)}
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
