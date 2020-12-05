import * as config from "./Config.js";
import Interfaz from "./Interfaz.js";
import Jugador from "./Jugador.js";
import Mapa from "./Mapa.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });

    //SE NECESITAN AQUI ESTOS ATRIBUTOS PARA PODER ACCEDER DESDE FUERA
    //NO ESTOY SEGURO SI ES LA MEJOR OPCION
    this.recursos = {
      oro: 0, comida: 0, materiales: 0, felicidad: 0
    }
    this.proxAtaque = 20;
    this.numEdificios =0;
    this.isPaused= false;
  }

  create() {
    this.jug = new Jugador(this, config.iniPos);
    this.mapa = new Mapa(this,config.columnas,config.filas, config.sizeCasilla);
    this.interfaz = new Interfaz(this);
    this.cameras.main.centerOn(0,0);
  }
  
  //ESTA FUNCION SE PUEDE USAR EN CUALQUIER PARTE, NO SE SI SU LUGAR ES EL GAME
  //(PLANTEAR UN JS CON FUNCIONES EXTERNAS)
  creaSprite(x,y,key,scene){
    let sprite = new Phaser.GameObjects.Sprite(scene, x, y, key);
    sprite.setOrigin(0,0);
    sprite.setInteractive();
    scene.add.existing(sprite);
    return sprite;
  }
  update(time, delta) {
  }

  Pause(pause){this.isPaused = pause;}

  End() {
    //Metodo para pausar el juego
  }
}
