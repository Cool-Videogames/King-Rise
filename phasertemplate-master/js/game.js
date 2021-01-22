import * as config from "./config.js";
import * as functions from "./functions.js";
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
import Exploracion from "./exploracion.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  create() {
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

    
/////////////////////////////////////////////////////////////

    this.audio = new AudioManager(this);
    this.audio.menuInicio.pause(this.musicConfig);
    this.audio.mainSound.play(this.musicConfig);
    this.acciones = new Acciones(this, config.numeroAccionesIniciales);
    this.ajustes = new Ajustes(this);
    this.interfaz = new Interfaz(this);
    this.mapa = new Mapa(this, config.columnas, config.filas, config.sizeCasilla);
    this.fondo = new Fondo(this, this.mapa);
    this.jug = new Jugador(this, this.mapa.mapa[0][0]);
    this.creaTrono();
    this.camera = new Camera(this, this.cameras.main);
    this.creaObstaculos();
    this.creaAldeanos(config.numAldeanosIniciales, this.aldeanosBasicos);
    this.interfaz.actualizaInterfaz();
    this.oleadasEnemigos = new OleadasEnemigos(this);
    this.exploracion = new Exploracion(this);

    //CartelFinJuego
    this.creaCartelFinal();
    
  }

  creaCartelFinal(){
    this.cartelFin = functions.creaSprite(640, 360, 'finJuego', this, config.hudDepth + 1);
    this.scoreText = this.add.text(890, 295, this.acciones.rondasSuperadas, { fill: '#000' });
    this.reintentarFin = functions.creaSprite(640, 380, 'reintentarFin', this, config.hudDepth + 1);
    this.salirFin = functions.creaSprite(640, 430, 'salirFin', this, config.hudDepth + 1);
    
    this.menuFin(this.cartelFin, this.scoreText, this.reintentarFin, this.salirFin);

    this.changeColorBoton(this.reintentarFin);
    this.changeColorBoton(this.salirFin);
    this.reintentarJuego(this.reintentarFin);
    this.salirJuego(this.salirFin);
  }

  update(t, dt) {
    this.camera.comportamientoCamara();
    this.ajustes.comportamientoAjustes();
  }

  pauseGame() {
    this.scene.pause();
  }

  menuFin(cartelFin, scoreText, reintentar, salir){

    cartelFin.setScale(cartelFin.scaleX / 2.5, cartelFin.scaleY / 2.5);
    cartelFin.setOrigin(0.5, 0.5);
    cartelFin.setScrollFactor(0);
    cartelFin.setVisible(false);

    scoreText.setFont(config.font);
    scoreText.setFontSize(50);
    scoreText.setDepth(config.hudDepth + 1);
    scoreText.setScrollFactor(0);
    scoreText.setVisible(false);

    reintentar.setScale(reintentar.scaleX * 2, reintentar.scaleY * 2);
    reintentar.setOrigin(0.5, 0.5);
    reintentar.setScrollFactor(0);
    reintentar.setVisible(false);

    salir.setScale(salir.scaleX * 2, salir.scaleY * 2);
    salir.setOrigin(0.5, 0.5);
    salir.setScrollFactor(0);
    salir.setVisible(false);
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
    if (tipo === this.aldeanosBasicos) {
      let sexo = Math.round(Math.random(0, 1));
      if (sexo === 0) sexo = 'aldeano';
      else sexo = 'aldeana'
      aldeano = new Aldeano(this, nextCell, config.aldeanosBasicos.vida, config.aldeanosBasicos.dmg, sexo);
    }
    else if (tipo === this.mineros) aldeano = new Minero(this, nextCell);
    else if (tipo == this.canteros) aldeano = new Cantero(this, nextCell);
    else if (tipo === this.ganaderos) aldeano = new Ganadero(this, nextCell);
    else aldeano = new Explorador(this, nextCell);

    return aldeano;
  }
  creaAldeanos(numAldeanos, tipoAldeano) {
    for (let i = 0; i < numAldeanos; i++) tipoAldeano.push(this.creaAldeano(tipoAldeano));
  }

  creaTrono() {
    let coste = { oro: 0, materiales: 0, comida: 0, felicidad: 0 };
    this.trono = new Edificio(this, config.vidaTrono, coste, new Vector2D(config.sizeCasilla * 2, config.sizeCasilla * 3), 2, 2, 'trono');
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

  reintentarJuego(reintentar){
    reintentar.on('pointerup', pointer => {
      this.scene.start('game');
      this.audio.musicCombate.pause(this.musicConfig);
  })
  }

  salirJuego(salir){
    salir.on('pointerup', pointer => {
      this.scene.start('escenaInicio');
      this.audio.musicCombate.pause(this.musicConfig);
  })
  }

  changeColorBoton(boton){
    boton.on('pointerover', pointer => {
      boton.setScale(boton.scaleX * 1.5, boton.scaleY * 1.5);
    })

    boton.on('pointerout', pointer => {
        boton.setScale(boton.scaleX / 1.5, boton.scaleY / 1.5);
    })

}
}
