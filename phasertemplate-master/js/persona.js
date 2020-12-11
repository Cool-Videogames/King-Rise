import * as config from "./config.js"

export default class Persona extends Phaser.GameObjects.Sprite{
    constructor(scene,pos,vida, velocidad, fuerza,key){
        super(scene,pos.x,pos.y,key);
        this.vida = vida;
        this.velocidad= velocidad;
        this.fuerza = fuerza;

        this.setOrigin(this.scaleX/2,this.scaleY);
        this.setScale(1*config.sizeCasilla/32,1*config.sizeCasilla/32);
        this.setDepth(config.playerDepth);
        scene.add.existing(this);
    }

    attacak(objetivo, dmg){
        objetivo.vida -= dmg;
    }
}
