import EdificioSocial from "./edificioSocial.js";

export default class EdificioTaberna extends EdificioSocial{
    constructor(scene, vida, coste, pos, ancho, alto, felicidad, aldeanosMax){
        super(scene, vida, coste, pos, ancho, alto, felicidad, aldeanosMax, 'taberna');

    }
}