export default class Aldeano extends Persona{
    constructor(scene,vida, velocidad, fuerza, rendimientoGeneral,posicion){
        super(scene,vida, velocidad, fuerza);
        this.rendimientoGeneral = rendimientoGeneral;
        this.rendimientoCantero = 0;
        this.rendimientoGanadero =0;
        this.rendimientoMinero = 0;
        this.ocupado = false;
    }

    Trabajar(){
    this.ocupado = true;    
    }

    ParaTrabajar(){
        this.ocupado = false;
    }

    Explorar(){

    }

    Especializarse(espec, rendimiento){
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