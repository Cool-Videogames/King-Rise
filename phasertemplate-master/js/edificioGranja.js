import EdificioRecursos from "./edificioRecursos.js";

export default class EdificioGranja extends EdificioRecursos{
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key){
        super(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key);
        this.game = scene;
        this.tipoAldeano = scene.ganaderos;
        this.posMarcoX = 6;
    }
    generar(){
        super.generar();
        this.game.recursos.comida += this.cantidad;
    }
}