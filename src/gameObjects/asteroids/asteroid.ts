import MainScene from "../../scenes/main-scene";
import Item from "../items/item";
import { ItemType } from "../items/item-type";

export class Asteroid extends Phaser.Physics.Arcade.Sprite {

    declare body: Phaser.Physics.Arcade.Body;
    declare scene: MainScene;
    private _sprite: string;
    private _itemType: ItemType;

    constructor(scene: MainScene, x: number, y: number, sprite: string, itemType: ItemType) {
        super(scene, x, y, sprite);

        this._sprite = sprite;
        this._itemType = itemType;

        this.setSpin();
        this.setExplode();

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    protected setSpin() { }

    protected setExplode(): void { }

    override destroy(fromScene?: boolean): void {
        // Mudar esta fita cola
        this.scene._itemGroup.add(new Item(this.scene, this.x, this.y, this._itemType));
        super.destroy(fromScene);
    }

    get sprite() {
        return this._sprite;
    }

    // display(x: number, y: number) {
    //     this.body.reset(x, y);
    //     this.setActive(true);
    //     this.setVisible(true);
    // }

}