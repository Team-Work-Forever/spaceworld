import MainScene from '../../scenes/main-scene';
import Item from '../items/item';
import { ItemType } from '../items/item-type';

export class Asteroid extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    declare scene: MainScene;
    private _sprite: string;
    private _itemType: ItemType;
    private _isDestroied: boolean = false;

    constructor(
        scene: MainScene,
        x: number,
        y: number,
        sprite: string,
        itemType: ItemType,
    ) {
        super(scene, x, y, sprite, itemType);

        this._sprite = sprite;
        this._itemType = itemType;

        this.setSpin();
        this.setExplode();

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    protected setSpin() {}

    protected setExplode(): void {}

    // TODO: Drop Item
    destroyAndCollect(): void {
        this.play('explode-' + this.sprite);

        this.setFrictionX(20);
        this.scene._asteroidGroup.remove(this);

        this.scene._itemGroup.add(
            new Item(this.scene, this.x, this.y, this._itemType),
        );

        this._isDestroied = true;
    }

    protected preUpdate(time, delta): void {
        super.preUpdate(time, delta);

        if (this._isDestroied) {
            this.alpha -= 0.005;
        }

        if (this.x <= 0) {
            this.destroy();
        }
    }

    get sprite() {
        return this._sprite;
    }
}
