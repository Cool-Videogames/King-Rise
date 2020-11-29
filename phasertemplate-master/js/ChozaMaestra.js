import Game from "./game";

export default class ChozaMaestra extends Phaser.GameObjects{
    constructor(scene,vida,coste,posicion,mapa){
        super(scene,"edificio");
        this.vida= vida;
        this.coste= coste;
        this.posicion = posicion;
        this.mapa = mapa;
    }

    Especializar(aldeanos, espec){
        aldeanos.Especializarse(espec);
    }

    CrearAldeano(){
        Game.aldeanos++;
    }
}