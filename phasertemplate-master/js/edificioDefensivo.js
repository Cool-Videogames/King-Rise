import Edificio from "./edificio.js";

export default class EdificioDefensivo extends Edificio{
    constructor(scene,vida,coste,posicion,aldeanosMax,rango){
    super(scene,vida,coste,posicion,mapa);
    this.rango = rango;
    this.aldeanosMax =aldeanosMax;
    this.numAldeanos= 0;
    }

    atacar(objetivo, dmg){
        objetivo.vida -= dmg;
    }

    asignarTropas(aldeanos){
        this.numAldeanos++;
    }
}
