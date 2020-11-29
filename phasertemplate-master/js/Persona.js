export default class Persona extends Phaser.GameObjects{
    constructor(scene,vida, velocidad, fuerza){
        super(scene,"persona");
        this.vida = vida;
        this.velocidad= velocidad;
        this.fuerza = fuerza;
        
    }

    Mover(){
        //No pongo nada porque dijimos que sería algo estético el que correteen por la aldea
    }

    Atacar(objetivo, dmg){
        objetivo.vida -= dmg;
    }
}