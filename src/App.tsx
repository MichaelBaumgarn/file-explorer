import "./App.css";

import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Folder = {
  name: string;
  type: "folder" | "file";
  children?: Folder[];
  isOpen?: boolean;
};

const mockFiles: Folder[] = [
  {
    type: "folder",
    name: "My Files",
    children: [
      {
        type: "folder",
        name: "trucks",
        children: [{ type: "folder", name: "unit", children: [] }],
      },
      {
        type: "folder",
        name: "Photos",
        children: [
          {
            type: "folder",
            name: "cars",
            children: [
              { type: "folder", name: "school", children: [] },
              { type: "folder", name: "somethin", children: [] },
            ],
          },
          {
            type: "folder",
            name: "Photos 2",
            children: [
              { type: "folder", name: "waht", children: [] },
              {
                type: "folder",
                name: "movies",
                children: [
                  {
                    type: "file",
                    name: "video1.mp4",
                  },
                  {
                    type: "file",
                    name: "video2.mov",
                  },
                  {
                    type: "folder",
                    name: "foobar",
                    children: [
                      {
                        type: "folder",
                        name: "foobar2",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "folder",
            name: "naturefolder",
            children: [
              {
                type: "file",
                name: "video1.mp4",
              },
              {
                type: "file",
                name: "video2.mov",
              },
              {
                type: "folder",
                name: "beachfolder",
                children: [
                  {
                    type: "folder",
                    name: "forestfolder",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "Videos",
        children: [
          {
            type: "file",
            name: "video1.mp4",
          },
          {
            type: "file",
            name: "video2.mov",
          },
        ],
      },
    ],
  },
];

// todo: names should be unique
function App() {
  return (
    <div className="App">
      <FileExplorer initialFolders={mockFiles} />
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

    // @ts-ignore
    const root = addFolder(currentFolders[0], currentFolder.name, newFolder);

    setCurrentFolders([...currentFolders]);
  };

  const addFolder = (
    root: Folder,
    name: string,
    newFolder: Folder
  ): Folder | undefined => {
    if (root.type !== "folder") return;
    console.log("check root", root, name);
    if (name === root.name) {
      // @ts-ignore
      if (!root.children) {
        root.children = [];
      }
      root.children.push(newFolder);
      return root;
    }
    // @ts-ignore
    // const next = root.children.find((c) => c.name === name);
    // console.log("check name next", next);
    // if (next) {
    //   // todos: always have children
    //   if (!next.children) {
    //     next.children = [];
    //   }
    //   next.children.push(newFolder);
    //   return root;
    // } else {
    // @ts-ignore
    root.children.forEach((child) => {
      if (child && child.type === "folder") addFolder(child, name, newFolder);
    });
    // }
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
    <Flex flexDirection="row">
      {currentFolders.map((folder, index) => {
        console.log(folder);

        return (
          <Box key={index} p={2} style={{ flexDirection: "column" }}>
            <h3>{folder.name}</h3>
            <ul>
              {folder?.children?.map((file) => {
                return (
                  <li key={file.name}>
                    {file.type === "folder" ? (
                      <button onClick={() => handleFolderClick(file, index)}>
                        {file.name}
                      </button>
                    ) : (
                      file.name
                    )}
                  </li>
                );
              })}
            </ul>
            <button onClick={() => handleDeleteFolder(folder)}>
              Delete folder
            </button>
            <input
              onChange={(e) =>
                setFolderName((prev: any) => ({
                  ...prev,
                  [index]: e.target.value,
                }))
              }
            ></input>
            <button onClick={() => handleCreateFolder(index, folder)}>
              Create folder
            </button>
          </Box>
        );
      })}
    </Flex>
  );
};
