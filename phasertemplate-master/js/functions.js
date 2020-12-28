import * as config from "./config.js"

export function creaSprite(x, y, key, scene, depth) {
    let sprite = scene.add.sprite (x, y, key);
    sprite.setOrigin(0, 0);
    sprite.setInteractive();
    sprite.setDepth(depth);
    scene.add.existing(sprite);
    return sprite;
}
export function creaTexto(x,y, texto, scene){
    let text = new Phaser.GameObjects.Text(scene,x,y,texto);
    text.setOrigin(0.5,0.5);
    text.setFont(config.font);
    text.setStroke(config.stroke, 5);
    text.setFill(config.fillColor);
    text.setFontSize(config.fontSize);
    text.setDepth(config.hudDepth);
    text.setVisible(true);

    scene.add.existing(text);

    return text;
}