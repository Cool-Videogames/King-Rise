import Persona from "./persona.js"
import Vector2D from "./vector2D.js";

export default class Enemigo extends Persona{
    constructor(scene, pos, vida, fuerza, key){
        super(scene, pos, vida, fuerza, key);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.destino = pos;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    

    move(destino){

    }
}