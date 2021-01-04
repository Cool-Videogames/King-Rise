import Persona from "./persona.js"
import Vector2D from "./vector2D.js";

export default class Enemigo extends Persona {
    constructor(scene, pos, vida, fuerza, key) {
        super(scene, pos, vida, fuerza, key);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.destino = pos;
        this.game = scene;

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    objetivoMasCercano(defensivos) {
        let objectives;
        if (defensivos) {
            objectives = this.game.edificiosDefensivos;
        } else {
            objectives = this.game.edificios;
        }
        let index = -1;
        let value = Infinity;
        for (let i = 0; i < objectives.length; i++) {
            let distancia = this.distancia(objectives[i].posicion);
            if (distancia < value) {
                index = i;
                value = distancia;
            }
        }

        if (index >= 0) return objectives[index];

        if(defensivos) this.objetivoMasCercano(false);
        return null;
    }

    distancia(destino) {
        let x = this.x - destino.x;
        console.log(destino.x);
        let y = this.y - destino.y;
        let result = Math.sqrt(x * x + y * y);
        return result;
    }

    move() {
        if (this.destino != null)
            scene.physics.moveTo(this, this.destino.posicion.x, this.destino.posicion.y, 1);
    }
}