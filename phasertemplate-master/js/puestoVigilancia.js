import EdificioDefensivo from "./edificioDefensivo.js";
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";
import * as config from "./config.js"

export default class PuestoVigilancia extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);

        this.enemy = null;
        this.game = scene;
        this.aldeanosAsignables = false;
        this.rango = rango;
        this.rangoSprite = null;
        this.direction = this.game.acciones.direccion;
    }
    setMenu() {
        this.creaBarraVida();
        this.initFlechas();
        this.asignaInput();
    }
    initRangoSprite(dir) {
        
        let pos = new Vector2D(this.posicion.x + this.ancho * config.sizeCasilla / 2, this.posicion.y + config.sizeCasilla * this.alto / 2);
        let sprite = new Phaser.GameObjects.Sprite(this.game, pos.x + 3, pos.y, 'rangoCono');
        sprite.setDepth(config.rangosVisionDepth+1);
        this.game.add.existing(sprite);
        sprite.setScale(2, 2);
        sprite.setOrigin(0.5, 1);
        sprite.alpha = 0.25;

        if (dir === 'sur') {
            this.dir = false;
            sprite.setRotation(Phaser.Math.DegToRad(180));
            sprite.y += config.sizeCasilla / 2;
            this.body.setSize(sprite.width, sprite.height);
            this.body.setOffset(-config.sizeCasilla / 2, config.sizeCasilla);
        }
        else if (dir === 'este') {
            this.dir = true;
            sprite.setRotation(Phaser.Math.DegToRad(90));
            this.body.setSize(sprite.height, sprite.width);
            this.body.setOffset(config.sizeCasilla / 4 + 1, 0);
        }
        else if (dir === 'oeste') {
            sprite.setRotation(Phaser.Math.DegToRad(-90));
            this.body.setSize(sprite.height, sprite.width);
            this.body.setOffset(-config.sizeCasilla * 2.25 - 1, 0);
        }
        else {
            sprite.y -= config.sizeCasilla / 2;
            this.body.setSize(sprite.width, sprite.height);
            this.body.setOffset(-config.sizeCasilla / 2, -2 * config.sizeCasilla);
        }
        this.rangoSprite = sprite;
    }
    actualizaRangoSprite(){
        if(this.direction === this.dir) {
            this.rangoSprite.setTexture('rangoConoRojo');
            this.rangoSprite.alpha = 0.8;
        }
    }
    reseteaRangoSprite(){
        this.rangoSprite.setTexture('rangoCono');
        this.rangoSprite.alpha = 0.25;
    }

    initFlechas() {
        this.flechas = []; //0:Norte 1:Sur 2:Este 3:Oeste
        let posicionFlecha = new Vector2D(this.posicion.x + this.ancho * config.sizeCasilla / 2, this.posicion.y + config.sizeCasilla / 2);
        this.flechas[0] = functions.creaSprite(posicionFlecha.x, posicionFlecha.y - 5, 'flechaIn', this.game, config.hudDepth);
        this.flechas[0].setOrigin(0.5, 0); this.flechas[0].setScale(0.4, 0.4); this.flechas[0].setRotation(Phaser.Math.DegToRad(180));
        this.flechas[1] = functions.creaSprite(posicionFlecha.x, posicionFlecha.y + 5, 'flechaIn', this.game, config.hudDepth);
        this.flechas[1].setOrigin(0.5, 0); this.flechas[1].setScale(0.4, 0.4);
        this.flechas[2] = functions.creaSprite(posicionFlecha.x - 5, posicionFlecha.y, 'flechaIn', this.game, config.hudDepth);
        this.flechas[2].setOrigin(0.5, 0); this.flechas[2].setScale(0.4, 0.4); this.flechas[2].setRotation(Phaser.Math.DegToRad(90));
        this.flechas[3] = functions.creaSprite(posicionFlecha.x + 5, posicionFlecha.y, 'flechaIn', this.game, config.hudDepth);
        this.flechas[3].setOrigin(0.5, 0); this.flechas[3].setScale(0.4, 0.4); this.flechas[3].setRotation(Phaser.Math.DegToRad(-90));

    }
    destroyFlechas() {
        this.flechas[0].destroy();
        this.flechas[1].destroy();
        this.flechas[2].destroy();
        this.flechas[3].destroy();
    }
    asignaInput() {
        this.flechas[0].on('pointerup', pointer => {
            this.initRangoSprite('norte');
            this.destroyFlechas();
        })

        this.flechas[1].on('pointerup', pointer => {
            this.initRangoSprite('sur');
            this.destroyFlechas();
        })

        this.flechas[2].on('pointerup', pointer => {
            this.initRangoSprite('oeste');
            this.destroyFlechas();
        })

        this.flechas[3].on('pointerup', pointer => {
            this.initRangoSprite('este');
            this.destroyFlechas();
        })

    }
    destruir() {
        super.destruir();
        this.destroyFlechas();
        if (this.rangoSprite !== null) this.rangoSprite.destroy();
    }
}