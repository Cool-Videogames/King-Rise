export default class EdificioSocial extends Edificio{
    constructor(scene,vida,coste,posicion,mapa,recursos){
    super(scene,vida,coste,posicion,mapa);
    this.recursos = recursos;
    }

    Generar(){
        //game.recursos +=recursos;
    }

    AsignarAldeanos(aldeanos){
        this.numAldeanos++;
    }
}