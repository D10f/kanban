export default class Modal {

  private dialog: HTMLDialogElement;
  private onCancelCallback: Function;
  private onSubmitCallback: Function;

  constructor(selector: string) {
    this.dialog = document.querySelector(selector) as HTMLDialogElement;
    this.onCancelCallback = () => {};
    this.onSubmitCallback = () => {};
    this.events();
  }

  private events() {
    this.dialog.querySelector('#on-cancel')!.addEventListener('click', () => {
      this.close();
      this.onCancelCallback(this.dialog);
    });

    this.dialog.querySelector('#on-submit')!.addEventListener('click', () => {
      this.close();
      this.onSubmitCallback(this.dialog);
    });
  }

  set onCancel(cancelCallbackFn: Function) {
    if (typeof cancelCallbackFn !== 'function') throw new Error('Invalid value provided.');
    this.onCancelCallback = cancelCallbackFn;
  }

  set onSubmit(submitCallbackFn: Function) {
    if (typeof submitCallbackFn !== 'function') throw new Error('Invalid value provided.');
    this.onSubmitCallback = submitCallbackFn;
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }
}
