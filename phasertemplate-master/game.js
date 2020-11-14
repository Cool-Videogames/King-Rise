export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.preload.sprite('favicon','phasertemplate-master/favicon.png');
  }
  create() {
    this.add.text(10, 10, "Ivan es tonto pero Aida Pablo y Yojhan son preciosos", { fontColor: 0xffff00 });
    this.add.sprite(100,200,'favicon');
  }

  update(time, delta) {}
}
