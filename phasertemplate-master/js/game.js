import Jugador from "./Jugador.js";
import Mapa from "./Mapa.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.image('favicon', "phasertemplate-master/images/favicon.png");
    this.load.image('ground', "phasertemplate-master/images/ground.png");
    this.load.image('jugador', "phasertemplate-master/images/Personaje.png");
    this.load.image('suelo', "phasertemplate-master/images/sueloFinal.png" )
  }
  
  create() {
    this.sizeCasilla = 32;
    this.mapa = new Mapa(this,20,20, this.sizeCasilla);

    this.jug = new Jugador(this, this.mapa);
    this.mapa.setJugador(this.jug);
  }
  update(time, delta) {}
}
