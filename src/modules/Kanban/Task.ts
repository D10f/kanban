
// type Task = {
//   id: string;
//   description: string;
// }

export default class Task {

  public id: string;

  constructor(public description: string) {
    this.id = Math.random().toString();
  }
}
