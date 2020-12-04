import Jugador from "./Jugador.js";
import Mapa from "./Mapa.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.cargaImagenes();
  }
  
  create() {
    this.setFuncionesGlobales();

    this.sizeCasilla = 32;
    this.xSize = 30;
    this.ySize = 20;

    this.mapa = new Mapa(this,this.xSize,this.ySize, this.sizeCasilla);
    this.jug = new Jugador(this, this.mapa);
    this.mapa.setJugador(this.jug);

    this.numEdificios =1;
    this.isPaused= false;

    this.cameras.main.startFollow(this.jug);
    this.SuperponerEscenas('interfaz');
  }
  testmethod(){
    console.log('das');
  }

  Pause(pause){this.isPaused = pause;}
  End() {
    //Metodo para pausar el juego
  }
  update(time, delta) {

  }
  cargaImagenes(){
    this.load.image('favicon', "phasertemplate-master/images/favicon.png");
    this.load.image('ground', "phasertemplate-master/images/ground.png");
    this.load.image('jugador', "phasertemplate-master/images/Personaje.png");
    this.load.image('sabana', "phasertemplate-master/images/Sabana.png");
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
