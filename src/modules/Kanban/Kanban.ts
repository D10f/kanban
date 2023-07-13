import Masonry from '../Masonry';
import Modal from '../Modal';
import Board from './Board';

export type Task = {
  id: string;
  description: string;
}

type KanbanParams = {
  selector: string;
  boards?: Board[],
}

export default class Kanban {

  private section: HTMLElement;
  private wrapper: HTMLElement;
  private boards: Board[];

  constructor({ selector, boards }: KanbanParams) {
    this.section = document.querySelector(selector) as HTMLElement;
    this.wrapper = this.section.querySelector(`${selector}__wrapper`) as HTMLElement;
    this.boards = boards || [];
    this.createTaskModal(selector);
    this.render();
    new Masonry(`${selector}__wrapper`);
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
