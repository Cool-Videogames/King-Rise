import EdificioDefensivo from "./edificioDefensivo.js";

export default class Muro extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        scene.physics.add.collider(this, /*enemigos*/);
        this.body.setImmovable(true);
    }
}