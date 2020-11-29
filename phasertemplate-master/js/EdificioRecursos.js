export default class EdificioRecursos extends Edificio{
    constructor(scene,vida,coste,posicion,mapa,aldeanosMax,recursos){
    super(scene,vida,coste,posicion,mapa);
    this.rango = rango;
    this.aldeanosMax =aldeanosMax;
    this.numAldeanos= 0;
    this.recursos = recursos;
    }

    Generar(){
        //game.recursos +=recursos;
    }

    AsignarAldeanos(aldeanos){
        this.numAldeanos++;
    }
}