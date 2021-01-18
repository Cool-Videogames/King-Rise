import * as config from "./config.js";

export default class Exploracion {
    constructor(scene) {
        this.game = scene;
    }

    explorar(aldeanos, exploradores) {   //numero de aldeanos y numero de exploradores
        let probabilidadExito = config.probabilidadExitoBase + aldeanos * config.probabilidadExitoPorExploradorAdicional
            + (exploradores - 1) * config.probabilidadExitoPorExploradorAdicional;
        let resultado = Math.random();
        let esVictoria = false;
        let recursosObtenidos = null;
        let supervivientes = null;
        if (resultado < probabilidadExito) {
            recursosObtenidos = this.recursosVictoria();
            esVictoria = true;
            supervivientes = {
                aldeanosVivos: aldeanos,
                exploradoresVivos: exploradores
            }
        } else {
            recursosObtenidos = this.recursosDerrota();
            supervivientes = this.metodoQueMasacraCruelmenteAldeanosEnElCasoDeQueSeTrateDeUnaDerrota(aldeanos, exploradores);
        }

        let duracionExploracion = Math.max(config.duracionMinima,Math.floor(Math.random() * config.duracionMaxima));

        return {
            victoria: esVictoria,
            recursos: recursosObtenidos,
            aldeanosResultantes: supervivientes,
            duracion: duracionExploracion
        }
    }

    recursosVictoria(numAldeanos) {
        let oro = Math.floor(this.game.acciones.numeroAtaque * config.maximoRecursosPorRonda.oro * Math.random()) * numAldeanos;
        let materiales = Math.floor(this.game.acciones.numeroAtaque * config.maximoRecursosPorRonda.oro * Math.random()) * numAldeanos;
        let comida = Math.floor(this.game.acciones.numeroAtaque * config.maximoRecursosPorRonda.oro * Math.random()) * numAldeanos;
        return { oro: oro, materiales: materiales, comida: comida };
    }

    recursosDerrota() {
        let oro = Math.max(0, Math.floor(-30 + Math.random() * 50));
        let materiales = Math.max(0, Math.floor(-30 + Math.random() * 50));
        let comida = Math.max(0, Math.floor(-30 + Math.random() * 50));

        return { oro: oro, materiales: materiales, comida: comida };
    }

    metodoQueMasacraCruelmenteAldeanosEnElCasoDeQueSeTrateDeUnaDerrota(aldeanosDisponiblesQueSePuedenMasacrar, exploradoresDisponiblesQueSePuedenMasacrar) {
        let aldeanosMuertos = Math.floor(Math.random() * aldeanosDisponiblesQueSePuedenMasacrar);
        let exploradoresMuertos = Math.floor(Math.random() * exploradoresDisponiblesQueSePuedenMasacrar);

        return {
            aldeanosVivos: aldeanosDisponiblesQueSePuedenMasacrar - aldeanosMuertos,
            exploradoresVivos: exploradoresDisponiblesQueSePuedenMasacrar - exploradoresMuertos
        }
    }



}