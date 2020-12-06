import * as config from "./config.js";
import Interfaz from "./Interfaz.js";
import Jugador from "./jugador.js";
import Mapa from "./mapa.js";
import Vector2D from "./vector2D.js";

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

    this.xSize = 1280;
    this.ySize = 720;
  }

  create() {
    this.mapa = new Mapa(this,config.columnas,config.filas, config.sizeCasilla);
    let iniJugador = new Vector2D(config.columnas/2,config.filas/2);
    this.jug = new Jugador(this,iniJugador);
    this.interfaz = new Interfaz(this);

    this.cameras.main.centerOn(this.jug.x,this.jug.y);
    this.cursors = this.input.keyboard.addKeys({up: 'W',down:'S',left:'A',right:'D'});
  }

  getxSize(){
    return this.xSize;
  }
  getySize(){
    return this.ySize;
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
  
  comportamientoCamara(){
    
    if (this.cursors.up.isDown && this.cameras.main.scrollY > -config.cameraLimit){
      this.cameras.main.scrollY -=  config.cameraSpeed;
    }
    if (this.cursors.down.isDown && this.cameras.main.scrollY + this.cameras.main.height  < config.sizeCasilla* config.filas +config.cameraLimit) {
      this.cameras.main.scrollY += config.cameraSpeed;
    }
    if (this.cursors.left.isDown && this.cameras.main.scrollX > -config.cameraLimit){
      this.cameras.main.scrollX -= config.cameraSpeed;

    }
    if(this.cursors.right.isDown && this.cameras.main.scrollX + this.cameras.main.width  < config.sizeCasilla* config.columnas +config.cameraLimit){
      this.cameras.main.scrollX += config.cameraSpeed;
    }
  }

  update(time, delta) {
   this.comportamientoCamara();
  }

  pause(pause){this.isPaused = pause;}

  end() {
    //Metodo para pausar el juego
  }
}
