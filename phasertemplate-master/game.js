import MovingFavicon from "./MovingFavicon";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon','phasertemplate-master/favicon.png');
  }

  create() {
    this.add.text(10, 10, "Favicon moviendose!", { fontColor: 0xffff00 });
    this.add.sprite(200,200,'favicon');
    //new MovingFavicon(this, 'favicon');
  }

  update(time, delta) {}
}
