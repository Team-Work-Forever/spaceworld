export default class EnergyBar extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene);

        const bar_frame = scene.add.image(0, 0, 'energy_frame');
        const bar_content = scene.add.image(0, 0, 'energy_content');

        this.add(bar_content);
        this.add(bar_frame);
    }
}
