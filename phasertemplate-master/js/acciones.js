import * as config from "./config.js";


export default class Acciones{

    constructor(scene, accionesSiguienteAtaque){
        this.game = scene;

        this.index = 0;
        this.numeroAtaque = 0;

        this.accionesSiguienteAtaque = accionesSiguienteAtaque;
        this.numeroAccionesRestantes = accionesSiguienteAtaque;

        this.costeMovimiento = config.costeAcciones;
    }

    
    ataque(){
        //Se llamará a este método una vez empiece el ataque
        console.log("Ataque iniciado");
    }

    nuevaOleada(){  //Cuando el ataque finalice y volvamos al modo aldea
        this.index = 0;
        this.numeroAtaque++;
        this.accionesSiguienteAtaque = Math.floor(this.accionesSiguienteAtaque * config.relacionAcciones);
        this.accionesSiguienteAtaque = Math.min(this.accionesSiguienteAtaque, congif.numeroAccionesMinimo);
        this.numeroAccionesRestantes = this.accionesSiguienteAtaque;
    }


    actualizarIndice(aumento){
        this.index += aumento;
        this.numeroAccionesRestantes = this.accionesSiguienteAtaque - this.index;

        this.game.interfaz.actualizaInterfaz();

        if(this.numeroAccionesRestantes<= 0){
            this.ataque();
        }
    }

    movimiento(){
        this.actualizarIndice(this.costeMovimiento);
    }
}