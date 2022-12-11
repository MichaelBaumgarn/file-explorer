import { Folder } from "./App";

export const mockFiles: Folder[] = [
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
