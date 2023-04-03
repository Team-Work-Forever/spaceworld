import { Scene } from 'phaser';
import Item from '../item';
import { ItemType } from '../item-type';

export default class Heart extends Item {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, ItemType.HEART, 'heart', 0.3);
        this.setFrame(1, true);
    }
}
