import { Scene } from 'phaser';
import Item from './item';

export default class ItemGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene: Scene, qty_items: number) {
        super(scene.physics.world, scene, {
            classType: Item,
            max: qty_items,
            active: false,
            visible: false,
            key: 'item',
        });
    }
}
