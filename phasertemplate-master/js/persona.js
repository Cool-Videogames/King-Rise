import * as config from "./config.js"

export default class Persona extends Phaser.GameObjects.Sprite{
    constructor(scene,pos,vida, fuerza,key){
        super(scene,pos.x,pos.y,key);
        this.vida = vida;
        this.speed = config.playerSpeed;
        this.fuerza = fuerza;

        this.setOrigin(0.5,1);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.personasDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    attack(objetivo, dmg){
        objetivo.vida -= dmg;
    }
}
