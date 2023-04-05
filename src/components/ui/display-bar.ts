export default class DisplayBar extends Phaser.GameObjects.Container {
    protected _graphics!: Phaser.GameObjects.Graphics;
    private _text!: Phaser.GameObjects.Text;
    private _width: number = 250;
    private _heigh: number = 35;
    private _fill_color: number;

    private lastEnergy = 100;

    constructor(
        scene: Phaser.Scene,
        text: string,
        is_enabled: boolean = false,
        fill_color: number,
        initial_value: number = 5,
    ) {
        super(scene);

        this._text = scene.add
            .text(0, 0, text, {
                fontFamily: 'Days One',
                fontSize: '20px',
            })
            .setOrigin(-0.25, -0.25);

        this._fill_color = fill_color;

        this._graphics = scene.add.graphics();
        this.setBar(initial_value, is_enabled, fill_color);

        this.add(this._graphics);
        this.add(this._text);
    }

    private setBar(
        value: number,
        is_not_enabled: boolean = false,
        fill_color: number,
    ) {
        const percent = Phaser.Math.Clamp(value, 0, 100) / 100;
        this._graphics.clear();
        this._graphics.fillStyle(0x808080);
        this._graphics.fillRoundedRect(0, 0, this._width, this._heigh, 5)
            .setPosition;

        if (percent > 0) {
            this.renderProgress(percent, is_not_enabled, fill_color);

            this._graphics.fillRoundedRect(
                0,
                0,
                this._width * percent,
                this._heigh,
                5,
            );
        }
    }

    protected renderProgress(
        percent?: number,
        is_enabled?: boolean,
        fill_color?: number,
    ) {}

    public handleEnergyChanged(value: number, is_not_enabled: boolean = false) {
        this.scene.tweens.addCounter({
            from: this.lastEnergy,
            to: value,
            duration: 200,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: (tween) => {
                const value = tween.getValue();
                this.setBar(value, is_not_enabled, this._fill_color);
            },
        });

        this.setBar(value, is_not_enabled, this._fill_color);

        this.lastEnergy = value;
    }
}
