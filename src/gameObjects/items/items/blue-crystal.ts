import { Scene } from 'phaser';
import Item from '../item';
import { ItemType } from '../item-type';

export default class BlueCrystal extends Item {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, ItemType.BLUE, 'item', 1);
        this.setFrame(this.itemType, true);
    }
}
