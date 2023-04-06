import MainScene from '../../scenes/main-scene';
import ItemFactory from '../items/item-factory';
import { ItemType } from '../items/item-type';

export class Asteroid extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    declare scene: MainScene;
    private _sprite: string;
    private _itemType: ItemType;
    private _isDestroied: boolean = false;
    private _itemFactory: ItemFactory;

    constructor(
        scene: MainScene,
        x: number,
        y: number,
        sprite: string,
        itemType: ItemType,
    ) {
        super(scene, x, y, sprite, itemType);

        this._itemFactory = new ItemFactory(scene);

        this._sprite = sprite;
        this._itemType = itemType;

        this.setSpin();
        this.setExplode();

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    protected setSpin() {}

    protected setExplode(): void {}

    // Drop Item
    destroyAndCollect(is_heart: boolean = false): void {
        this.play('explode-' + this.sprite);

        this.setFrictionX(20);
        this.scene._asteroidGroup.remove(this);

        // Spawn o cristal
        this.scene._itemGroup.add(
            this._itemFactory.createRandom(
                this.x,
                this.y,
                this._itemType,
                is_heart,
            ),
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
