export default class Persona extends Phaser.GameObjects{
    constructor(scene,vida, velocidad, fuerza){
        super(scene,"persona");
        this.vida = vida;
        this.velocidad= velocidad;
        this.fuerza = fuerza;
        
    }

    mover(){
        //No pongo nada porque dijimos que sería algo estético el que correteen por la aldea
    }

    atacar(objetivo, dmg){
        objetivo.vida -= dmg;
    }
}
