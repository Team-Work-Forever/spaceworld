import SpaceButton from './ui/space-button';

export default class DisplayStartMenu extends Phaser.GameObjects.Container {
    private _container!: Phaser.GameObjects.Container;
    private _title!: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene) {
        super(scene);

        const { width, height } = this.scene.scale;

        this._container = this.scene.add.container(
            width / 2 - 68 * 2,
            height / 2,
        );

        this._title = this.scene.add
            .container()
            .setPosition(width / 2 - 574 / 2.5, height / 2 - 300);

        const title = scene.add.text(0, 0, 'Space World', {
            fontFamily: 'Days One',
            fontSize: '64px',
            color: '#ffffff',
        });

        const subTitle = scene.add
            .text(0, 0, 'Peanuts War', {
                fontFamily: 'Days One',
                fontSize: '34px',
                color: '#FC8F2B',
            })
            .setOrigin(-0.45, -2.5);

        this._title.add(title);
        this._title.add(subTitle);

        const start_button = new SpaceButton(scene, 'Start Game');
        const score_button = new SpaceButton(scene, 'High Score').setPosition(
            0,
            100,
        );
        const constrollers_button = new SpaceButton(
            scene,
            'Controllers',
        ).setPosition(0, 200);

        // this._container.add(this._title);
        this._container.add(start_button);
        this._container.add(score_button);
        this._container.add(constrollers_button);
    }
}
