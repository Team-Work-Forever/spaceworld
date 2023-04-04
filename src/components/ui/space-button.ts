export default class SpaceButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, text: string) {
        super(scene);

        const content = this.scene.add
            .image(0, 0, 'spacebutton')
            .setOrigin(0, 0);

        const label = scene.add
            .text(0, 0, text, {
                fontFamily: 'Days One',
                fontSize: '34px',
                color: '#262649',
            })
            .setOrigin(-0.15, -0.35);

        this.add(content);
        this.add(label);
    }
}
