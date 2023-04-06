import { ItemType } from '../../gameObjects/items/item-type';

export default class CrystalContainer extends Phaser.GameObjects.Container {
    private _score: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, itemType: ItemType) {
        super(scene);

        this.setSize(116, 49);
        this.setPosition(x, y);

        const panel = scene.add.image(0, 0, 'overlap-item');

        this._score = scene.add
            .text(0, 0, '0', {
                fontFamily: 'Days One',
                fontSize: '20px',
            })
            .setOrigin(0.85, 0.5);
        const icon = scene.add
            .sprite(0, 0, 'icons', itemType)
            .setOrigin(-1, 0.5);

        this.add(panel);
        this.add(this._score);
        this.add(icon);
    }

    public increment(qty: number) {
        const sum = parseInt(this._score.text) + qty;
        this._score.setText(sum.toString());
    }

    getResult() {
        return parseInt(this._score.text);
    }
}
