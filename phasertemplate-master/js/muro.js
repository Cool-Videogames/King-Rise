import EdificioDefensivo from "./edificioDefensivo.js";

export default class Muro extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.body.setImmovable(true);
    }
}