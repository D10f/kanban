import Kanban from "./modules/Kanban/Kanban";
import Board from "./modules/Kanban/Board";

import "./styles/index.scss";
import Mouse from "./modules/Mouse";

const themes = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
];

const defaultState = [
  new Board({
    title: "Ideas",
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: [
      {
        id: Math.random().toString(),
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, harum!",
      },
      {
        id: Math.random().toString(),
        description:
          "Nulla soluta placeat deserunt ullam, tempora culpa id accusamus libero?",
      },
    ],
  }),

  new Board({
    title: "Not Started",
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: [
      {
        id: Math.random().toString(),
        description:
          "Nulla soluta placeat deserunt ullam, tempora culpa id accusamus libero?",
      },
      {
        id: Math.random().toString(),
        description:
          "Tenetur nesciunt nostrum possimus vitae neque facere repellat molestiae.",
      },
      {
        id: Math.random().toString(),
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, harum!",
      },
      {
        id: Math.random().toString(),
        description:
          "Culpa, libero. Facilis magni temporibus numquam repellendus, aperiam tempora.",
      },
      {
        id: Math.random().toString(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt!",
      },
    ],
  }),

  new Board({
    title: "In Progress",
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: [
      {
        id: Math.random().toString(),
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        id: Math.random().toString(),
        description:
          "Culpa, libero. Facilis magni temporibus numquam repellendus, aperiam tempora.",
      },
    ],
  }),

  new Board({
    title: "Finished",
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: [],
  }),
];

new Kanban({ selector: "#kanban", boards: defaultState });

Mouse.init();
