import Persona from "./persona.js"

export default class Enemigo extends Persona{
    constructor(scene, pos, vida, fuerza, key){
        super(scene, pos, vida, fuerza, key);
        scene.add.existing(this);
        scene.physics.add.existing(this)
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
}