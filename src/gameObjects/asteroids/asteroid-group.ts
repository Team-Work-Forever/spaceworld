import { Asteroid } from './asteroid';

export default class AsteroidGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene, qty_asteroids: number) {
        super(scene.physics.world, scene, {
            classType: Asteroid,
            maxSize: qty_asteroids,
            active: false,
            visible: false,
            key: 'bullet',
        });
    }
}
