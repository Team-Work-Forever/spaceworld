import { ItemType } from '../gameObjects/items/item-type';
import CrystalContainer from './ui/crystal_container';
import EnergyBar from './ui/energy-bar';
import { HeartBar } from './ui/heart-ui';
import ShieldBar from './ui/shield-bar';

export default class DisplayMenu {
    private _point_to_gain: number = 1;
    private _gap: number = 130;
    private _right_container!: Phaser.GameObjects.Container;
    private _left_container!: Phaser.GameObjects.Container;
    private _bottom_right_container!: Phaser.GameObjects.Container;
    private _bottom_left_container!: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene) {
        const { width, height } = scene.scale;

        this._left_container = scene.add.container(100, 80);
        this._right_container = scene.add.container(width - 132, 80);
        this._bottom_right_container = scene.add.container(
            width - 200 - this._gap,
            height - 80,
        );
        this._bottom_left_container = scene.add.container(
            this._gap - 50,
            height - 80,
        );

        // Left Side
        this.addToLeftContainer(scene);

        // Right Side
        this.addToRightContainer(scene);

        // Bottom Right Side
        this.addToBottomRightContainer(scene);

        this.addToBottomLeftContainer(scene);
    }

    addToBottomLeftContainer(scene: Phaser.Scene) {
        const shield_bar = new ShieldBar(scene);
        this._bottom_left_container.add(shield_bar);
    }

    addToBottomRightContainer(scene: Phaser.Scene) {
        const energy_bar = new EnergyBar(scene);
        this._bottom_right_container.add(energy_bar);
    }

    addToLeftContainer(scene: Phaser.Scene) {
        const heart_bar = new HeartBar(scene);
        this._left_container.add(heart_bar);
    }

    addToRightContainer(scene: Phaser.Scene) {
        const blue_crystal = new CrystalContainer(
            scene,
            -this._gap * 0,
            1,
            ItemType.BLUE,
        );
        const yellow_crystal = new CrystalContainer(
            scene,
            -this._gap * 1,
            1,
            ItemType.YELLOW,
        );

        const purple_crystal = new CrystalContainer(
            scene,
            -this._gap * 2,
            1,
            ItemType.PURPLE,
        );
        
        const text_display = scene.add
            .text(-70, 50, 'Level: 1', {
                fontFamily: 'Days One',
                fontSize: '20px',
            })
            .setOrigin(0.5, 0.5);


        this._right_container.add(yellow_crystal);
        this._right_container.add(purple_crystal);
        this._right_container.add(blue_crystal);
        this._right_container.add(text_display);
    }

    public updateEnergy(value: number, permission: boolean = false) {
        const energy_bar = this._bottom_right_container.getAt(0) as EnergyBar;
        energy_bar.handleEnergyChanged(value, permission);
    }

    public updateShield(value: number, is_active: boolean) {
        const shield_bar = this._bottom_left_container.getAt(0) as ShieldBar;
        shield_bar.handleEnergyChanged(value, is_active);
        shield_bar.setVisible(is_active);
    }

    public updateLevel(level: number) {
        const level_diplay = this._right_container.getAt(
            3,
        ) as Phaser.GameObjects.Text;

        level_diplay.text = `Level: ${Math.trunc(level).toString()}`;
    }

    public increaseLife(lifes: number) {
        (this._left_container.getAt(0) as HeartBar).increase_lifes_by_one(
            lifes,
        );
    }

    public decreaseLife(lifes: number) {
        const health_bar = this._left_container.getAt(0) as HeartBar;
        health_bar.decrease_heart(lifes);
    }

    public increaseScore(itemType: ItemType, score: number = 0) {
        (this._right_container.getAt(itemType) as CrystalContainer).increment(
            this._point_to_gain + score,
        );
    }
}
