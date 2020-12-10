export default class Persona extends Phaser.GameObjects.Sprite{
    constructor(scene,pos,vida, velocidad, fuerza,tipo){
        super(scene,pos.x,pos.y,tipo);
        this.vida = vida;
        this.velocidad= velocidad;
        this.fuerza = fuerza;
    }

    attacak(objetivo, dmg){
        objetivo.vida -= dmg;
    }
}
