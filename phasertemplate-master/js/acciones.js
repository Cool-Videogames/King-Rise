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


    ataque() {
        //Se llamará a este método una vez empiece el ataque
        console.log("Ataque iniciado");
        this.ataqueEnCurso = true;
        this.game.oleadasEnemigos.createWave(1, this.direccion);

        this.nuevaOleada();
    }

    nuevaOleada() {  //Cuando el ataque finalice y volvamos al modo aldea

        this.index = 0;
        this.numeroAtaque++;
        this.accionesSiguienteAtaque = Math.floor(this.accionesSiguienteAtaque * config.relacionAcciones);
        this.accionesSiguienteAtaque = Math.min(this.accionesSiguienteAtaque, config.numeroAccionesMinimo);
        this.numeroAccionesRestantes = this.accionesSiguienteAtaque;

    }


    actualizarIndice(aumento) {
        if(this.ataqueEnCurso) return;

        this.nuevoAldeano++;
        if (this.nuevoAldeano >= config.nuevoAldeano) { this.game.aldeanosBasicos.push(this.game.creaAldeano()); this.nuevoAldeano = 0; }

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
}