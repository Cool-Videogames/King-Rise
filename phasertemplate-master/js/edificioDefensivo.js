import Edificio from "./edificio.js";

export default class EdificioDefensivo extends Edificio {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, vida, coste, posicion, ancho, alto, key);
        this.rango = rango;
        this.aldeanosMax = aldeanosMax;
        this.numAldeanos = 0;
        this.especialidad = especialidad;
        this.variacionAldeanos = 0;

    }
    atacar(objetivo, dmg) {
        objetivo.vida -= dmg;
        console.log(objetivo.vida);
        if(objetivo.vida <= 0)objetivo.destroy();
    }
    asignarTropas(aldeanos) {
        this.numAldeanos+=aldeanos;
    }

    destruir(){
        super.destruir();
    }
}
