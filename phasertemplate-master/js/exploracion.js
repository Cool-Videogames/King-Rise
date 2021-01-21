import * as config from "./config.js";

export default class Exploracion {
    constructor(scene) {
        this.game = scene;
        this.flecha = this.creaFlecha();
        this.inputFlecha(this.flecha);
        this.resultado = null;

        this.aldeanos = 0;
        this.exploradores = 1;
    }

    creaFlecha() {
        let x = config.columnas * config.sizeCasilla;
        let y = config.filas / 2 * config.sizeCasilla;

        let flecha = this.game.add.sprite(x, y, 'flechaExploracion');
        flecha.setDepth(config.hudDepth);
        flecha.setScale(.2);
        flecha.setInteractive();
        return flecha;
    }

    inputFlecha(flecha) {
        flecha.on('pointerover', pointer => {
            flecha.tint = 0x777777;
        })

        flecha.on('pointerup', pointer => {
            if (this.game.exploradores.length <= 0) {
                console.log("No hay exploradores disponibles");
                return;
            }
            if (this.game.exploradores.length < this.exploradores ||
                this.game.aldeanosBasicos.length < this.aldeanos) {
                console.log("No tienes tantas cosas");
                return;
            }
            this.resultado = this.explorar(this.aldeanos, this.exploradores);

            if (this.resultado.victoria) {
                let recursos = this.game.recursos;
                recursos.oro += this.resultado.recursos.oro;
                recursos.comida += this.resultado.recursos.comida;
                recursos.materiales += this.resultado.recursos.materiales;
            }
            else this.game.exploradores[0].morir();

            // for(let i = 0; i < this.aldeanos; i++){
            //     let a = this.game.aldeanosBasicos.pop();
            //     a.destroy();
            // }
            // for(let i = 0; i < this.exploradores; i++){
            //     let a = this.game.exploradores.pop();
            //     a.destroy();
            // }
            this.game.interfaz.actualizaInterfaz();
        })

        flecha.on('pointerout', pointer => {
            flecha.tint = flecha.tint;
        })
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
        let duracionExploracion = Math.max(config.duracionMinima, Math.floor(Math.random() * config.duracionMaxima));

        return {
            victoria: esVictoria,
            recursos: recursosObtenidos,
            aldeanosResultantes: supervivientes,
            duracion: duracionExploracion
        }
    }

    recursosVictoria(numAldeanos) {
        let oro = Math.floor(Math.random() * 50);
        let materiales = Math.floor(Math.random() * 50);
        let comida = Math.floor(Math.random() * 50);
        return { oro: oro, materiales: materiales, comida: comida };
    }

    recursosDerrota() {
        let oro = Math.floor(Math.random() * 10);
        let materiales = Math.floor(Math.random() * 10);
        let comida = Math.floor(Math.random() * 5);
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