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
import Vector2D from "./vector2D.js";
import Ajustes from "./ajustes.js";
import Minero from "./minero.js";
import Cantero from "./cantero.js";
import Ganadero from "./ganadero.js";
import Explorador from "./explorador.js";

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
    this.numChozas = 0;

    this.xSize = 1280;
    this.ySize = 720;

    this.edificios = [];

    this.casillaPuntero = { x: 0, y: 0 };
    this.cierraMarcoAnterior = () => { };
  }

  create() {
    this.audio = new AudioManager(this);
    this.acciones = new Acciones(this, 5);
    this.mapa = new Mapa(this, config.columnas, config.filas, config.sizeCasilla);
    this.fondo = new Fondo(this, this.mapa);
    this.jug = new Jugador(this, this.mapa.mapa[0][0]);
    this.creaTrono();
    this.ajustes = new Ajustes(this);
    this.interfaz = new Interfaz(this);
    this.camera = new Camera(this, this.cameras.main);
    this.creaObstaculos();
    this.creaAldeanos(config.numAldeanosIniciales, this.aldeanosBasicos);
    this.interfaz.actualizaInterfaz();
    this.oleadasEnemigos = new OleadasEnemigos(this);
    //console.log("");

  }
  update(t, dt) {
    this.camera.comportamientoCamara();
    this.ajustes.comportamientoAjustes();
    
  }

  pauseGame() {
    this.scene.pause();
  }

  creaAldeano(tipo) {
    let nextCell;
    do {
      let columna = Math.floor(Math.random() * config.columnas);
      let fila = Math.floor(Math.random() * config.filas)
      nextCell = this.mapa.mapa[columna][fila];
    }
    while (nextCell.ocupada);
    nextCell.ocupada = true;

    let aldeano;
    if(tipo === this.aldeanosBasicos){
      let sexo = Math.round(Math.random(0, 1));
      if (sexo === 0) sexo = 'aldeano';
      else sexo = 'aldeana'
      aldeano = new Aldeano(this, nextCell, 0, 0, sexo);
    }
    else if(tipo === this.mineros) aldeano = new Minero(this,nextCell,0,0);
    else if(tipo == this.canteros) aldeano = new Cantero(this,nextCell,0,0);
    else if(tipo === this.ganaderos) aldeano = new Ganadero(this,nextCell,0,0);
    else aldeano = new Explorador(this, nextCell, 0, 0);

    return aldeano;
  }
  creaAldeanos(numAldeanos, tipoAldeano) {
    for (let i = 0; i < numAldeanos; i++) tipoAldeano.push(this.creaAldeano(tipoAldeano));
  }

  creaTrono() {
    let coste = { oro: 0, materiales: 0, comida: 0, felicidad: 0 };
    this.trono = new Edificio(this, 100, coste, new Vector2D(config.sizeCasilla * 2, config.sizeCasilla * 3), 2, 2, 'trono');
    this.trono.creaBarraVida();
    for (let i = 1; i < 3; ++i)
      for (let j = 1; j < 3; ++j) {
        this.mapa.mapa[i][j].tint = 0xE2A41F;
        this.mapa.mapa[i][j].sprite.tint = 0xE2A41F; 
        this.mapa.mapa[i][j].ocupada = true;
      }

    this.trono.addToScene();
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
        fila = zona.zonaFila + Math.floor(Math.random() * (config.filas / config.zonaFilas));
        columna = zona.zonaColumna + Math.floor(Math.random() * (config.columnas / config.zonaColumnas))
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
