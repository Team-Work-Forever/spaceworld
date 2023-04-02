import { ItemType } from '../gameObjects/items/item-type';

export default class CrystalContainer extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, itemType: ItemType) {
        super(scene);

        this.setSize(116, 49);
        this.setPosition(x, y);

        const panel = scene.add.image(0, 0, 'overlap-item');

        const score = scene.add
            .text(0, 0, '10', {
                fontFamily: 'Days One',
                fontSize: '20px',
            })
            .setOrigin(0.85, 0.5);
        const icon = scene.add
            .sprite(0, 0, 'icons', itemType)
            .setOrigin(-1, 0.5);

        this.add(panel);
        this.add(score);
        this.add(icon);
    }
}
