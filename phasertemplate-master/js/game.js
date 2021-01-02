import * as config from "./config.js";
import Interfaz from "./interfaz.js";
import Jugador from "./jugador.js";
import Mapa from "./mapa.js";
import Camera from "./camera.js";
import Aldeano from "./aldeano.js";
import Obstaculo from "./obstaculo.js";
import Acciones from "./acciones.js";
import Edificio from "./edificio.js";
import AudioManager from "./audioManager.js";
import Fondo from "./fondo.js";
import OleadasEnemigos from "./oleadasEnemigos.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });

    //LISTAS DE ALDEANOS
    this.aldeanosBasicos = [];
    this.mineros = [];
    this.ganaderos = [];
    this.canteros = [];
    this.exploradores = [];

    this.recursos = { oro: 500, comida: 100, materiales: 100, felicidad: 100 }
    this.proxAtaque = 20;
    this.numEdificios = 0;

    this.xSize = 1280;
    this.ySize = 720;

    this.casillaPuntero = { x: 0, y: 0 };
    this.cierraMarcoAnterior = () => { };

  }

  create() {
    this.audio = new AudioManager(this);
    this.acciones = new Acciones(this, config.numeroAccionesIniciales);
    this.mapa = new Mapa(this, config.columnas, config.filas, config.sizeCasilla);
    this.fondo = new Fondo(this, this.mapa);
    this.jug = new Jugador(this, this.mapa.mapa[0][0]);
    this.creaTrono();
    this.interfaz = new Interfaz(this);
    this.camera = new Camera(this, this.cameras.main);
    this.creaObstaculos();
    this.creaAldeanos();
    this.interfaz.actualizaInterfaz();
    this.oleadasEnemigos = new OleadasEnemigos(this);

  }
  update(t, dt) {
    this.camera.comportamientoCamara();
  }

  pauseGame() {
    this.scene.pause();
  }

  //ALDEANOS, OBSTACULOS Y TRONO (PENSAR EN ESTRUCTURARLO EN CLASES)

  creaAldeano() {
    let nextCell;
    do {
      let columna = Math.floor(Math.random() * config.columnas);
      let fila = Math.floor(Math.random() * config.filas)
      nextCell = this.mapa.mapa[columna][fila];
    }
    while (nextCell.ocupada);
    nextCell.ocupada = true;

    let sexo = Math.round(Math.random(0, 1));
    if(sexo === 0) sexo = 'aldeano'; 
    else sexo = 'aldeana'
    let aldeano = new Aldeano(this, nextCell, 0, 0, sexo);
    return aldeano;
  }
  creaAldeanos(){
    for(let i = 0; i< config.numAldeanosIniciales;i++) this.aldeanosBasicos.push(this.creaAldeano());
  }

  creaTrono() {
    let coste = { oro: 0, materiales: 0, comida: 0, felicidad: 0 };
    this.trono = new Edificio(this, 100, coste, {}, 2, 2, 'trono');
    this.trono.x = config.sizeCasilla * 2;
    this.trono.y = config.sizeCasilla * 3;
    for (let i = 1; i < 3; ++i)
      for (let j = 1; j < 3; ++j) {
        this.mapa.mapa[i][j].tint = 0xE2A41F;
        this.mapa.mapa[i][j].sprite.tint = 0xE2A41F; 7
        this.mapa.mapa[i][j].ocupada = true;
      }
  }

  creaObstaculos() {
    let visitadas = [];
    let zona;
    let check = function (z1, z2) { return z1.zonaColumna == z2.zonaColumna && z1.zonaFila == z2.zonaFila };
    for (let i = 0; i < config.numObstaculos; ++i) {
      if (visitadas.length >= config.zonaColumnas * config.zonaFilas) { visitadas = []; }
      do {
        zona = {
          zonaColumna: (config.columnas / config.zonaColumnas) * (Math.floor(Math.random() * config.zonaColumnas)),
          zonaFila: (config.filas / config.zonaFilas) * (Math.floor(Math.random() * config.zonaFilas))
        }
      }
      while (visitadas.some(item => check(item, zona)));

      let fila;
      let columna;

      do {
        fila = zona.zonaFila + Math.floor(Math.random() * (config.filas / 4));
        columna = zona.zonaColumna + Math.floor(Math.random() * (config.columnas / 8))
      }
      while (this.mapa.mapa[columna][fila].ocupada);

      //COSTE EN ORO
      let coste = 10;
      new Obstaculo(this, coste, this.mapa.mapa[columna][fila]);
      this.mapa.mapa[columna][fila].tint = 0xE2A41F;
      this.mapa.mapa[columna][fila].sprite.tint = 0xE2A41F;
      this.mapa.mapa[columna][fila].ocupada = true;
      visitadas.push(zona);
    }
  }
}
