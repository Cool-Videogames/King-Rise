import Edificio from "./edificio.js";

export default class EdificioDefensivo extends Edificio {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, vida, coste, posicion, ancho, alto, key);
        this.rango = rango;
        this.aldeanosMax = aldeanosMax;
        this.numAldeanos = 0;
        this.especialidad = especialidad;
        this.variacionAldeanos = 0;

        scene.edificiosDefensivos.push(this);
    }
    atacar(objetivo, dmg) {
        objetivo.vida -= dmg;
    }
    asignarTropas(aldeanos) {
        this.numAldeanos+=aldeanos;
    }

    destruir(){
        super.destruir();
        let index = this.game.edificiosDefensivos.indexOf(this);
        this.game.edificiosDefensivos.splice(index, 1);
    }
}
