import DisplayTitle from './ui/display-title';
import SpaceButton from './ui/space-button';

export default class DisplayStartMenu extends Phaser.GameObjects.Container {
    private _container!: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x, y) {
        super(scene, x, y);

        const title = scene.add.text(
            400,
            50,
            'Três botões com escalas diferentes',
            {},
        );
        title.setOrigin(0, 0);

        this.scene.add.existing(this);
    }
}
