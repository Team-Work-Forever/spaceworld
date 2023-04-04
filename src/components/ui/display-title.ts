export default class DisplayTitle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene);

        const title = scene.add.text(0, 0, 'Space World', {
            fontFamily: 'Days One',
            fontSize: '64px',
            color: '#ffffff',
        });

        const subTitle = scene.add.text(0, 0, 'Peanuts War', {
            fontFamily: 'Days One',
            fontSize: '34px',
            color: '#FC8F2B',
        });

        Phaser.Display.Align.In.Center(subTitle, title, 0, 50);

        this.add(subTitle);
        this.add(title);
    }
}
