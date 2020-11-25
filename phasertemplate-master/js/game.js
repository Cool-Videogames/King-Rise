import Mapa from "./Mapa.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon', "phasertemplate-master/images/favicon.png");
    this.load.image('cesped', "phasertemplate-master/images/ground.png");
  }

  create() {
    new Mapa(this,10,10);
  }
  update(time, delta) {}
}
