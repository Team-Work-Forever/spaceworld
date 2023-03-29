import Laser from "./laser";

export default class LayserGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: Laser,
            frameQuantity: 150,
            active: false,
            visible: false,
            key: 'bullet'
        })

    }

    fireLayser(x: number, y: number) {

        const layser = this.getFirstDead(false) as Laser;

        if (layser) {
            layser.fire(x, y)
        }

    }

}