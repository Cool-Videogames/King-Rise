import Mapa from "./js/Mapa.js";
import MovingFavicon from "./js/MovingFavicon.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon', "phasertemplate-master/images/favicon.png");
    this.load.image('cesped', "phasertemplate-master/images/cespedMiniBlanco.png");
  }

  create() {
    //PRIMERA FORMA DE HACERLO
    //this.add.sprite(600,400, 'favicon');

    //SEGUNDA FORMA DE HACERLO
    /*let sprite = new Phaser.GameObjects.Sprite(this,600,400,'favicon');
    this.add.existing(sprite);*/

     //INTENTO DE MAPA
    new Mapa(this,12);
    
    //TERCERA FORMA DE HACERLO
    new MovingFavicon(this);
  }
  //DETECTA MUCHOS CLICKS
  update(time, delta) {
    this.input.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) {
        console.log('Hola');
      }
    });
  }
}
