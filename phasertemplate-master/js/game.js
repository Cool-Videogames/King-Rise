import ChozaMaestra from "./chozaMaestra.js";
import * as config from "./config.js";
import Interfaz from "./interfaz.js";
import Jugador from "./jugador.js";
import Mapa from "./mapa.js";
import Vector2D from "./vector2D.js";
import Camera from "./camera.js";
import Aldeano from "./aldeano.js";
import Obstaculo from "./obstaculo.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });

    //LISTAS DE ALDEANOS
    this.aldeanosBasicos = [];
    this.mineros = [];
    this.ganaderos = [];
    this.canteros = [];
    this.exploradores = [];

    this.recursos = { oro: 80, comida: 0, materiales: 0, felicidad: 0 }
    this.proxAtaque = 20;
    this.numEdificios = 0;

    this.xSize = 1280;
    this.ySize = 720;
  }

  create() {
    this.mapa = new Mapa(this, config.columnas, config.filas, config.sizeCasilla);
    this.jug = new Jugador(this, new Vector2D(config.columnas / 2, config.filas / 2));
    this.interfaz = new Interfaz(this);
    this.camera = new Camera(this, this.cameras.main);

    //this.input.mouse.disableContextMenu();
    this.chozaMaestra = new ChozaMaestra(this, 0, 0, new Vector2D(700, 300), 0, 0, 'chozaMaestra');

    let nextCell;
    do {
      let columna = Math.floor(Math.random() * config.columnas);
      let fila = Math.floor(Math.random() * config.filas)
      nextCell = this.mapa.mapa[columna][fila];
    }
    while (nextCell.ocupada);
    this.aldeanosBasicos.push(new Aldeano(this, nextCell, 0, 0));

    this.creaObstaculos();
  }

  creaObstaculos() {
    let visitadas = [];
    let zona;
    let check = function (z1, z2) { return z1.zonaColumna == z2.zonaColumna && z1.zonaFila == z2.zonaFila };
    for (let i = 0; i < config.numObstaculos; ++i) {
      if (visitadas.length >= config.zonaColumnas * config.zonaFilas) { visitadas = []; console.log('sech') }
      do {
        zona = {
          zonaColumna: (config.columnas / config.zonaColumnas) * (Math.floor(Math.random() * (config.zonaColumnas - 1)) + 1),
          zonaFila: (config.filas / config.zonaFilas) * (Math.floor(Math.random() * (config.zonaFilas - 1)) + 1)
        }
      }
      while (visitadas.some(item => check(item, zona)));
      let fila = zona.zonaFila + Math.floor(Math.random() * (config.filas / 4));
      let columna = zona.zonaColumna + Math.floor(Math.random() * (config.columnas / 8));
      new Obstaculo(this, 0, this.mapa.mapa[columna][fila]);
      this.mapa.mapa[columna][fila].ocupada = true;
      visitadas.push(zona);
    }
  }

  update(t, dt) {
    this.camera.comportamientoCamara();
  }

  pauseGame() {
    this.scene.pause();
  }
}
