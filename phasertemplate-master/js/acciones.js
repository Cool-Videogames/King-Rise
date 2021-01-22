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

        this.numEnemigos = 10;
        this.rondas = config.oleadasParaMasEnemigos;
        this.rondasSuperadas = 0;
        this.edificioVigilancia = null
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
        this.game.oleadasEnemigos.createWave(this.numEnemigos, this.direccion);
        this.game.jug.irAlTrono();
        this.nuevaOleada();
        this.activarModoAtaque();
        this.game.interfaz.actualizaInterfaz();
        this.game.audio.musicCombate.play(this.musicConfig);
        this.game.audio.musicCombate.loop = true;
        this.game.audio.mainSound.pause(this.musicConfig);
    }

    nuevaOleada() {  //Cuando el ataque finalice y volvamos al modo aldea
        this.index = 0;
        this.rondas--;
        if (this.rondas <= 0) { this.numEnemigos++; this.rondas = config.oleadasParaMasEnemigos; }
        this.numeroAtaque++;
        this.accionesSiguienteAtaque = this.accionesSiguienteAtaque * config.relacionAcciones;
        this.accionesSiguienteAtaque = Math.max(this.accionesSiguienteAtaque, config.numeroAccionesMinimo);
        this.numeroAccionesRestantes = Math.floor(this.accionesSiguienteAtaque);
        this.rondasSuperadas = this.rondasSuperadas + 1;
        
        
    }

    nuevaRonda() {
        this.game.input.enabled = true;
        for (let i of this.game.edificios) { i.vida = i.vidaMaxima; i.actualizaBarraVida(); }
        this.ataqueEnCurso = false;
        if (this.edificioVigilancia !== null) this.edificioVigilancia.reseteaRangoSprite();
        this.game.interfaz.actualizaInterfaz();
        this.game.jug.bajarDelTrono();
        this.game.audio.musicCombate.pause(this.musicConfig);
        this.game.audio.mainSound.play(this.musicConfig);
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
        this.actualizaPuestoVigilancia();

        if (this.numeroAccionesRestantes <= 0) {
            this.ataque();
        }
    }
    actualizaPuestoVigilancia() {
        if (this.numeroAccionesRestantes <= 5) {
            this.edificioVigilancia = this.encuentraEdificio('puestoVigilancia');
            if (this.edificioVigilancia !== null) this.edificioVigilancia.actualizaRangoSprite();
        }
    }
    encuentraEdificio(key) {
        for (let i of this.game.edificios) {
            if (i.key === key) {
                return i;
            }
        }
        return null;
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