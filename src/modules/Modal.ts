type ModalProps = {
  title: string,
  template: string,
};

export default class Modal {

  private dialog: HTMLDialogElement;
  private onCancelCallback: Function;
  private onSubmitCallback: Function;
  public title: string;

  constructor({ title, template }: ModalProps) {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = template;
    this.dialog = dialog.firstElementChild as HTMLDialogElement;
    document.body.appendChild(this.dialog);

    this.title = title;
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
    if (typeof cancelCallbackFn !== 'function')
      throw new Error('Invalid value provided.');
    this.onCancelCallback = cancelCallbackFn;
  }

  set onSubmit(submitCallbackFn: Function) {
    if (typeof submitCallbackFn !== 'function')
      throw new Error('Invalid value provided.');
    this.onSubmitCallback = submitCallbackFn;
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }
}
