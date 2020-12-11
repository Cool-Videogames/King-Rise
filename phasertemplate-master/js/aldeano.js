import * as config from "./config.js"
import Persona from "./persona.js"

export default class Aldeano extends Persona{
    constructor(scene,casilla,vida,velocidad, fuerza){
        let pos = {x: 0, y:0};
        super(scene,pos,vida, velocidad, fuerza, 'aldeano');
        pos = this.posicionCentrada(casilla);
        this.x = pos.x; 
        this.y = pos.y;

        this.rendimiento = {
            rendGeneral: config.rendimientoGeneral,
            rendMateriales: 0,
            rendComida: 0,
            renOro: 0,
        }
        this.casilla = casilla
        this.casilla.setOcupada(true);        

        this.game = scene;
        this.ocupado = false;
    }

    compruebaPosicion(){
        if(this.x > this.posDestino.x-1 && this.x < this.posDestino.x+1 &&this.y > this.posDestino.y-1 && this.y < this.posDestino.y+1){
            this.body.reset(this.posDestino.x,this.posDestino.y);
            this.isMoving=false;
  
            if(this.nodoDestino.siguiente !== null){
                this.movimientoPathFinding(this.nodoDestino.siguiente);
            }
        }
      }

    casillaRandom(){
        let nextCell;
        do{
            let columna = Math.floor(Math.random() * config.filas);
            let fila = Math.floor(Math.random() * config.columnas)
            nextCell = this.game.mapa.mapa[columna][fila];
        }
        while(nextCell.ocupada);
        this.nodoInicial = this.game.mapa.pathFinding(this.casilla, nextCell);
    }
    
    movimientoPathFinding(){
        if (this.nodoInicial != null) {
            this.nodoDestino = nodoInicial
            this.posDestino = this.posicionCentrada(this.nodoDestino.cell);
            this.casilla.setOcupada(false);
            this.casilla.sprite.clearTint();
    
            this.casilla = this.nodoDestino.cell;
            this.casilla.setOcupada(true);
    
            if(this.casilla.sprite.isTinted)this.casilla.sprite.tint = 0xEE4141;
    
            this.isMoving = true;
            this.game.physics.moveTo(this,this.posDestino.x,this.posDestino.y,this.speed);
        }
    }

    posicionCentrada(cell){ //Devuelve un vector2 con la posicion centrada del jugador
        return new Vector2D(cell.x + config.sizeCasilla / 2,
            cell.y + config.sizeCasilla/1.25);
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
