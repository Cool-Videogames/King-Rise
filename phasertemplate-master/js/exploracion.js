import * as config from "./config.js";

export default class Exploracion {
    constructor(scene) {
        this.game = scene;


    }

    explorar(aldeanos) { //Array con los aledeanos recibidos
        let probabilidadExito = config.probabilidadExitoBase + (aldeanos.length - 1) * config.probabilidadExitoPorExploradorAdicional;
        let resultado = Math.random();
        if (resultado < probabilidadExito) {
            this.victoria();
        } else {
            this.derrota(aldeanos);
        }
    }

    victoria() {
        let recursosObtenidos =  Math.floor(this.game.acciones.numeroAtaque * config.maximoRecursosPorRonda * Math.random());
    }

    derrota(aldeanos) {

    }





}