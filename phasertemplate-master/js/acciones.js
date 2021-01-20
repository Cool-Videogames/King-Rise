import * as config from "./config.js";


export default class Acciones {

    constructor(scene, accionesSiguienteAtaque) {
        this.game = scene;

        this.index = 0;
        this.numeroAtaque = 0;

        this.accionesSiguienteAtaque = accionesSiguienteAtaque;
        this.numeroAccionesRestantes = accionesSiguienteAtaque;

        this.nuevoAldeano = 0;

        this.casillasParaTurno = config.numeroCasillasRecorridasParaConsumirUnaAccion;
        this.casillasAvanzadas = 0;


        this.direccion = Math.random() < 0.5;
        this.ataqueEnCurso = false;
    }

    finTurno() {
        while (this.numeroAccionesRestantes > 0 && !this.ataqueEnCurso) { this.actualizarIndice(1); this.casillasAvanzadas = 0; }
    }

    ataque() {
        //Se llamará a este método una vez empiece el ataque
        this.game.input.enabled = false;
        this.game.cierraMarcoAnterior();
        this.game.cierraMarcoAnterior = () => { };
        this.game.interfaz.ocultaDesplegable();
        this.ataqueEnCurso = true;
        this.game.oleadasEnemigos.createWave(10, this.direccion);
        this.game.jug.irAlTrono();
        this.nuevaOleada();
        this.activarModoAtaque();
    }

    nuevaOleada() {  //Cuando el ataque finalice y volvamos al modo aldea

        this.index = 0;
        this.numeroAtaque++;
        this.accionesSiguienteAtaque = Math.floor(this.accionesSiguienteAtaque * config.relacionAcciones);
        this.accionesSiguienteAtaque = Math.min(this.accionesSiguienteAtaque, config.numeroAccionesMinimo);
        this.numeroAccionesRestantes = this.accionesSiguienteAtaque;
    }

    nuevaRonda() {
        this.game.input.enabled = true;
        for (let i of this.game.edificios) i.vida = i.vidaMaxima;
        this.game.interfaz.actualizaInterfaz();
        this.ataqueEnCurso = false;
        this.game.jug.bajarDelTrono();
        this.activarModoAtaque(false);
    }

    actualizarIndice(aumento) {
        if (this.ataqueEnCurso) return;

        this.nuevoAldeano++;
        if (this.nuevoAldeano >= config.nuevoAldeano) { this.game.creaAldeanos(1, this.game.aldeanosBasicos); this.nuevoAldeano = 0; }
        this.generaRecursos++;

        for (let i of this.game.edificios) {
            if (i.recursos) {
                i.generaRecursos++;
                if (i.generaRecursos >= config.generaRecursos) { i.generar(); i.generaRecursos = 0; }
            }
        }

        this.index += aumento;
        this.numeroAccionesRestantes = this.accionesSiguienteAtaque - this.index;

        this.game.interfaz.actualizaInterfaz();

        if (this.numeroAccionesRestantes <= 0) {
            this.ataque();
        }
    }

    movimiento() {
        this.casillasAvanzadas++;
        if (this.casillasAvanzadas >= this.casillasParaTurno) {
            this.actualizarIndice(1);
            this.casillasAvanzadas = 0
        }
    }

    activarModoAtaque(bool = true) {
        for (let i of this.game.aldeanosBasicos) {
            i.activarModoAtaque(bool);
        }
        for (let i of this.game.canteros) {
            i.activarModoAtaque(bool);
        }
        for (let i of this.game.mineros) {
            i.activarModoAtaque(bool);
        }
        for (let i of this.game.exploradores) {
            i.activarModoAtaque(bool);
        }
        for (let i of this.game.ganaderos) {
            i.activarModoAtaque(bool);
        }
    }
}