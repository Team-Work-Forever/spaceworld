import { player_initial_lifes, player_max_lifes } from '../../../config';
import { HeartType } from './heart';

export default class HeartBar extends Phaser.GameObjects.Container {
    private _grap: number = 60;
    private _heart_group: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene) {
        super(scene);

        // Define group
        this._heart_group = scene.physics.add.group({
            maxSize: player_max_lifes,
            key: 'heart',
        });

        // Define 3 hearts
        this._heart_group.createMultiple({
            frameQuantity: player_initial_lifes - 1,
            key: 'heart',
        });

        this.draw(player_initial_lifes);
    }

    public increase_lifes_by_one(lifes: number) {
        lifes++;
        if (lifes > player_initial_lifes) {
            this._heart_group.create(0, 0, 'heart');
        }

        this.draw(lifes);
    }

    public decrease_heart(lifes: number) {
        lifes--;
        const last_heart = this._heart_group.getLast(true);

        if (this._heart_group.getLength() > player_initial_lifes) {
            this._heart_group.remove(last_heart, true, true);
        }

        this.draw(lifes);
    }

    private draw(lifes: number) {
        let count: number = 0;
        this.removeAll();

        this._heart_group.children.each(
            (heart: Phaser.Physics.Arcade.Sprite) => {
                heart.setPosition(count, 0);

                if (lifes > count / this._grap) {
                    heart.setFrame(HeartType.UNBROKEN);
                } else {
                    heart.setFrame(HeartType.BROKEN);
                }

                this.add(heart);
                count += this._grap;
            },
        );
    }
}
