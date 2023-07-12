import Masonry from '../Masonry';
import Board from './Board';

export type Task = {
  id: string;
  description: string;
}

type KanbanParams = {
  selector: string;
  boards: Board[] | null,
}

const themes = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender',
]

const defaultState = [
  new Board({
    title: 'Ideas',
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: [
      {
        id: Math.random().toString(),
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, harum!',
      },
      {
        id: Math.random().toString(),
        description: 'Nulla soluta placeat deserunt ullam, tempora culpa id accusamus libero?',
      }
    ]
  }),

  new Board({
    title: 'Not Started',
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks:[
      {
        id: Math.random().toString(),
        description: 'Nulla soluta placeat deserunt ullam, tempora culpa id accusamus libero?',
      },
      {
        id: Math.random().toString(),
        description: 'Tenetur nesciunt nostrum possimus vitae neque facere repellat molestiae.',
      },
      {
        id: Math.random().toString(),
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, harum!',
      },
      {
        id: Math.random().toString(),
        description: 'Culpa, libero. Facilis magni temporibus numquam repellendus, aperiam tempora.',
      },
      {
        id: Math.random().toString(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt!',
      }
    ]
  }),

  new Board({
    title: 'In Progress',
    theme:  `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: [
      {
        id: Math.random().toString(),
        description: 'Lorem ipsum dolor sit amet.',
      },
      {
        id: Math.random().toString(),
        description: 'Culpa, libero. Facilis magni temporibus numquam repellendus, aperiam tempora.',
      }
    ]
  }),

  new Board({
    title: 'Finished',
    theme: `ctp-${themes[Math.floor(Math.random() * themes.length)]}`,
    tasks: []
  }),
];

export default class Kanban {

  private section: HTMLElement;
  private wrapper: HTMLElement;
  private boards: Board[];

  constructor({ selector, boards }: KanbanParams) {
    this.section = document.querySelector(selector) as HTMLElement;
    this.wrapper = this.section.querySelector(`${selector}__wrapper`) as HTMLElement;
    this.boards = boards || defaultState;
    this.render();
    new Masonry(`${selector}__wrapper`);
  }

  private render() {
    const fragment = document.createDocumentFragment();

    this.boards.forEach(board => {
      const article = document.createElement('article');
      article.className = 'board';
      article.id = board.id;
      article.setAttribute('data-theme', board.theme);
      article.innerHTML = board.render();
      fragment.appendChild(article);
    });

    this.wrapper.appendChild(fragment);
  }

  addTask(task: Task, boardId: string, insertIdx = Infinity) {
    const board = this.boards.find(board => board.id === boardId);
    if (!board) throw new Error('No board found with that id.');
    board.addTask(task, insertIdx);
  }
}
