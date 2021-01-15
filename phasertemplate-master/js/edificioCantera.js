import EdificioRecursos from "./edificioRecursos.js";

export default class EdificioCantera extends EdificioRecursos{
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key){
        super(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key);
        this.game = scene;
        this.tipoAldeano = scene.canteros;
        this.posicionMarcoAsignar = 2;
        this.posMarcoX = 2;
    }
    generar(){
        super.generar();
        this.game.recursos.materiales += this.cantidad;
    }
}