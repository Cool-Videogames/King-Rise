import EdificioDefensivo from "./edificioDefensivo.js";

export default class CaballoTroya extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        this.tipoAldeano = scene.exploradores;
        this.game = scene;
        this.posMarcoX = 3;
        this.setScale(2.2, 2.2);
        this.body.setSize(this.width * 1.35, this.height * 1.35, this.getCenter());
        this.collider = null;
        this.auxDestruye = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.auxDestruye) super.destruir();
    }

    destruir() {
        this.game.physics.add.overlap(this, this.game.oleadasEnemigos.currentWave, (trap, enemy) => {
            this.stun(enemy, this);
        });
        this.auxDestruye = true;
    }

    muestraOpciones() { //CAMBIAR PARA ADAPTARLO AL MENU DEL CABALLO DE TROYA (SI LO TIENE)
        return () => {
            this.marco.setVisible(!this.marco.visible);
            this.done.setVisible(!this.done.visible);
            this.mas.setVisible(!this.mas.visible);
            this.menos.setVisible(!this.menos.visible);
            this.texts[2].text = this.tipoAldeano.length;
            for (let i of this.texts) {
                i.setVisible(!i.visible);
            }
            this.marcoDestruir.setVisible(!this.marcoDestruir.visible);
        }
    }
}
