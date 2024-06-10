import { createSvgIcon } from "../../utils";
import Task from "./Task";

type BoardParams = {
  title: string,
  theme: string,
  tasks: Task[]
}

export default class Board {

  public id: string;
  public title: string;
  public theme: string;
  public boardEl: HTMLElement;
  private tasks: Task[];

  constructor({ title, tasks = [], theme }: BoardParams) {
    // this.id = Math.random().toString();
    this.id = title;
    this.title = title;
    this.theme = theme;
    this.tasks = tasks;
    this.boardEl = this.init();
    this.render();
  }

  private init() {
    const article = document.createElement('article');
    article.className = 'board';
    article.id = this.title.toLowerCase();
    article.setAttribute('data-theme', this.theme);

    const header = document.createElement('header');
    header.className = 'board__header';
    article.appendChild(header);

    const h3 = document.createElement('h3');
    h3.className = 'title';
    h3.textContent = this.title;
    header.appendChild(h3);

    const button = document.createElement('button');
    button.className = 'board__options';
    header.appendChild(button);

    const icon = createSvgIcon('cog');
    icon.classList.add('icon', 'icon--small');
    icon.ariaHidden = 'true';
    button.appendChild(icon);

    const hr = document.createElement('hr');
    hr.ariaHidden = 'true';
    article.appendChild(hr);

    const ul = document.createElement('ul');
    ul.className = 'board__list';
    article.appendChild(ul);

    // this.tasks.map(task => {
    //   const li = document.createElement('li');
    //   li.className = 'board__item';
    //   li.setAttribute('draggable', 'true');
    //   li.id = task.id;

    //   const p = document.createElement('p');
    //   p.setAttribute('contenteditable', 'false');
    //   p.textContent = task.description;
    //   li.appendChild(p);

    //   ul.appendChild(li);
    // });

    return article;
  }

  render() {
    const fragment = document.createDocumentFragment();

    this.tasks.map(task => {
      const li = document.createElement('li');
      li.className = 'board__item';
      li.setAttribute('draggable', 'true');
      li.id = task.id;

      const p = document.createElement('p');
      p.setAttribute('contenteditable', 'false');
      p.textContent = task.description;
      li.appendChild(p);

      fragment.appendChild(li);
    });

    this.boardEl.querySelector('ul')!.appendChild(fragment);
  }

  // render() {
  //   return `
  //     <header class="board__header">
  //       <h3 class="title">${this.title}</h3>
  //       <button class="board__options">
  //         <svg class="icon icon--small" aria-hidden="true">
  //           <use xlink:href="/images/sprite.svg#icon-cog"></use>
  //         </svg>
  //       </button>
  //     </header>
  //     <hr aria-label="hidden">
  //     <ul class="board__list">
  //       ${this.tasks.map(task => (`
  //         <li class="board__item" draggable="true" id="${task.id}">
  //           <p contenteditable="false">${task.description}</p>
  //         </li>`)).join('\n')
  //       }
  //     </ul>
  //   `;
  // }

  findById(taskId: string) {
    return this.tasks.find(task => task.id === taskId);
  }

  addTask(task: Task, insertIdx: number) {
    // TODO: Map insertIdx between 0 (beginning) and this.tasks.length (end)
    this.tasks.splice(insertIdx, 0, task);
    // document.querySelector(`#${this.title.toLowerCase()}`)!.innerHTML = this.render();
    const ul = this.boardEl.querySelector('ul') as HTMLUListElement;
    ul.innerHTML = '';
    this.render();
  }
}
