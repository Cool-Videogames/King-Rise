import * as config from "./config.js"

export default class Edificio extends Phaser.GameObjects.Sprite {
    constructor(scene, vida, coste, posicion, ancho, alto, key) {
        let offSetX = config.sizeCasilla / 2;
        let offSetY = config.sizeCasilla / 1.25;

        super(scene, posicion.x + offSetX, posicion.y + offSetY, key);
        this.game = scene;
        this.vida = vida;
        this.coste = coste;
        this.posicion = posicion;
        this.destruible = true;
        this.key = key;

        this.ancho = ancho;
        this.alto = alto;
        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        scene.add.existing(this);
        this.celdasAnteriores = [];
    }

    preUpdate(t, dt) {
        if (this.game.jug.y > this.y && this.depth != config.personasDepth - 1)
            this.setDepth(config.personasDepth - 1);
        else if (this.game.jug.y < this.y && this.depth != config.personasDepth + 1) this.setDepth(config.personasDepth + 1);
        super.preUpdate(t, dt);
    }

    pintaCeldas() {
        this.celdasAnteriores.forEach(elem => elem.sprite.tint = elem.tint);
        let celdas = this.celdas();
        this.celdasAnteriores = celdas;
        if (this.celdasOcupadas())
            celdas.forEach(elem => { elem.sprite.tint = 0xEE4141 });
        else celdas.forEach(elem => { elem.sprite.tint = 0x41EE7B });
    }

    celdas() {
        let espacioEdificio = [];
        for (let i = 0; i < this.ancho; ++i) {
            for (let j = 0; j < this.alto; ++j) {
                let col = this.game.casillaPuntero.x / config.sizeCasilla + i;
                let fil = this.game.casillaPuntero.y / config.sizeCasilla + j;
                if (fil >= 0 && fil < config.filas && col >= 0 && col < config.columnas)
                    espacioEdificio.push(this.game.mapa.mapa[col][fil]);
            }
        }
        return espacioEdificio;
    }

    celdasOcupadas() {
        let celdas = this.celdas();
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
        this.x = pos.x + this.ancho / 2 * config.sizeCasilla;
        this.y = pos.y + this.alto * config.sizeCasilla;
    }

    construir() {
        //recursos del jugador -= coste;
        //asignar posicion
    }

    destruir() {
        if (this.destruible) {
            //recursos del jugador += coste * 0.75;
            this.mapa[this.posicion.y][this.posicion.x] = libre;
        }
    }
}
