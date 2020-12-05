import * as config from "./Config.js";
import Jugador from "./Jugador.js";
import Mapa from "./Mapa.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  create() {
    this.setFuncionesGlobales();

    this.jug = new Jugador(this, config.iniPos);
    this.mapa = new Mapa(this,config.columnas,config.filas, config.sizeCasilla);

    this.numEdificios =0;
    this.isPaused= false;

    this.cameras.main.centerOn(0,0)
    this.SuperponerEscenas('interfaz');
  }

  update(time, delta) {

  }


  Pause(pause){this.isPaused = pause;}

  End() {
    //Metodo para pausar el juego
  }

  SuperponerEscenas(key){
    this.scene.launch(key);
  }

  //Lo mas parecido a un singleton que he encontrado
  setFuncionesGlobales(){
    Game.global= {
      test: function(){
        console.log('Hola');
      },
      creaSprite: function(x,y,key,scene){
        let sprite = new Phaser.GameObjects.Sprite(scene, x, y, key);
        sprite.setOrigin(0,0);
        sprite.setInteractive();
        scene.add.existing(sprite);
        return sprite;
      },
      recursos: {
        oro:0, materiales: 0, comida:0, felicidad:0
      },
      proximoAtaque: 20,      
    }
  }
}
