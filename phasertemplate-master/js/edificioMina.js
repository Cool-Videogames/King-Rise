import EdificioRecursos from "./edificioRecursos.js";

export default class EdificioMina extends EdificioRecursos{
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key){
        super(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key);
        this.game = scene;
        this.tipoAldeano = scene.mineros;
    }
    generar(){
        super.generar();
        this.game.recursos.oro += this.cantidad;
    }
}