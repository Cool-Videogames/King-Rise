import EdificioDefensivo from "./edificioDefensivo.js";
import Vector2D from "./vector2D.js";
import * as functions from "./functions.js";
import * as config from "./config.js"

export default class PuestoVigilancia extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);

        this.enemy = null;
        this.game = scene;
        this.hasMenu = true;
        this.rango = rango;
        this.sprite = null;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    setMenu() {
        this.initFlechas();
        this.asignaInput();
    }

    initRangoSprite(dir) {
        let pos = new Vector2D(this.posicion.x + this.ancho * config.sizeCasilla / 2, this.posicion.y + config.sizeCasilla * this.alto / 2);
        this.sprite = functions.creaSprite(pos.x+3, pos.y, 'rangoCono', this.game, config.rangosVisionDepth);
        this.sprite.setScale(2, 2);
        this.sprite.setOrigin(0.5, 1);
        this.sprite.alpha = 0.25;

        if (dir === 'sur') { this.sprite.setRotation(Phaser.Math.DegToRad(180)); this.sprite.y += config.sizeCasilla / 2; }
        else if (dir === 'este') this.sprite.setRotation(Phaser.Math.DegToRad(-90));
        else if (dir === 'oeste') this.sprite.setRotation(Phaser.Math.DegToRad(90));
        else this.sprite.y -= config.sizeCasilla / 2;

        this.game.physics.add.overlap(this, this.game.jug, (turret, enemy) => {

        });
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
            this.initRangoSprite('este');
            this.destroyFlechas();
        })

        this.flechas[3].on('pointerup', pointer => {
            this.initRangoSprite('oeste');
            this.destroyFlechas();
        })

    }

    destruir(){
        super.destruir();
        this.destroyFlechas();
       if(this.sprite !== null) this.sprite.destroy();
    }

    recuperaAldeanos() {
        //CUANDO TERMINE EL ATAQUE SE LLAMARÁ A ESTE MÉTODO
        for (let i = 0; i < this.numAldeanos; i++)this.game.exploradores.push(this.game.creaAldeano());
        this.numAldeanos = 0;
    }
}