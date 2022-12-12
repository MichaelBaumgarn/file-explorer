import { Folder } from "./components/FileExplorer";

export const mockFiles: Folder[] = [
  {
    type: "folder",
    name: "My Files",
    children: [
      {
        type: "folder",
        name: "Photos",
        children: [
          {
            type: "folder",
            name: "cars",
            children: [
              { type: "folder", name: "school", children: [] },
              { type: "folder", name: "uni", children: [] },
            ],
          },
          {
            type: "folder",
            name: "Photos 2",
            children: [
              { type: "folder", name: "flowers", children: [] },
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
                    name: "food",
                    children: [
                      {
                        type: "folder",
                        name: "drinks",
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
            name: "nature",
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
                name: "beach",
                children: [
                  {
                    type: "folder",
                    name: "forest",
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
      {
        type: "folder",
        name: "Work",
        children: [{ type: "folder", name: "2022", children: [] }],
      },
    ],
  },
];
