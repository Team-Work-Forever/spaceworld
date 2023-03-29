import { Scene } from "phaser";
import Item from "./item";

export default class ItemGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene: Scene, qty_items: number) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Item,
            frameQuantity: qty_items,
            active: false,
            visible: false,
            randomFrame: true,
            key: 'item'
        })

    }

    showItems(x: number, y: number) {

        const item = this.getFirstDead(false) as Item;

        if (item) {
            item.setFrame(Math.ceil(Math.random() * 2))
            item.display(x, y);
        }

    }

}