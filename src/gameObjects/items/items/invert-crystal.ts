import { Scene } from 'phaser';
import Item from '../item';
import { ItemType } from '../item-type';

export default class InvertCrystal extends Item {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, ItemType.SCALE_PILL, 'item', 0.1);
    }
}
