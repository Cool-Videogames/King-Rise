export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {}

  create() {
    this.add.text(10, 10, "Ivan es tonto pero Aida Pablo y Yojhan son preciosos", { fontColor: 0xffff00 });
  }

  update(time, delta) {}
}
