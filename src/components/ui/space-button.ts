export default class SpaceButton extends Phaser.GameObjects.Container {
    private _scale: number;
    private _duration: number = 100;

    constructor(
        scene: Phaser.Scene,
        text: string,
        x: number,
        y: number,
        scale_: number = 1,
    ) {
        super(scene, x, y);

        this.setScale(scale_);
        this._scale = scale_;

        const frame = scene.add.image(0, 0, 'spacebutton').setOrigin(0.5, 0.5);

        const label = scene.add
            .text(0, 0, text, {
                fontFamily: 'days-gone',
                fontSize: '25px',
                color: '#262649',
            })
            .setOrigin(0.5, 0.5);

        Phaser.Display.Align.In.Center(label, frame);

        this.add(frame);
        this.add(label);

        this.setSize(frame.width, frame.height);

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.scene.tweens.add({
                    targets: this,
                    scale: this._scale + 0.2,
                    duration: this._duration,
                    onUpdate: (value) => {
                        this.setScale(value.getValue());
                    },
                    ease: 'Sine.InOut',
                });
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.scene.tweens.add({
                    targets: this,
                    scale: this._scale,
                    duration: this._duration,
                    onUpdate: (value) => {
                        this.setScale(value.getValue());
                    },
                    ease: 'Sine.OutIn',
                });
            });

        scene.add.existing(this);
    }
}
