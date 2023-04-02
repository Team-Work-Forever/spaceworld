import Laser from './laser';

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, {
            classType: Laser,
            maxSize: 10,
            active: false,
            visible: false,
            key: 'bullet',
        });
    }
}
