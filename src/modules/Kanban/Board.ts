import { Task } from "./Kanban";

type BoardParams = {
  title: string,
  theme: string,
  tasks: Task[]
}

export default class Board {

  public id: string;
  private title: string;
  private tasks: Task[];
  public theme: string;

  constructor({ title, tasks = [], theme }: BoardParams) {
    this.id = Math.random().toString();
    this.title = title;
    this.theme = theme;
    this.tasks = tasks;
  }

  render() {
    return `
      <header class="board__header">
        <h3 class="title">${this.title}</h3>
        <button class="board__options">
          <svg class="icon icon--small" aria-hidden="true">
            <use xlink:href="/images/sprite.svg#icon-cog"></use>
          </svg>
        </button>
      </header>
      <hr aria-label="hidden">
      <ul class="board__list">
        ${this.tasks.map(task => (`
          <li class="board__item" draggable="true" id="${task.id}">
            ${task.description}
          </li>`)).join('\n')
        }
      </ul>
    `;
  }

  findById(taskId: string) {
    return this.tasks.find(task => task.id === taskId);
  }

  addTask(task: Task, insertIdx: number) {
    // TODO: Map insertIdx between 0 (beginning) and this.tasks.length (end)
    this.tasks.splice(insertIdx, 0, task);
  }
}
