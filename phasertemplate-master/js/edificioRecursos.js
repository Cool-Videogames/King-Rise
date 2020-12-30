import Edificio from "./edificio.js";
import * as config from "./config.js"

export default class EdificioRecursos extends Edificio{
    constructor(scene, vida, coste, posicion, ancho, alto, aldeanosMax, key){
    super(scene, vida, coste, posicion, ancho, alto, key);

    this.aldeanosMax = aldeanosMax;
    this.numAldeanos = 0;
    this.rendimientoAldeanos = 0;
    this.cantidad = config.cantidadRecursosPorDefecto;
    this.game = scene;

    this.isBuilt = false;
    this.timer = 5000;
    }
    asignarAldeanos(aldeanos){
        this.numAldeanos++;
        let rend = this.rendimientoAldeanos;
        rend += aldeanos.rendimiento.rendGeneral;
    }
}
