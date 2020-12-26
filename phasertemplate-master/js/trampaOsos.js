import EdificioDefensivo from "./edificioDefensivo.js";

export default class TrampaOsos extends EdificioDefensivo {
    constructor(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key) {
        super(scene, especialidad, vida, coste, posicion, ancho, alto, aldeanosMax, rango, key);
        scene.physics.add.overlap(this, /*enemy*/, (trap, enemy) => {
            enemy.destroy();
            trap.destroy();
        })
    }
}