import * as functions from "./functions.js";
import * as config from "./config.js";

export default class Fondo{
    constructor(scene, mapa){
        this.game = scene;
        this.mapa = mapa;

        this.col = mapa.col*2; this.fil = mapa.fil*2;
        this.mapa = new Array(this.col);
        for (let i = 0; i < this.col; i++) {
            this.mapa[i] = new Array(this.fil);
        }
        this.construyeFondo();
    }
    construyeFondo(){
        let x = -(config.columnas/2); let y = -(config.filas/2);
        for (let c = 0; c < this.col; c++) {
            y = -(config.filas/2);
            for (let j = 0; j < this.fil; j++) {
                if(j < config.interseccionMontañaMar+this.fil/4  && c < config.interseccionMontañaMar+this.col/4){
                    this.mapa[c][j] = functions.creaSprite(x*config.sizeCasilla,y*config.sizeCasilla,'mar',this.game,-1);
                }
                else if(j === config.interseccionMontañaMar+this.fil/4 && c < this.col/2){
                    this.mapa[c][j] = functions.creaSprite(x*config.sizeCasilla,y*config.sizeCasilla,'montañamarVer',this.game,-1);
                }
                else if(c === config.interseccionMontañaMar+this.col/4 && j < this.fil/2){
                    this.mapa[c][j] = functions.creaSprite(x*config.sizeCasilla,y*config.sizeCasilla,'montañamarHor',this.game,-1);
                }
                else {
                    this.mapa[c][j] = functions.creaSprite(x*config.sizeCasilla,y*config.sizeCasilla,'mountain',this.game,-1);
                }
                this.mapa[c][j].setScale(config.sizeCasilla / 32, config.sizeCasilla / 32);
                y++;
            }
            x++;
        }
    }
}