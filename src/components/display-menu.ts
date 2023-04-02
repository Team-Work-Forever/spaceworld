import { ItemType } from '../gameObjects/items/item-type';
import CrystalContainer from './crystal_container';
import EnergyBar from './energy-bar';
import { HeartBar } from './heart-ui';

export default class DisplayMenu {
    private _point_to_gain: number = 1;
    private _gap: number = 130;
    private right_container!: Phaser.GameObjects.Container;
    private left_container!: Phaser.GameObjects.Container;
    private bottom_right_container!: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene) {
        const { width, height } = scene.scale;

        console.log(width);

        this.left_container = scene.add.container(100, 80);
        this.right_container = scene.add.container(width - 132, 80);
        this.bottom_right_container = scene.add.container(
            width - 200 - 66,
            height - 75,
        );

        // Left Side
        this.addToLeftContainer(scene);

        // Right Side
        this.addToRightContainer(scene);

        // Bottom Right Side
        this.addToBottomRightContainer(scene);
    }

    addToBottomRightContainer(scene: Phaser.Scene) {
        const energy_bar = new EnergyBar(scene);

        this.bottom_right_container.add(energy_bar);
    }

    addToLeftContainer(scene: Phaser.Scene) {
        const heart_bar = new HeartBar(scene);
        this.left_container.add(heart_bar);
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

        this.right_container.add(yellow_crystal);
        this.right_container.add(purple_crystal);
        this.right_container.add(blue_crystal);
    }

    public increaseScore(itemType: ItemType) {
        (this.right_container.getAt(itemType) as CrystalContainer).increment(
            this._point_to_gain,
        );
    }
}
