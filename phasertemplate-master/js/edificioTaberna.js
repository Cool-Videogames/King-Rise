import EdificioSocial from "./edificioSocial.js";

export default class EdificioTaberna extends EdificioSocial{
    constructor(scene, vida, coste, pos, ancho, alto, felicidad, aldeanosMax){
        super(scene, vida, coste, pos, ancho, alto, felicidad, aldeanosMax, 'taberna');
        this.tipoAldeano = scene.aldeanosBasicos;
        this.posMarcoX = 5;
    }
    generar(){
        super.generar();
        this.game.recursos.felicidad += this.cantidad;
    }
}