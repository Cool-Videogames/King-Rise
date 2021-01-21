export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
        //Juego
        this.load.image('barraVida',"./phasertemplate-master/images/estructuras/barraVida.png");
        this.load.image('barraVidaNaranja',"./phasertemplate-master/images/estructuras/barraVidaNaranja.png");
        this.load.image('barraVidaRoja',"./phasertemplate-master/images/estructuras/barraVidaRoja.png");
        this.load.image('mar', "./phasertemplate-master/images/fondoYMapa/mar.png");
        this.load.image('mountain', "./phasertemplate-master/images/fondoYMapa/mountain.png");
        this.load.image('montaniamarVer', "./phasertemplate-master/images/fondoYMapa/montaniaMarVer.png");
        this.load.image('montaniamarHor', "./phasertemplate-master/images/fondoYMapa/montaniaMarHor.png");
        this.load.image('sabanaEsquina', "./phasertemplate-master/images/fondoYMapa/sabanaEsquina.png");
        this.load.image('sabanaBordeHor', "./phasertemplate-master/images/fondoYMapa/sabanaBordeHor.png");
        this.load.image('sabanaBordeVer', "./phasertemplate-master/images/fondoYMapa/sabanaBordeVer.png");
        this.load.image('esquinaMontania', "./phasertemplate-master/images/fondoYMapa/esquinaMontania.png");
        this.load.image('montaniaBordeHor', "./phasertemplate-master/images/fondoYMapa/montaniaBordeHor.png");
        this.load.image('montaniaBordeVer', "./phasertemplate-master/images/fondoYMapa/montaniaBordeVer.png");
        this.load.image('sabanaInterseccionHor', "./phasertemplate-master/images/fondoYMapa/sabanaInterseccionHor.png");
        this.load.image('sabanaInterseccionVer', "./phasertemplate-master/images/fondoYMapa/sabanaInterseccionVer.png");
        this.load.image('sabana', "./phasertemplate-master/images/fondoYMapa/sabana.png");
        this.load.image('trono', "./phasertemplate-master/images/estructuras/trono.png");
        this.load.image('obstaculo', "./phasertemplate-master/images/estructuras/obstaculo.png");
        this.load.image('flechaExploracion', "./phasertemplate-master/images/flecha.png");

        this.load.image('trono', "./phasertemplate-master/images/estructuras/trono.png");
        this.load.image('tronoRey', "./phasertemplate-master/images/estructuras/tronoRey.png");
        this.load.image('obstaculo', "./phasertemplate-master/images/estructuras/obstaculo.png");

        this.load.image('flechaExploracion', "./phasertemplate-master/images/flecha.png");

        //Jugador
        this.load.image('jugador', "./phasertemplate-master/images/rey/rey.png");
        this.load.spritesheet('jugadorFrente', "./phasertemplate-master/images/rey/reyFrente.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('jugadorLado', "./phasertemplate-master/images/rey/reyLado.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('jugadorEspaldas', "./phasertemplate-master/images/rey/reyEspaldas.png", { frameWidth: 32, frameHeight: 38 });
        this.load.image('rangoInteraccion', "./phasertemplate-master/images/rey/rangoInteraccion.png")

        //Aldeano
        this.load.image('aldeano', "./phasertemplate-master/images/aldeano/aldeano.png");
        this.load.spritesheet('aldeanoEspaldas', "./phasertemplate-master/images/aldeano/aldeanoEspaldas.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('aldeanoLado', "./phasertemplate-master/images/aldeano/aldeanoLado.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('aldeanoFrente', "./phasertemplate-master/images/aldeano/aldeanoFrente.png", { frameWidth: 32, frameHeight: 38 });

        //Aldeana
        this.load.image('aldeana', "./phasertemplate-master/images/aldeana/aldeana.png");
        this.load.spritesheet('aldeanaEspaldas', "./phasertemplate-master/images/aldeana/aldeanaEspaldas.png", { frameWidth: 32, frameHeight: 46 });
        this.load.spritesheet('aldeanaLado', "./phasertemplate-master/images/aldeana/aldeanaLado.png", { frameWidth: 32, frameHeight: 46 });
        this.load.spritesheet('aldeanaFrente', "./phasertemplate-master/images/aldeana/aldeanaFrente.png", { frameWidth: 32, frameHeight: 46 });

        //Minero
        this.load.image('minero', "./phasertemplate-master/images/minero/minero.png");
        this.load.spritesheet('mineroFrente', "./phasertemplate-master/images/minero/mineroFrente.png", { frameWidth: 32, frameHeight: 42 });
        this.load.spritesheet('mineroLado', "./phasertemplate-master/images/minero/mineroLado.png", { frameWidth: 32, frameHeight: 42 });
        this.load.spritesheet('mineroEspaldas', "./phasertemplate-master/images/minero/mineroEspaldas.png", { frameWidth: 32, frameHeight: 42 });

        //Granjero
        this.load.image('ganadero', "./phasertemplate-master/images/granjero/granjero.png");
        this.load.spritesheet('ganaderoFrente', "./phasertemplate-master/images/granjero/granjeroFrente.png", { frameWidth: 32, frameHeight: 44 });
        this.load.spritesheet('ganaderoLado', "./phasertemplate-master/images/granjero/granjeroLado.png", { frameWidth: 32, frameHeight: 44 });
        this.load.spritesheet('ganaderoEspaldas', "./phasertemplate-master/images/granjero/granjeroEspaldas.png", { frameWidth: 32, frameHeight: 44 });

        //Frances
        this.load.image('frances', "./phasertemplate-master/images/franceses/frances.png");
        this.load.spritesheet('francesFrente', "./phasertemplate-master/images/franceses/francesFrente.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('francesLado', "./phasertemplate-master/images/franceses/francesLado.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('francesEspaldas', "./phasertemplate-master/images/franceses/francesEspaldas.png", { frameWidth: 32, frameHeight: 38 });
        this.load.image('marcadorFrances', "./phasertemplate-master/images/estructuras/marcadorFrances.png");
        this.load.image('francesStun', "./phasertemplate-master/images/franceses/francesStun.png");
        //Cantero
        this.load.image('cantero', "./phasertemplate-master/images/cantero/cantero.png");
        this.load.spritesheet('canteroLado', "./phasertemplate-master/images/cantero/canteroLado.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('canteroFrente', "./phasertemplate-master/images/cantero/canteroFrente.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('canteroEspaldas', "./phasertemplate-master/images/cantero/canteroEspaldas.png", { frameWidth: 32, frameHeight: 38 });

        //Explorador
        this.load.image('explorador', "./phasertemplate-master/images/explorador/explorador.png");
        this.load.spritesheet('exploradorLado', "./phasertemplate-master/images/explorador/exploradorLado.png", { frameWidth: 32, frameHeight: 40 });
        this.load.spritesheet('exploradorFrente', "./phasertemplate-master/images/explorador/exploradorFrente.png", { frameWidth: 32, frameHeight: 40 });
        this.load.spritesheet('exploradorEspaldas', "./phasertemplate-master/images/explorador/exploradorEspaldas.png", { frameWidth: 32, frameHeight: 40 });

        //Frances
        this.load.image('frances', "./phasertemplate-master/images/franceses/frances.png");
        this.load.spritesheet('francesFrente', "./phasertemplate-master/images/franceses/francesFrente.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('francesLado', "./phasertemplate-master/images/franceses/francesLado.png", { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('francesEspaldas', "./phasertemplate-master/images/franceses/francesEspaldas.png", { frameWidth: 32, frameHeight: 38 });
        this.load.image('marcadorFrances', "./phasertemplate-master/images/estructuras/marcadorFrances.png")

        //Edificios defensivos
        this.load.image('trampaOsos', "./phasertemplate-master/images/estructuras/trampaOsos.png");
        this.load.image('arrow', "./phasertemplate-master/images/estructuras/arrow.png");
        this.load.image('torreArqueros', "./phasertemplate-master/images/estructuras/edificiosConstruibles/torreArqueros.png");
        this.load.image('rangoCirculo', "./phasertemplate-master/images/estructuras/rangoCirculo.png");
        this.load.image('rangoCono', "./phasertemplate-master/images/estructuras/rangoCono.png")

        //Interfaz
        this.load.image('ajustes', "./phasertemplate-master/images/interfaz/ruedaAjustes.png");
        this.load.image('hud', "./phasertemplate-master/images/interfaz/hudGeneral.png");
        this.load.image('desplegable', "./phasertemplate-master/images/interfaz/desplegable.png");
        this.load.image('infoAldeanos', "./phasertemplate-master/images/interfaz/infoAldeanos.png");
        this.load.image('construir', "./phasertemplate-master/images/interfaz/construir.png");
        this.load.image('menuDesplegable', "./phasertemplate-master/images/interfaz/menuDesplegable.png");
        this.load.image('info', "./phasertemplate-master/images/interfaz/info.png")
        this.load.image('botonConstruir', "./phasertemplate-master/images/interfaz/botonConstruir.png");
        this.load.image('flechaIn', "./phasertemplate-master/images/interfaz/flecha.png");
        this.load.image('mina', "./phasertemplate-master/images/estructuras/edificiosConstruibles/mina.png");
        this.load.image('granja', "./phasertemplate-master/images/estructuras/edificiosConstruibles/granja.png");
        this.load.image('cantera', "./phasertemplate-master/images/estructuras/edificiosConstruibles/cantera.png");
        this.load.image('trampaSuelo', "./phasertemplate-master/images/estructuras/edificiosConstruibles/trampaSuelo.png");
        this.load.image('trampaOsos', "./phasertemplate-master/images/estructuras/TrampaOsos/TrampaOsos.png");
        this.load.image('puestoVigilancia', "./phasertemplate-master/images/estructuras/edificiosConstruibles/puestoVigilancia.png");
        this.load.image('bunker', "./phasertemplate-master/images/estructuras/edificiosConstruibles/bunker.png");
        this.load.image('muralla', "./phasertemplate-master/images/estructuras/edificiosConstruibles/muralla.png");
        this.load.image('caballoTroya', "./phasertemplate-master/images/estructuras/edificiosConstruibles/caballoTroya.png");
        this.load.image('marcoCoste', "./phasertemplate-master/images/interfaz/marcoCoste.png");
        this.load.image('finTurno', "./phasertemplate-master/images/interfaz/finTurno.png")

        //Menus
        this.load.image('done', "./phasertemplate-master/images/interfaz/done.png");
        this.load.image('mas', "./phasertemplate-master/images/interfaz/mas.png");
        this.load.image('menos', "./phasertemplate-master/images/interfaz/menos.png");
        this.load.image('moneda', "./phasertemplate-master/images/interfaz/monedaOro.png");
        this.load.image('asignar', "./phasertemplate-master/images/estructuras/asignarAldeanos.png");
        this.load.image('eliminar', "./phasertemplate-master/images/estructuras/eliminarObstaculo.png");
        this.load.image('x', "./phasertemplate-master/images/estructuras/x.png");
        this.load.image('destruir', "./phasertemplate-master/images/estructuras/destruir.png");

        //Ajustes
        this.load.image('volveraljuego', "./phasertemplate-master/images/settings/volver.png");
        this.load.image('settingsBackground', "./phasertemplate-master/images/settings/settingsBackGround.png");
        this.load.image('volumen', "./phasertemplate-master/images/settings/volumen.png");
        this.load.image('ajusteVolumen', "./phasertemplate-master/images/settings/ajusteVolumen.png");
        this.load.image('jugar', "./phasertemplate-master/images/interfaz/botonJugar.png")
        //Choza Maestra
        this.load.image('chozaMaestra', "./phasertemplate-master/images/estructuras/chozaMaestra/chozaMaestra.png");
        this.load.image('marco', "./phasertemplate-master/images/estructuras/chozaMaestra/marco.png");
        this.load.image('marcoCrear', "./phasertemplate-master/images/estructuras/chozaMaestra/marcoCrear.png");
        this.load.image('masCrear', "./phasertemplate-master/images/estructuras/chozaMaestra/masCrear.png");

        //Edificios sociales
        this.load.image('taberna', "./phasertemplate-master/images/estructuras/edificiosConstruibles/taberna.png");

        //Sonido
        this.load.audio('music', "./phasertemplate-master/sound/mainSound.wav");
        this.load.audio('construccion', "phasertemplate-master/sound/sonidoConstruccion.mp3");
        this.load.audio('destruccion', "phasertemplate-master/sound/sonidoDestruccion.mp3");

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
    createAnimationsAldeano() {
        this.game.anims.create({
            key: 'espaldasAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'derechaAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'izquierdaAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'frenteAldeano',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanoFrente', { start: 0, end: 1 }),
        });
    }
    createAnimationsAldeana() {
        this.game.anims.create({
            key: 'espaldasAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'derechaAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'izquierdaAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'frenteAldeana',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('aldeanaFrente', { start: 0, end: 1 }),
        });
    }
    createAnimationsMinero() {
        this.game.anims.create({
            key: 'mineroEspaldas',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'mineroDerecha',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'mineroIzquierda',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'mineroFrente',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('mineroFrente', { start: 0, end: 1 }),
        });
    }
    createAnimationsGanadero() {
        this.game.anims.create({
            key: 'ganaderoEspaldas',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'ganaderoDerecha',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'ganaderoIzquierda',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'ganaderoFrente',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('ganaderoFrente', { start: 0, end: 1 }),
        });
    }
    createAnimationsCantero() {
        this.game.anims.create({
            key: 'espaldasCantero',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('canteroEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'derechaCantero',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('canteroLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'izquierdaCantero',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('canteroLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'frenteCantero',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('canteroFrente', { start: 0, end: 1 }),
        });
    }
    createAnimationsExplorador() {
        this.game.anims.create({
            key: 'espaldasExplorador',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('exploradorEspaldas', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'derechaExplorador',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('exploradorLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'izquierdaExplorador',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('exploradorLado', { start: 0, end: 1 }),
        });
        this.game.anims.create({
            key: 'frenteExplorador',
            repeat: -1,
            frameRate: 4,
            frames: this.game.anims.generateFrameNames('exploradorFrente', { start: 0, end: 1 }),
        });
    }
}