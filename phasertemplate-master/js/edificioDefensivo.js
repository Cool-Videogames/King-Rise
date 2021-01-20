import Edificio from "./edificio.js";

export default class EdificioDefensivo extends Edificio {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, vida, coste, posicion, ancho, alto, key);
        this.ancho = ancho; this.alto = alto;
        this.rango = rango;
        this.aldeanosMax = aldeanosMax;
        this.numAldeanos = 0;
        this.especialidad = especialidad;
        this.variacionAldeanos = 0;

    }
    atacar(objetivo, dmg) {
        objetivo.vida -= dmg;
        if (objetivo.vida <= 0) objetivo.morir();
    }


    stun(enemy, trampa) {
        enemy.stuneado = true;
        enemy.trampa = trampa;
        enemy.timer = 165;
        enemy.setTexture('francesStun');
    }
}
