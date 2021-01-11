export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
    //Juego
    this.load.image('mar', "./phasertemplate-master/images/FondoYMapa/mar.png");
    this.load.image('mountain', "./phasertemplate-master/images/FondoYMapa/mountain.png");
    this.load.image('montañamarVer', "./phasertemplate-master/images/FondoYMapa/MontañaMarVer.png");
    this.load.image('montañamarHor', "./phasertemplate-master/images/FondoYMapa/MontañaMarHor.png");
    this.load.image('sabanaEsquina', "./phasertemplate-master/images/FondoYMapa/SabanaEsquina.png");
    this.load.image('sabanaBordeHor', "./phasertemplate-master/images/FondoYMapa/SabanaBordeHor.png");
    this.load.image('sabanaBordeVer', "./phasertemplate-master/images/FondoYMapa/SabanaBordeVer.png");
    this.load.image('esquinaMontaña', "./phasertemplate-master/images/FondoYMapa/EsquinaMontaña.png");
    this.load.image('montañaBordeHor', "./phasertemplate-master/images/FondoYMapa/MontañaBordeHor.png");
    this.load.image('montañaBordeVer', "./phasertemplate-master/images/FondoYMapa/MontañaBordeVer.png");
    this.load.image('sabanaInterseccionHor', "./phasertemplate-master/images/FondoYMapa/SabanaInterseccionHor.png");
    this.load.image('sabanaInterseccionVer', "./phasertemplate-master/images/FondoYMapa/SabanaInterseccionVer.png");
    this.load.image('sabana', "./phasertemplate-master/images/FondoYMapa/Sabana.png");
    this.load.image('trono', "./phasertemplate-master/images/Estructuras/Trono.png");
    this.load.image('obstaculo', "./phasertemplate-master/images/Estructuras/Obstaculo.png")

    //Jugador
    this.load.image('jugador', "./phasertemplate-master/images/Rey/Rey.png");
    this.load.spritesheet('jugadorFrente', "./phasertemplate-master/images/Rey/ReyFrente.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('jugadorLado', "./phasertemplate-master/images/Rey/ReyLado.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('jugadorEspaldas', "./phasertemplate-master/images/Rey/ReyEspaldas.png", { frameWidth: 32, frameHeight: 38 });

    //Aldeano
    this.load.image('aldeano', "./phasertemplate-master/images/Aldeano/Aldeano.png");
    this.load.spritesheet('aldeanoEspaldas', "./phasertemplate-master/images/Aldeano/AldeanoEspaldas.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('aldeanoLado', "./phasertemplate-master/images/Aldeano/AldeanoLado.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('aldeanoFrente', "./phasertemplate-master/images/Aldeano/AldeanoFrente.png", { frameWidth: 32, frameHeight: 38 });

    //Aldeana
    this.load.image('aldeana', "./phasertemplate-master/images/Aldeana/Aldeana.png");
    this.load.spritesheet('aldeanaEspaldas', "./phasertemplate-master/images/Aldeana/AldeanaEspaldas.png", { frameWidth: 32, frameHeight: 46 });
    this.load.spritesheet('aldeanaLado', "./phasertemplate-master/images/Aldeana/AldeanaLado.png", { frameWidth: 32, frameHeight: 46 });
    this.load.spritesheet('aldeanaFrente', "./phasertemplate-master/images/Aldeana/AldeanaFrente.png", { frameWidth: 32, frameHeight: 46 });

    //Minero
    this.load.image('minero', "./phasertemplate-master/images/Minero/minero.png");
    this.load.spritesheet('mineroFrente', "./phasertemplate-master/images/Minero/mineroFrente.png", { frameWidth: 32, frameHeight: 42 });
    this.load.spritesheet('mineroLado', "./phasertemplate-master/images/Minero/mineroLado.png", { frameWidth: 32, frameHeight: 42 });
    this.load.spritesheet('mineroEspaldas', "./phasertemplate-master/images/Minero/mineroEspaldas.png", { frameWidth: 32, frameHeight: 42 });

    //Granjero
    this.load.image('ganadero', "./phasertemplate-master/images/Granjero/granjero.png");
    this.load.spritesheet('ganaderoFrente', "./phasertemplate-master/images/Granjero/GranjeroFrente.png", { frameWidth: 32, frameHeight: 44 });
    this.load.spritesheet('ganaderoLado', "./phasertemplate-master/images/Granjero/GranjeroLado.png", { frameWidth: 32, frameHeight: 44 });
    this.load.spritesheet('ganaderoEspaldas', "./phasertemplate-master/images/Granjero/GranjeroEspaldas.png", { frameWidth: 32, frameHeight: 44 });

    //Cantero
    this.load.image('cantero', "./phasertemplate-master/images/Cantero/Cantero.png");
    this.load.spritesheet('canteroLado', "./phasertemplate-master/images/Cantero/CanteroLado.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('canteroFrente', "./phasertemplate-master/images/Cantero/CanteroFrente.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('canteroEspaldas', "./phasertemplate-master/images/Cantero/CanteroEspaldas.png", { frameWidth: 32, frameHeight: 38 });

    //Explorador
    this.load.image('explorador', "./phasertemplate-master/images/Explorador/explorador.png");
    this.load.spritesheet('exploradorLado', "./phasertemplate-master/images/Explorador/exploradorLado.png", { frameWidth: 32, frameHeight: 40 });
    this.load.spritesheet('exploradorFrente', "./phasertemplate-master/images/Explorador/exploradorFrente.png", { frameWidth: 32, frameHeight: 40 });
    this.load.spritesheet('exploradorEspaldas', "./phasertemplate-master/images/Explorador/exploradorEspaldas.png", { frameWidth: 32, frameHeight: 40 });

    //Frances
    this.load.image('frances', "./phasertemplate-master/images/Franceses/frances.png");
    this.load.spritesheet('francesFrente', "./phasertemplate-master/images/Franceses/FrancesFrente.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('francesLado', "./phasertemplate-master/images/Franceses/FrancesLado.png", { frameWidth: 32, frameHeight: 38 });
    this.load.spritesheet('francesEspaldas', "./phasertemplate-master/images/Franceses/FrancesEspaldas.png", { frameWidth: 32, frameHeight: 38 });
    this.load.image('marcadorFrances', "./phasertemplate-master/images/Estructuras/MarcadorFrances.png")

    //Edificios defensivos
    this.load.image('trampaOsos', "./phasertemplate-master/images/Estructuras/TrampaOsos/TrampaOsos.png");
    this.load.image('arrow', "./phasertemplate-master/images/Estructuras/arrow.png");
    this.load.image('torreArqueros', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/TorreArqueros.png");
    this.load.image('rangoCirculo', "./phasertemplate-master/images/Estructuras/RangoCirculo.png");
    this.load.image('rangoCono', "./phasertemplate-master/images/Estructuras/RangoCono.png")

    //Interfaz
    this.load.image('ajustes', "./phasertemplate-master/images/Interfaz/RuedaAjustes.png");
    this.load.image('hud', "./phasertemplate-master/images/Interfaz/HUDGeneral.png");
    this.load.image('desplegable', "./phasertemplate-master/images/Interfaz/desplegable.png");
    this.load.image('infoAldeanos', "./phasertemplate-master/images/Interfaz/InfoAldeanos.png");
    this.load.image('construir', "./phasertemplate-master/images/Interfaz/Construir.png");
    this.load.image('menuDesplegable', "./phasertemplate-master/images/Interfaz/MenuDesplegable.png");
    this.load.image('info', "./phasertemplate-master/images/Interfaz/Info.png")
    this.load.image('botonConstruir', "./phasertemplate-master/images/Interfaz/BotonConstruir.png");
    this.load.image('flechaIn', "./phasertemplate-master/images/Interfaz/Flecha.png");
    this.load.image('mina', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/Mina.png");
    this.load.image('granja', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/granja.png");
    this.load.image('cantera', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/cantera.png");
    this.load.image('trampaSuelo', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/trampaSuelo.png");
    this.load.image('trampaOsos', "./phasertemplate-master/images/Estructuras/TrampaOsos/TrampaOsos.png");
    this.load.image('puestoVigilancia', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/puestoVigilancia.png");
    this.load.image('bunker', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/bunker.png");
    this.load.image('muralla', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/muralla.png");
    this.load.image('catedral', "./phasertemplate-master/images/Estructuras/EdificiosConstruibles/catedral.png");

    //Menus
    this.load.image('done', "./phasertemplate-master/images/Interfaz/Done.png");
    this.load.image('mas', "./phasertemplate-master/images/Interfaz/Mas.png");
    this.load.image('menos', "./phasertemplate-master/images/Interfaz/Menos.png");
    this.load.image('moneda', "./phasertemplate-master/images/Interfaz/MonedaOro.png");
    this.load.image('asignar', "./phasertemplate-master/images/Estructuras/AsignarAldeanos.png");
    this.load.image('eliminar', "./phasertemplate-master/images/Estructuras/EliminarObstaculo.png");
    this.load.image('x', "./phasertemplate-master/images/Estructuras/X.png");
    this.load.image('destruir', "./phasertemplate-master/images/Estructuras/Destruir.png");

    //Ajustes
    this.load.image('volveraljuego', "./phasertemplate-master/images/Settings/VOLVER.png");
    this.load.image('settingsBackground', "./phasertemplate-master/images/Settings/SettingsBackGround.png");
    this.load.image('volumen', "./phasertemplate-master/images/Settings/volumen.png");
    this.load.image('ajusteVolumen', "./phasertemplate-master/images/Settings/AjusteVolumen.png");
    this.load.image('jugar', "./phasertemplate-master/images/Interfaz/botonJugar.png")
    //Choza Maestra
    this.load.image('chozaMaestra', "./phasertemplate-master/images/Estructuras/ChozaMaestra/ChozaMaestra.png");
    this.load.image('marco', "./phasertemplate-master/images/Estructuras/ChozaMaestra/marco.png");
    this.load.image('granja', "./phasertemplate-master/images/Estructuras/Granja.png");

    //Edificios sociales
    this.load.image('taberna', "./phasertemplate-master/images/Estructuras/EdificiosFelicidad/Taberna.png");

    //Sonido
    this.load.audio('music', "./phasertemplate-master/sound/MainSound.wav");

    //Escenas
    this.load.image('fondoInicio', "./phasertemplate-master/images/background.png");
    this.load.image('logoJuego', "./phasertemplate-master/images/imagen logo.png");
  }

  create() {
    this.createAnimationsJugador();
    this.createAnimationsAldeano();
    this.createAnimationsAldeana();
    this.createAnimationsMinero();
    this.createAnimationsGanadero();
    this.createAnimationsCantero();
    this.createAnimationsExplorador();

    this.scene.start('escenaInicio');
    
  }

  //CREACION DE ANIMACIONES
  createAnimationsJugador() {
    this.game.anims.create({
        key: 'espaldas',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('jugadorEspaldas', { start: 0, end: 1 }),
    });
    this.game.anims.create({
        key: 'derecha',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('jugadorLado', { start: 0, end: 1 }),
    });
    this.game.anims.create({
        key: 'izquierda',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('jugadorLado', { start: 0, end: 1 }),
    });
    this.game.anims.create({
        key: 'frente',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('jugadorFrente', { start: 0, end: 1 }),
    });
}
  createAnimationsAldeano(){
    this.game.anims.create({
        key: 'espaldasAldeano',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanoEspaldas', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'derechaAldeano',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanoLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'izquierdaAldeano',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanoLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'frenteAldeano',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanoFrente', {start: 0, end: 1}),
    });
  }
  createAnimationsAldeana(){
    this.game.anims.create({
        key: 'espaldasAldeana',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanaEspaldas', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'derechaAldeana',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanaLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'izquierdaAldeana',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanaLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'frenteAldeana',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('aldeanaFrente', {start: 0, end: 1}),
    });
  }
  createAnimationsMinero(){
    this.game.anims.create({
        key: 'mineroEspaldas',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('mineroEspaldas', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'mineroDerecha',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('mineroLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'mineroIzquierda',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('mineroLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'mineroFrente',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('mineroFrente', {start: 0, end: 1}),
    });
  }
  createAnimationsGanadero(){
    this.game.anims.create({
        key: 'ganaderoEspaldas',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('ganaderoEspaldas', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'ganaderoDerecha',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('ganaderoLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'ganaderoIzquierda',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('ganaderoLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'ganaderoFrente',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('ganaderoFrente', {start: 0, end: 1}),
    });
  }
  createAnimationsCantero(){
    this.game.anims.create({
        key: 'espaldasCantero',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('canteroEspaldas', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'derechaCantero',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('canteroLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'izquierdaCantero',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('canteroLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'frenteCantero',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('canteroFrente', {start: 0, end: 1}),
    });
  }
  createAnimationsExplorador(){
    this.game.anims.create({
        key: 'espaldasExplorador',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('exploradorEspaldas', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'derechaExplorador',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('exploradorLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'izquierdaExplorador',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('exploradorLado', {start: 0, end: 1}),
    });
    this.game.anims.create({
        key: 'frenteExplorador',
        repeat: -1,
        frameRate: 4,
        frames: this.game.anims.generateFrameNames('exploradorFrente', {start: 0, end: 1}),
    });
  }
}