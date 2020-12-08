import * as config from "./config.js"

export default class Aldeano extends Persona{
    constructor(scene,vida, velocidad, fuerza,posicion){
        super(scene,vida, velocidad, fuerza);
        this.rendimiento = {
            rendGeneral: config.rendimientoGeneral,
            rendMateriales: 0,
            rendComida: 0,
            renOro: 0,
        }
        this.ocupado = false;
    }

    trabajar(){
    this.ocupado = true;    
    }

    paraTrabajar(){
        this.ocupado = false;
    }

    explorar(){

    }

    especializarse(espec, rendimiento){
        switch(espec){
            case "minero": {this.rendimientoMinero = rendimiento;this.rendimientoGeneral = 0;}
            break;
            case "cantero": {this.rendimientoCantero = rendimiento;this.rendimientoGeneral = 0;}
            break;
            case "ganadero": {this.rendimientoGanadero = rendimiento;this.rendimientoGeneral = 0;}
            break;
        }
    }
}
