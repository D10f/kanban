import Masonry from '../Masonry';
import Modal from '../Modal';
import Board from './Board';
import Task from './Task';

type KanbanParams = {
  selector: string;
  boards?: Board[],
}

export default class Kanban {

  private section: HTMLElement;
  private wrapper: HTMLElement;
  private boards: Board[];
  private draggedItem: HTMLElement | null;
  private masonry: Masonry;

  constructor({ selector, boards }: KanbanParams) {
    this.section = document.querySelector(selector) as HTMLElement;
    this.wrapper = this.section.querySelector(`${selector}__wrapper`) as HTMLElement;
    this.boards = boards || [];
    this.draggedItem = null;
    this.createTaskModal(selector);
    this.render();
    this.dragEvents();
    this.masonry = new Masonry(`${selector}__wrapper`);
  }

  private dragEvents() {

    this.wrapper.addEventListener('dragstart', (event) => {
      const draggedItem = event.target as HTMLElement;
      draggedItem.style.opacity = '0.5';
      draggedItem.setAttribute('data-dragging', 'true');
      this.draggedItem = draggedItem;
    });

    this.wrapper.addEventListener('dragend', (event) => {
      // const draggedItem = event.target as HTMLElement;
      this.draggedItem!.style.opacity = '1';
      this.draggedItem!.style.border = '';
      this.draggedItem!.removeAttribute('data-dragging');
      this.draggedItem = null;
    });

    this.wrapper.querySelectorAll('article').forEach(board => {

      const { top } = board.getBoundingClientRect();

      board.addEventListener('dragover', (event) => {
        event.preventDefault();

        const draggedOver = event.target as HTMLElement;
        if (draggedOver.tagName !== 'ARTICLE' && draggedOver.tagName !== 'UL') return;

        const mouseOffsetY = event.clientY - top;

        const items = Array.from(board.querySelectorAll('li:not([data-dragging])'));
        let target: Element | null = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        for (let i = 0, l = items.length; i < l; ++i) {
          const itemCoord = items[i].getBoundingClientRect();
          const itemOffsetY = itemCoord.top - top;

          if (itemOffsetY < mouseOffsetY && itemOffsetY > closestOffset) {
            closestOffset = itemOffsetY;
            target = items[i];
          }
        }

        if (target) {
          target.insertAdjacentElement('afterend', this.draggedItem!);
        } else {
          board.querySelector('ul')!.prepend(this.draggedItem!);
        }

        this.masonry._buildLayout();
      });
    });

    this.wrapper.addEventListener('dragenter', (event) => {
      // const draggedItem = event.target as HTMLElement;
      // if (draggedItem.tagName !== 'LI') return;
      // draggedItem.style.outline = '2px solid coral';
    });

    this.wrapper.addEventListener('dragleave', (event) => {
      // const draggedItem = event.target as HTMLElement;
      // if (draggedItem.tagName !== 'LI') return;
      // draggedItem.style.outline = '';
    });

    this.wrapper.addEventListener('drop', (event) => {
      event.preventDefault();
      // const draggedItem = event.target as HTMLElement;
      // if (draggedItem.tagName !== 'LI') return;
      // draggedItem.style.borderTop = '';
      // todoList.insertBefore(draggedItem, event.target);
    });

  }

  private createTaskModal(selector: string) {

    const newTaskModal = new Modal({
      title: 'Create New Task',
      template: `
        <dialog id="kanban__modal" class="modal">
          <header>
            <h3 class="title">Create New Task</h3>
          </header>

          <form method="dialog">
            <label for="modal-description" class="margin-block-1">Description:</label>
            <input id="modal-description" name="description">

            <label id="modal-board" class="margin-block-1">Board:</label>
            <select id="modal-board" value="${this.boards[0].id}" name="board">
              ${this.boards.map(board => (`
                <option value="${board.id}">${board.title}</option>
              `))}
            </select>

            <footer class="mt-2">
              <button id="on-submit" class="btn btn--inverted">Create</button>
              <button id="on-cancel" class="btn btn--primary">Cancel</button>
            </footer>
          </form>
        </dialog>
      `
    });

    document
      .querySelector(`${selector}__modal-trigger`)!
      .addEventListener('click', () => newTaskModal.open());

    newTaskModal.onSubmit = (dialog: HTMLDialogElement) => {
      const descriptionEl = dialog.querySelector('[name=description]') as HTMLInputElement;
      const boardEl = dialog.querySelector('[name=board]') as HTMLSelectElement;

      if (!descriptionEl.value) {
        throw new Error('Cannot add an empty task.');
      }

      const newTask = {
        id: Math.random().toString(),
        description: descriptionEl.value
      };

      this.addTask(newTask, boardEl.value);
    };
  }

  private render() {
    const fragment = document.createDocumentFragment();

    this.boards.forEach(board => {
      const article = document.createElement('article');
      article.className = 'board';
      article.id = board.title.toLowerCase();
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

  filterTasks(query: string) {
    throw new Error('Not implemented.');
  }
}
