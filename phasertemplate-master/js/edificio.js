import * as config from "./config.js"
import * as functions from "./functions.js";
import Vector2D from "./vector2D.js";

export default class Edificio extends Phaser.GameObjects.Sprite {
    constructor(scene, vida, coste, posicion, ancho, alto, key) {
        let offSetX = config.sizeCasilla / 2;
        let offSetY = config.sizeCasilla / 1.25;
        super(scene, posicion.x + offSetX, posicion.y + offSetY, key);

        this.x = posicion.x;
        this.y = posicion.y;
        this.game = scene;
        this.vida = vida;
        this.costeEdificio = coste;
        this.posicion = posicion;
        this.destruible = true;
        this.key = key;
        this.hasMenu = true;
        this.aldeanosAsignables = true;
        this.tipoAldeano = this.game.exploradores;

        this.ancho = ancho;
        this.alto = alto;
        this.setOrigin(this.scaleX / 2, this.scaleY);
        this.setScale(1 * config.sizeCasilla / 32, 1 * config.sizeCasilla / 32);
        this.setDepth(config.edificiosDepth);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.abreMarcos = this.muestraOpciones();
        this.celdasAnteriores = [];
        this.inputEdificio(this);
        this.creaMarcoDestruir();
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
        this.game.recursos.oro += (config.recuperacionRecursos / 100) * this.costeEdificio.oro;
        this.game.recursos.comida += (config.recuperacionRecursos / 100) * this.costeEdificio.comida;
        this.game.recursos.materiales += (config.recuperacionRecursos / 100) * this.costeEdificio.materiales;
        this.game.recursos.felicidad += (config.recuperacionRecursos / 100) * this.costeEdificio.felicidad;
    }
    destruir() {
        if (this.destruible) {
            this.marcoDestruir.destroy();
            this.devuelveCoste();
            let celdas = this.celdas(this.posicion);
            functions.resetCells(celdas);
            this.destroy();
            this.game.interfaz.actualizaInterfaz();

            if(this.aldeanosAsignables){
                this.marco.destroy();
                this.mas.destroy();
                this.menos.destroy();
                this.done.destroy();
                for (let i of this.texts) i.destroy();
                this.game.cierraMarcoAnterior = () => { };
            }
        }
    }
    inputEdificio(edificio) {
        edificio.on('pointerup', pointer => {
            if (!this.marcoDestruir.visible) {
                this.game.cierraMarcoAnterior();
                this.game.cierraMarcoAnterior = this.abreMarcos;
            }
            else {
                this.game.cierraMarcoAnterior = () => { };
            }
            this.abreMarcos();
        })
    }
    muestraOpciones() {
        return () => {
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }
    inputMarcoDestruir(marco) {
        marco.on('pointerup', pointer => {
            this.destruir();
        })
    }
    creaMarcoDestruir() {
        this.marcoDestruir = functions.creaSprite(this.posicion.x - 70, this.posicion.y, 'destruir', this.game, config.hudDepth);
        this.marcoDestruir.setVisible(false);
        this.marcoDestruir.setScale(2, 2);
        this.inputMarcoDestruir(this.marcoDestruir);
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

    recibirAtaque(dmg) {
        this.vida -= dmg;
        if (this.vida <= 0)
            this.destruir();
    }

    //MARCO PARA ASIGNAR ALDEANOS
    setMenu(){
        if(this.aldeanosAsignables){
            this.initMarco();
            this.createMasMenos();
            this.creaText();
            this.asignaInput();
        }
    }
    initMarco() {
        let posicionMarco = new Vector2D(this.posicion.x + config.sizeCasilla * 1.5, this.posicion.y + config.sizeCasilla / 2);
        this.marco = functions.creaSprite(posicionMarco.x, posicionMarco.y, 'asignar', this.game, config.hudDepth);
        this.marco.setVisible(false);

        this.done = functions.creaSprite(this.marco.x + (this.marco.width / 2), this.marco.y + this.marco.height + 7, 'done', this.game, config.hudDepth);
        this.done.setOrigin(0.5, 0.5); this.done.setScale(1.5, 1.5); this.done.setVisible(false);
    }
    createMasMenos() {
        this.mas = functions.creaSprite(0, 0, 'mas', this.game, config.hudDepth);
        this.mas.setVisible(false); this.mas.setScale(5, 5); this.mas.setOrigin(0.5, 0.5);
        this.menos = functions.creaSprite(0, 0, 'menos', this.game, config.hudDepth);
        this.menos.setVisible(false); this.menos.setScale(7, 7); this.menos.setOrigin(0.5, 0.5);

        let offSet = 0.15;
        this.mas.setPosition(this.marco.x + this.marco.width * (1 - offSet), this.marco.y + this.marco.height / 2 * (1 + offSet));
        this.menos.setPosition(this.marco.x + this.marco.width * offSet, this.marco.y + this.marco.height / 2 * (1 + offSet));
    }

    creaText(){ //CAMBIAR PARA ADAPTARLO AL MENU DEL CABALLO DE TROYA (SI LO TIENE)
        this.texts = [];
        this.texts[0] = functions.creaTexto(this.marco.x + this.marco.width * 0.5, this.marco.y + this.marco.height * 0.29, this.aldeanosMax, this.game);
        this.texts[1] = functions.creaTexto(this.marco.x + this.marco.width * 0.58, this.marco.y + this.marco.height * 0.57, this.variacionAldeanos, this.game);
        this.texts[2] = functions.creaTexto(this.marco.x + this.marco.width * 0.86, this.marco.y + this.marco.height * 0.84, this.tipoAldeano.length, this.game);
        for (let i of this.texts) {
            i.setDepth(config.hudDepth); i.setVisible(false);
            i.setFontSize(19);
            i.setStroke(config.stroke, 3);
        }
        this.texts[1].setFontSize(45);
    }
    asignaInput() {
        this.mas.on('pointerup', pointer => {
            if (this.variacionAldeanos + this.numAldeanos < this.aldeanosMax && this.variacionAldeanos + 1 <= this.tipoAldeano.length) {
                this.variacionAldeanos++;
                console.log(this.numAldeanos);
                this.texts[1].text = this.variacionAldeanos + this.numAldeanos;
                this.texts[2].text--;
            }
        })

        this.menos.on('pointerup', pointer => {
            if (this.variacionAldeanos + this.numAldeanos > 0) {
                this.variacionAldeanos--;
                console.log(this.numAldeanos);
                this.texts[1].text = this.variacionAldeanos + this.numAldeanos;
                this.texts[2].text++;
            }
        })

        this.done.on('pointerup', pointer => {
            if (this.variacionAldeanos < 0) {
                for (let i = 0; i < -this.variacionAldeanos; ++i) {
                    this.tipoAldeano.push(this.game.creaAldeano());
                    this.numAldeanos--;
                }
            }
            else if (this.variacionAldeanos > 0) {
                for (let i = 0; i < this.variacionAldeanos; ++i) {
                    this.tipoAldeano.pop().destroy();
                    this.numAldeanos++;
                }
            }
            this.variacionAldeanos = 0;
            this.game.cierraMarcoAnterior = () => { };
            this.abreMarcos();
            this.game.interfaz.actualizaInterfaz();
        })
    }
}
