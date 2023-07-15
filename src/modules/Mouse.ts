export default class Mouse {

  static x = -1;
  static y = -1;

  static init() {

    if (Mouse.x >= 0 || Mouse.y >= 0) return;

    document.body.addEventListener('mousemove', ({ x, y }) => {
      Mouse.x = x;
      Mouse.y = y;
    });
  }
}
