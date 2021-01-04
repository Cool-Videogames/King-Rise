import * as config from "./config.js";
import * as functions from "./functions.js";
import Vector2D from "./vector2D.js";

export default class Interfaz {
  constructor(scene) {
    this.game = scene;

    //Arrays y enums con la informacion
    this.names = {
      ajustes: 0, desplegable: 1, hudGeneral: 2, infoAldeanos: 3, construir: 4, menuDesp: 5, info: 6, flechaAb: 7,
      botonConstruir: 8, flechaAr: 9, aldeanoB: 10, minero: 11, ganadero: 12, cantero: 13, explorador: 14, chozaMaestra: 15, mina: 16, granja: 17,
      cantera: 18, trampaSuelo: 19, trampaOso: 20, puestoVigilancia: 21, bunker: 22, muralla: 23, catedral: 24, torreArqueros: 25, caballoTroya: 26
    };
    this.tnames = {
      oro: 0, comida: 1, materiales: 2, felicidad: 3, proxAtaque: 4, aldeanoBText: 5, mineroText: 6, ganaderoText: 7,
      canteroText: 8, exploradorText: 9
    };
    this.inDesp = 3; this.inIA = 10; this.inAT = 5; this.inEd = 15; this.indiceEdificios = this.inEd;

    this.sprites = new Array(config.hudSprites);
    this.edificiosConstruibles = new Array(config.edificiosConstruibles);

    this.texts = new Array(config.nuTexts);
    this.nombres = new Array(config.hudSprites);
    this.posiciones = new Array(config.hudSprites);

    this.creaInterfaz();
  }

  creaInterfaz() {
    this.intiNames();

    for (let i = 0; i < config.hudSprites; i++) {
      this.sprites[i] = functions.creaSprite(0, 0, this.nombres[i], this.game, config.hudDepth + 1);
      this.sprites[i].setScale(this.sprites[i].scaleX / config.hudScale, this.sprites[i].scaleY / config.hudScale);
      this.sprites[i].setOrigin(0.5, 0.5); this.sprites[i].setScrollFactor(0);
    }
    this.setPos(); this.creaTexts(); this.setTextsPos();
    this.visibilidad();
    this.inputs();
  }

  intiNames() {
    this.nombres[this.names.ajustes] = 'ajustes'; this.nombres[this.names.desplegable] = 'desplegable';
    this.nombres[this.names.hudGeneral] = 'hud'; this.nombres[this.names.infoAldeanos] = 'infoAldeanos';
    this.nombres[this.names.construir] = 'construir'; this.nombres[this.names.menuDesp] = 'menuDesplegable';
    this.nombres[this.names.info] = 'info'; this.nombres[this.names.flechaAb] = 'flechaIn';
    this.nombres[this.names.botonConstruir] = 'botonConstruir'; this.nombres[this.names.flechaAr] = 'flechaIn';
    this.nombres[this.names.aldeanoB] = 'aldeano'; this.nombres[this.names.minero] = 'minero';
    this.nombres[this.names.ganadero] = 'ganadero'; this.nombres[this.names.cantero] = 'aldeano';
    this.nombres[this.names.explorador] = 'aldeano'; this.nombres[this.names.chozaMaestra] = 'chozaMaestra';
    this.nombres[this.names.mina] = 'mina'; this.nombres[this.names.granja] = 'granja';
    this.nombres[this.names.cantera] = 'cantera'; this.nombres[this.names.trampaSuelo] = 'trampaSuelo';
    this.nombres[this.names.trampaOso] = 'trampaOsos'; this.nombres[this.names.puestoVigilancia] = 'puestoVigilancia';
    this.nombres[this.names.bunker] = 'bunker'; this.nombres[this.names.muralla] = 'muralla';
    this.nombres[this.names.catedral] = 'catedral'; this.nombres[this.names.torreArqueros] = 'torreArqueros';
    this.nombres[this.names.caballoTroya] = 'torreArqueros';
  }

  creaTexts() {
    let a = this.tnames;

    //Recursos y proximo ataque
    this.texts[a.oro] = functions.creaTexto(0, 0, this.game.recursos.oro, this.game);
    this.texts[a.comida] = functions.creaTexto(0, 0, this.game.recursos.comida, this.game);
    this.texts[a.materiales] = functions.creaTexto(0, 0, this.game.recursos.materiales, this.game);
    this.texts[a.felicidad] = functions.creaTexto(0, 0, this.game.recursos.felicidad, this.game);
    this.texts[a.proxAtaque] = functions.creaTexto(0, 0, this.game.acciones.numeroAccionesRestantes, this.game);

    //Info de aldeanos
    this.texts[a.aldeanoBText] = functions.creaTexto(0, 0, this.game.aldeanosBasicos.length, this.game);
    this.texts[a.mineroText] = functions.creaTexto(0, 0, this.game.mineros.length, this.game);
    this.texts[a.ganaderoText] = functions.creaTexto(0, 0, this.game.ganaderos.length, this.game);
    this.texts[a.canteroText] = functions.creaTexto(0, 0, this.game.canteros.length, this.game);
    this.texts[a.exploradorText] = functions.creaTexto(0, 0, this.game.exploradores.length, this.game);

    for (let i of this.texts) { i.setScrollFactor(0); i.setDepth(config.hudDepth + 1) };
    this.texts[a.proxAtaque].setFontSize(config.fontSize + 40);
  }

  setTextsPos() {
    let a = this.tnames; let nE = this.names; let pI = this.sprites[nE.hudGeneral];
    let xOS = 20; let yOS = 10;

    //Recursos y proximo ataque
    this.sp(this.texts[a.proxAtaque], this.game.xSize / 2 + xOS, pI.y + yOS);
    this.sp(this.texts[a.oro], pI.x - pI.width / 4 + xOS, pI.y + pI.height / 5);
    this.sp(this.texts[a.comida], pI.x - pI.width / 6 + xOS, pI.y + pI.height / 5);
    this.sp(this.texts[a.materiales], pI.x - pI.width / 4 + xOS, pI.y - yOS);
    this.sp(this.texts[a.felicidad], pI.x - pI.width / 6 + xOS, pI.y - yOS);

    //Informacion aldeanos
    let b = this.sprites; let xoffSet = 35;
    this.sp(this.texts[a.aldeanoBText], b[nE.aldeanoB].x + xoffSet, b[nE.aldeanoB].y);
    this.sp(this.texts[a.mineroText], b[nE.minero].x + xoffSet, b[nE.minero].y);
    this.sp(this.texts[a.ganaderoText], b[nE.ganadero].x + xoffSet, b[nE.ganadero].y);
    this.sp(this.texts[a.canteroText], b[nE.cantero].x + xoffSet, b[nE.cantero].y);
    this.sp(this.texts[a.exploradorText], b[nE.explorador].x + xoffSet, b[nE.explorador].y);
  }

  setPos() {  //TODAS LAS POSICIONES DEPENDEN DE LA INTERFAZ
    let nE = this.names; let xoffSet = 172; let yOffSet = 20; let i = 1.77;

    this.sp(this.sprites[nE.hudGeneral], this.game.xSize / 2, this.game.ySize - this.sprites[nE.hudGeneral].height / 3);
    let pI = this.sprites[nE.hudGeneral];
    this.sp(this.sprites[nE.desplegable], pI.x + xoffSet, pI.y + yOffSet);
    this.sp(this.sprites[nE.ajustes], pI.x + xoffSet * i, pI.y + yOffSet);

    //Desplegable
    this.sp(this.sprites[nE.menuDesp], pI.x + xoffSet, pI.y - this.sprites[nE.menuDesp].height / 2 + yOffSet);
    this.sp(this.sprites[nE.info], pI.x + xoffSet, pI.y - pI.height / 2);
    this.sp(this.sprites[nE.botonConstruir], pI.x + xoffSet, pI.y - pI.height);
    this.sp(this.sprites[nE.infoAldeanos], pI.x + xoffSet * 2.4, pI.y - pI.height / 2.1);
    this.sp(this.sprites[nE.construir], pI.x + xoffSet * 1.93, pI.y - pI.height);
    this.sp(this.sprites[nE.flechaAb], pI.x + xoffSet * 1.93, pI.y - pI.height / 2 + yOffSet);
    this.sp(this.sprites[nE.flechaAr], pI.x + xoffSet * 1.93, pI.y - pI.height - this.sprites[nE.flechaAr].height - yOffSet);

    //Info de Aldeanos
    this.sp(this.sprites[nE.aldeanoB], pI.x + xoffSet * i - 25, pI.y - pI.height / 2);
    this.sp(this.sprites[nE.minero], pI.x + xoffSet * i + 40, pI.y - pI.height / 2);
    this.sp(this.sprites[nE.ganadero], pI.x + xoffSet * i + 115, pI.y - pI.height / 2);
    this.sp(this.sprites[nE.cantero], pI.x + xoffSet * i + 185, pI.y - pI.height / 2);
    this.sp(this.sprites[nE.explorador], pI.x + xoffSet * i + 255, pI.y - pI.height / 2);
    for (let i = this.inIA; i < this.inEd; ++i) this.sprites[i].setScale(1.3, 1.3);

    //Edificios construibles
    this.posEdiArriba = new Vector2D(pI.x + xoffSet * 1.93, pI.y - pI.height / 2 - 60);
    this.posEdiAbajo = new Vector2D(pI.x + xoffSet * 1.93, pI.y - pI.height - 55);
    this.escalaSprites();
  }
  sp(sprite, x, y) {
    sprite.setPosition(x, y);
  }
  escalaSprites() {
    let nE = this.names;
    this.sprites[nE.mina].setScale(0.5, 0.5);
    this.sprites[nE.trampaOso].setScale(2, 2);
    this.sprites[nE.granja].setScale(0.4, 0.4);
    this.sprites[nE.torreArqueros].setScale(1, 1);
    this.sprites[nE.puestoVigilancia].setScale(1.2, 1.1);
  }

  //INPUT SOBRE LOS SPRITES (MIRAR CALLBACKS)
  clickEnAjustes(ajustesSprite) {
    ajustesSprite.on('pointerdown', pointer => {
      this.game.ajustes.muestraSettings();
    })

  }
  clickEnDesplegable(desplegableSprite) {
    desplegableSprite.on('pointerdown', pointer => {
      if (!this.sprites[this.names.menuDesp].visible) {
        this.sprites[this.names.menuDesp].setVisible(true);
        this.sprites[this.names.info].setVisible(true);
        this.sprites[this.names.botonConstruir].setVisible(true);
      }
      else this.ocultaDesplegable();
    })
  }
  ocultaDesplegable() {
    for (let a = this.inDesp; a < config.hudSprites; a++) {
      this.sprites[a].setVisible(false);
      for (let i = this.inAT; i < config.numTexts; ++i) this.texts[i].setVisible(false);
    }
  }
  clickEnInfo(infoAl) {
    infoAl.on('pointerdown', pointer => {
      this.sprites[this.names.infoAldeanos].setVisible(!this.sprites[this.names.infoAldeanos].visible);
      for (let i = this.inIA; i < this.inEd; ++i) this.sprites[i].setVisible(!this.sprites[i].visible);
      for (let i = this.inAT; i < config.numTexts; ++i) this.texts[i].setVisible(!this.texts[i].visible);

      for (let i = this.inEd; i < config.hudSprites; ++i) this.sprites[i].setVisible(false);
      this.sprites[this.names.construir].setVisible(false);
      this.sprites[this.names.flechaAb].setVisible(false);
      this.sprites[this.names.flechaAr].setVisible(false);
    })
  }
  clickEnConstruccion(construccion) {
    construccion.on('pointerdown', pointer => {
      if (!this.sprites[this.names.construir].visible) {
        for (let i = this.inEd; i < config.hudSprites; i++) this.sprites[i].setVisible(false);
        this.sprites[this.names.chozaMaestra].setVisible(true);
        this.sprites[this.names.mina].setVisible(true);
        this.sp(this.sprites[this.names.chozaMaestra], this.posEdiAbajo.x, this.posEdiAbajo.y);
        this.sp(this.sprites[this.names.mina], this.posEdiArriba.x, this.posEdiArriba.y);
        this.indiceEdificios = this.inEd;

        this.sprites[this.names.construir].setVisible(!this.sprites[this.names.construir].visible);
        this.sprites[this.names.flechaAb].setVisible(!this.sprites[this.names.flechaAb].visible);
        this.sprites[this.names.flechaAr].setVisible(!this.sprites[this.names.flechaAr].visible);
        this.sprites[this.names.infoAldeanos].setVisible(false);
        for (let i = this.inIA; i < this.inEd; ++i) this.sprites[i].setVisible(false);
        for (let i = this.inAT; i < config.numTexts; ++i) this.texts[i].setVisible(false);
      }
      else {
        this.sprites[this.names.construir].setVisible(false);
        this.sprites[this.names.flechaAb].setVisible(false);
        this.sprites[this.names.flechaAr].setVisible(false);
        for (let i = this.inEd; i < config.hudSprites; i++) this.sprites[i].setVisible(false);
      }
    })
  }
  clickFlechaArriba(flechaAr) {
    flechaAr.on('pointerdown', pointer => {
      if (this.indiceEdificios > this.inEd) {
        for (let i = this.inEd; i < config.hudSprites; i++) this.sprites[i].setVisible(false);
        this.sprites[this.indiceEdificios - 1].setVisible(true);
        this.sprites[this.indiceEdificios].setVisible(true);
        this.sp(this.sprites[this.indiceEdificios - 1], this.posEdiAbajo.x, this.posEdiAbajo.y);
        this.sp(this.sprites[this.indiceEdificios], this.posEdiArriba.x, this.posEdiArriba.y);
        this.indiceEdificios--;
      }
    })
  }
  clickFlechaAbajo(flechaAb) {
    flechaAb.on('pointerdown', pointer => {
      if (this.indiceEdificios < config.hudSprites - 2) {
        for (let i = this.inEd; i < config.hudSprites; i++) this.sprites[i].setVisible(false);
        this.sprites[this.indiceEdificios + 1].setVisible(true);
        this.sprites[this.indiceEdificios + 2].setVisible(true);
        this.sp(this.sprites[this.indiceEdificios + 1], this.posEdiAbajo.x, this.posEdiAbajo.y);
        this.sp(this.sprites[this.indiceEdificios + 2], this.posEdiArriba.x, this.posEdiArriba.y);
        this.indiceEdificios++;
      }
    })
  }
  clickEnChoza(chozaMaestra) {
    chozaMaestra.on('pointerup', pointer => {
      if (this.game.numChozas < 1) {
        this.game.jug.inputConstruir('chozaMaestra', '', 3, 3);
        this.ocultaDesplegable();
        this.sprites[this.names.chozaMaestra].tint = 0x6C6A6B;
        this.game.numChozas++;
      }
    })
  }
  clickEnMina(mina) {
    mina.on('pointerup', pointer => {
      this.game.jug.inputConstruir('recursos', 'mina', config.tamMina.x, config.tamMina.y);
      this.ocultaDesplegable();
    })
  }
  clickEnTrampaOso(trampaOso) {
    trampaOso.on('pointerup', pointer => {
      this.game.jug.inputConstruir('defensivo', 'trampaOsos', 1, 1);
      this.ocultaDesplegable();
    })
  }
  clickEnTorreArqueros(torreArqueros) {
    torreArqueros.on('pointerup', pointer => {
      this.game.jug.inputConstruir('defensivo', 'torreArqueros', 2, 2);
      this.ocultaDesplegable();
    })
  }
  clickEnGranja(granja) {
    granja.on('pointerup', pointer => {
      this.game.jug.inputConstruir('recursos', 'granja', config.tamGranja.x, config.tamGranja.y);
      this.ocultaDesplegable();
    })
  }

  clickEnPuestoVigilancia(puestoVigilancia) {
    puestoVigilancia.on('pointerup', pointer => {
      this.game.jug.inputConstruir('defensivo', 'puestoVigilancia', 1, 2);
      this.ocultaDesplegable();
    })
  }

  clickEnCaballoTroya(caballoTroya) {
    caballoTroya.on('pointerup', pointer => {
      this.game.jug.inputConstruir('defensivo', 'caballoTroya', 2, 2);
      this.ocultaDesplegable();
    })
  }

  //ACTUALIZAR TEXTOS
  actualizaInterfaz() {
    //Recursos y proximo ataque
    this.texts[this.tnames.oro].text = this.game.recursos.oro;
    this.texts[this.tnames.comida].text = this.game.recursos.comida;
    this.texts[this.tnames.materiales].text = this.game.recursos.materiales;
    this.texts[this.tnames.felicidad].text = this.game.recursos.felicidad;
    this.texts[this.tnames.proxAtaque].text = this.game.acciones.numeroAccionesRestantes;

    //Informacion de aldeanos
    this.texts[this.tnames.aldeanoBText].text = this.game.aldeanosBasicos.length;
    this.texts[this.tnames.mineroText].text = this.game.mineros.length;
    this.texts[this.tnames.canteroText].text = this.game.canteros.length;
    this.texts[this.tnames.ganaderoText].text = this.game.ganaderos.length;
    this.texts[this.tnames.exploradorText].text = this.game.exploradores.length;
  }

  inputs() {
    //Inputs (implementar con callbacks)
    this.clickEnAjustes(this.sprites[this.names.ajustes]);
    this.clickEnDesplegable(this.sprites[this.names.desplegable]);
    this.clickEnInfo(this.sprites[this.names.info]);
    this.clickEnConstruccion(this.sprites[this.names.botonConstruir]);
    this.clickFlechaAbajo(this.sprites[this.names.flechaAb]);
    this.clickFlechaArriba(this.sprites[this.names.flechaAr]);
    this.clickEnChoza(this.sprites[this.names.chozaMaestra]);
    this.clickEnMina(this.sprites[this.names.mina]);
    this.clickEnTrampaOso(this.sprites[this.names.trampaOso]);
    this.clickEnTorreArqueros(this.sprites[this.names.torreArqueros]);
    this.clickEnGranja(this.sprites[this.names.granja]);
    this.clickEnPuestoVigilancia(this.sprites[this.names.puestoVigilancia]);
    this.clickEnCaballoTroya(this.sprites[this.names.caballoTroya]);
  }

  visibilidad() {
    //Sprites del desplgable comienzan no visibles
    for (let a = this.inDesp; a < config.hudSprites; a++) {
      this.sprites[a].setVisible(false);
    }
    for (let i = this.inAT; i < config.numTexts; ++i) this.texts[i].setVisible(false);
    //Flip de un sprite y depth del sprite de la interfaz para colocarse por debajo de los demas
    this.sprites[this.names.flechaAr].setFlip(false, true);
    this.sprites[this.names.hudGeneral].setDepth(config.hudDepth);
  }
}