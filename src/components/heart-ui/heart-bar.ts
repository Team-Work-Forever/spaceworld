import { HeartType } from './heart';

export default class HeartBar extends Phaser.GameObjects.Container {
    private _grap: number = 60;
    private _heart_group: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene) {
        super(scene);

        let count: number = 0;

        // Define group
        this._heart_group = scene.physics.add.group({
            maxSize: 10,
            key: 'heart',
        });

        // Define 3 corações
        this._heart_group.createMultiple({
            frameQuantity: 2,
            key: 'heart',
        });

        this._heart_group.children.each(
            (heart: Phaser.Physics.Arcade.Sprite) => {
                heart.setPosition(count, 0);
                heart.setFrame(HeartType.UNBROKEN);

                this.add(heart);
                count += this._grap;
            },
        );
    }
}
