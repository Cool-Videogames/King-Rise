import * as config from "./config.js"
import Persona from "./persona.js"

export default class Aldeano extends Persona{
    constructor(scene,pos,vida, velocidad, fuerza){
        super(scene,pos,vida, velocidad, fuerza, 'aldeano');
        this.rendimiento = {
            rendGeneral: config.rendimientoGeneral,
            rendMateriales: 0,
            rendComida: 0,
            renOro: 0,
        }
        this.ocupado = false;
    }

    move(){

    }

    work(){
    this.ocupado = true;    
    }

    stopWorking(){
        this.ocupado = false;
    }

    explore(){

    }

    especialice(espec, rendimiento){
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
