import * as config from "./config.js"
import * as functions from "./functions.js";

export default class Persona extends Phaser.GameObjects.Sprite{
    constructor(scene,pos,vida, fuerza,key){
        super(scene,pos.x,pos.y,key);
        this.game = scene;
        this.vidaMaxima = vida;
        this.vida = this.vidaMaxima;
        this.speed = config.playerSpeed;
        this.fuerza = fuerza;

        this.setOrigin(0.5,1);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.personasDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.creaBarraVida();
    }
    creaBarraVida() {
        this.barraVida = functions.creaSprite(this.x - this.width, this.y, 'barraVida', this.game, config.edificiosDepth + 1);
        this.barraVida.setPosition(this.barraVida.x, this.barraVida.y + this.barraVida.height / 2);
        this.barraVida.setDisplaySize(config.sizeCasilla, this.barraVida.height);
        this.barraVida.setOrigin(0, 0.5)
        this.barraATope = config.sizeCasilla;
        this.actualizaBarraVida();
    }
    actualizaBarraVida() {
        console.log(this.vida);
        let ancho = (this.vida * this.barraATope) / this.vidaMaxima;
        this.barraVida.setDisplaySize(ancho, this.barraVida.height);
    }
    preUpdate(){
        super.preUpdate();
        this.barraVida.x = this.x-this.barraVida.width/4;
        this.barraVida.y = this.y+this.barraVida.height/2;
    }

    attack(objetivo, dmg){
        objetivo.vida -= dmg;
    }
}
