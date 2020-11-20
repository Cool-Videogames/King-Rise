import MovingFavicon from "./MovingFavicon.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon', "phasertemplate-master/favicon.png" );
  }

  create() {
    this.add.text(10, 10, "Favicon Movieeeendose", { fontColor: 0xffff00 });

    //PRIMERA FORMA DE HACERLO
    //this.add.sprite(600,400, 'favicon');

    //SEGUNDA FORMA DE HACERLO
    /*let sprite = new Phaser.GameObjects.Sprite(this,600,400,'favicon');
    this.add.existing(sprite);*/

    //TERCERA FORMA DE HACERLO
     new MovingFavicon(this);
  }

  update(time, delta) {}
}
