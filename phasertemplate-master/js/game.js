import ChozaMaestra from "./chozaMaestra.js";
import * as config from "./config.js";
import Interfaz from "./interfaz.js";
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

    this.xSize = 1280;
    this.ySize = 720;
  }

  create() {
    this.mapa = new Mapa(this,config.columnas,config.filas, config.sizeCasilla);
    let iniJugador = new Vector2D(config.columnas/2,config.filas/2);
    this.jug = new Jugador(this,iniJugador);
    this.interfaz = new Interfaz(this);
    this.camera = new Camera(this,this.cameras.main);

    //this.input.mouse.disableContextMenu();
    this.chozaMaestra = new ChozaMaestra(this,0,0,new Vector2D(100,100), 'chozaMaestra');

    //PROBANDO QUE LOS EDIFICIOS DE RECURSOS FUNCAN
  }

  getXSize(){
    return this.xSize;
  }
  getYSize(){
    return this.ySize;
  }

  //ESTA FUNCION SE PUEDE USAR EN CUALQUIER PARTE, NO SE SI SU LUGAR ES EL GAME
  //(PLANTEAR UN JS CON FUNCIONES EXTERNAS)
  creaSprite(x,y,key,scene, depth){
    let sprite = new Phaser.GameObjects.Sprite(scene, x, y, key);
    sprite.setOrigin(0,0);
    sprite.setInteractive();
    sprite.setDepth(depth);
    scene.add.existing(sprite);
    return sprite;
  }
  

  update(t, dt) {
    this.camera.comportamientoCamara();
  }

  pauseGame(){
    this.scene.pause();
  }

  end() {
    //Metodo para pausar el juego
  }
}
