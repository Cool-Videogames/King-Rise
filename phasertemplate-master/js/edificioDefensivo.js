import Edificio from "./edificio.js";

export default class EdificioDefensivo extends Edificio {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, vida, coste, posicion, ancho, alto, key);
        this.ancho = ancho; this.alto = alto;
        this.rango = rango;
        this.aldeanosMax = aldeanosMax;
        this.especialidad = especialidad;
        this.variacionAldeanos = 0;

    }

    stun(enemy, trampa) {
        enemy.stuneado = true;
        enemy.trampa = trampa;
        enemy.timer = 165;
        enemy.setTexture('francesStun');
    }
}
