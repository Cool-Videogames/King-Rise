import * as config from "./config.js"
import * as functions from "./functions.js";

export default class Edificio extends Phaser.GameObjects.Sprite {
    constructor(scene, vida, coste, posicion, ancho, alto, key) {
        let offSetX = config.sizeCasilla / 2;
        let offSetY = config.sizeCasilla / 1.25;

        super(scene, posicion.x + offSetX, posicion.y + offSetY, key);
        this.game = scene;
        this.vida = vida;

        this.costeEdificio = coste;

        this.posicion = posicion;
        this.destruible = true;
        this.key = key;
        this.hasMenu = true;

        this.ancho = ancho;
        this.alto = alto;
        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.abreMarcoDestruir = this.muestraOpcionesMarco();
        this.celdasAnteriores = [];
        this.inputEdificio(this);
        this.creaMarcoDestruir();
        scene.edificios.push(this);
    }

    estaEnRangoDeConstruccion() {
        let rango = config.rangoConstruccion * config.sizeCasilla;
        let pos = this.posicion;
        let jug = this.game.jug.casilla;
        if (pos.x > jug.x + rango + config.sizeCasilla || pos.x + this.ancho * config.sizeCasilla < jug.x - rango || pos.y > jug.y + rango + config.sizeCasilla
            || pos.y + this.alto * config.sizeCasilla < jug.y - rango) return false;
        else return true;
    }

    esPagable() {
        if (this.game.recursos.oro - this.costeEdificio.oro < 0 || this.game.recursos.comida - this.costeEdificio.comida < 0 || this.game.recursos.materiales - this.costeEdificio.materiales < 0
            || this.game.recursos.felicidad - this.costeEdificio.felicidad < 0) return false;
        else return true;
    }
    cobraCoste() {
        this.game.recursos.oro -= this.costeEdificio.oro;
        this.game.recursos.comida -= this.costeEdificio.comida;
        this.game.recursos.materiales -= this.costeEdificio.materiales;
        this.game.recursos.felicidad -= this.costeEdificio.felicidad;
    }

    devuelveCoste() {
        this.game.recursos.oro += (config.recuperacionRecursos/100)*this.costeEdificio.oro;
        this.game.recursos.comida += (config.recuperacionRecursos/100)*this.costeEdificio.comida;
        this.game.recursos.materiales += (config.recuperacionRecursos/100)*this.costeEdificio.materiales;
        this.game.recursos.felicidad += (config.recuperacionRecursos/100)*this.costeEdificio.felicidad;
    }
    destruir(){
        if(this.destruible){
            this.marcoDestruir.destroy();
            this.devuelveCoste();
            let celdas = this.celdas(this.posicion);
            functions.resetCells(celdas);
            this.destroy();
            this.game.interfaz.actualizaInterfaz();
        }
    }
    inputEdificio(edificio){
        edificio.on('pointerdown', pointer=>{
            if(!this.marcoDestruir.visible){
                this.game.cierraMarcoAnterior();
                this.game.cierraMarcoAnterior = this.abreMarcoDestruir;
            }
            else {
                this.game.cierraMarcoAnterior = () => { };
            }
            this.abreMarcoDestruir();
        })
    }
    muestraOpcionesMarco(){
        return () => {
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }
    inputMarco(marco){
        marco.on('pointerup', pointer=>{
            this.destruir();
        })
    }
    creaMarcoDestruir(){
        this.marcoDestruir = functions.creaSprite(this.posicion.x-70, this.posicion.y,'destruir',this.game,config.hudDepth);
        this.marcoDestruir.setVisible(false);
        this.marcoDestruir.setScale(2,2);
        this.inputMarco(this.marcoDestruir);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.game.jug.y > this.y && this.depth != config.personasDepth - 1)
            this.setDepth(config.personasDepth - 1);
        else if (this.game.jug.y < this.y && this.depth != config.personasDepth + 1) this.setDepth(config.personasDepth + 1);
    }

    pintaCeldas() {
        this.celdasAnteriores.forEach(elem => elem.sprite.tint = elem.tint);
        let celdas = this.celdas(this.game.casillaPuntero);
        this.celdasAnteriores = celdas;
        if (this.celdasOcupadas() || !this.esPagable() || !this.estaEnRangoDeConstruccion())
            celdas.forEach(elem => { elem.sprite.tint = 0xEE4141 });
        else celdas.forEach(elem => { elem.sprite.tint = 0x41EE7B });
    }
    celdas(pos) {
        let espacioEdificio = [];
        for (let i = 0; i < this.ancho; ++i) {
            for (let j = 0; j < this.alto; ++j) {
                let col = pos.x / config.sizeCasilla + i;
                let fil = pos.y / config.sizeCasilla + j;
                if (fil >= 0 && fil < config.filas && col >= 0 && col < config.columnas)
                    espacioEdificio.push(this.game.mapa.mapa[col][fil]);
            }
        }
        return espacioEdificio;
    }
    celdasOcupadas() {
        let celdas = this.celdas(this.game.casillaPuntero);
        let i = 0;
        let ocupada = false;
        if (celdas.length !== this.game.jug.edificio.ancho * this.game.jug.edificio.alto) return true;
        while (i < celdas.length && !ocupada) {
            if (celdas[i].ocupada === true) ocupada = true;
            else ++i;
        }
        return ocupada;
    }
    setPosition(pos) {
        this.posicion = pos;
        this.x = pos.x + this.ancho / 2 * config.sizeCasilla;
        this.y = pos.y + this.alto * config.sizeCasilla;
    }
}
