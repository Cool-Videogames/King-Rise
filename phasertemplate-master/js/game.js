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
    this.cursors = this.input.keyboard.addKeys({
      up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D,
      space:Phaser.Input.Keyboard.KeyCodes.SPACE});
    
    this.input.mouse.disableContextMenu();
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
    let camera =  this.cameras.main;

    //Movimiento
    if (this.cursors.up.isDown && camera.scrollY > -config.cameraLimit){
      camera.scrollY -=  config.cameraSpeed;
    }
    if (this.cursors.down.isDown && camera.scrollY + camera.height  < config.sizeCasilla* config.filas +config.cameraLimit) {
      camera.scrollY += config.cameraSpeed;
    }
    if (this.cursors.left.isDown && camera.scrollX > -config.cameraLimit){
      camera.scrollX -= config.cameraSpeed;

    }
    if(this.cursors.right.isDown && camera.scrollX + camera.width  < config.sizeCasilla* config.columnas +config.cameraLimit){
      camera.scrollX += config.cameraSpeed;
    }

    //Reposicionamiento
    if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){;
      if(this.jug.y - camera.height/2 < -config.cameraLimit)
        camera.scrollY = -config.cameraLimit;
      else if(this.jug.y - camera.height/2 > config.sizeCasilla* config.filas + config.cameraLimit - camera.height)
        camera.scrollY = config.sizeCasilla* config.filas + config.cameraLimit - camera.height;
      else camera.scrollY = this.jug.y - camera.height/2

      if(this.jug.x - camera.width/2 < -config.cameraLimit) 
        camera.scrollX =  -config.cameraLimit;
      else if(this.jug.x - camera.width/2 >config.sizeCasilla* config.columnas+ config.cameraLimit - camera.width)
        camera.scrollX = config.sizeCasilla* config.columnas + config.cameraLimit - camera.width;
      else camera.scrollX = this.jug.x - camera.width/2
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
