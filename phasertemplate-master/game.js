import Mapa from "./Mapa.js";
import MovingFavicon from "./MovingFavicon.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon', "phasertemplate-master/images/favicon.png");
    this.load.image('cesped', "phasertemplate-master/images/cespedMiniBlanco.png");
  }

  create() {
    
    let favicon = new MovingFavicon(this);
    new Mapa(this,16,favicon);
  }
  update(time, delta) {
  }
}
