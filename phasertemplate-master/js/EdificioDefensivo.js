export default class EdificioDefensivo extends Edificio{
    constructor(scene,vida,coste,posicion,mapa,aldeanosMax,rango){
    super(scene,vida,coste,posicion,mapa);
    this.rango = rango;
    this.aldeanosMax =aldeanosMax;
    this.numAldeanos= 0;
    }

    Atacar(objetivo, dmg){
        objetivo.vida -= dmg;
    }

    AsignarTropas(aldeanos){
        this.numAldeanos++;
    }
}