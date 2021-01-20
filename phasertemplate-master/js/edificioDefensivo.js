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


    stun(enemy) {
        this.collider = null;
        enemy.body.setVelocity(0);
        enemy.stuneado = true;
        this.enemyStunned = true;
        this.timer = 100;
        enemy.setTexture('francesStun');
    }
}
