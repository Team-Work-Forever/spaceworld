export default class EnergyBar extends Phaser.GameObjects.Container {
    private _graphics!: Phaser.GameObjects.Graphics;
    private _text!: Phaser.GameObjects.Text;
    private _width: number = 250;
    private _heigh: number = 35;
    private _initial_value: number = 5;

    private lastEnergy = 100;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this._text = scene.add
            .text(0, 0, 'Energy', {
                fontFamily: 'Days One',
                fontSize: '20px',
            })
            .setOrigin(-0.25, -0.25);

        this._graphics = scene.add.graphics();
        this.setEnergyBar(this._initial_value);

        this.add(this._graphics);
        this.add(this._text);
    }

    private setEnergyBar(value: number, is_not_enabled: boolean = false) {
        const percent = Phaser.Math.Clamp(value, 0, 100) / 100;
        this._graphics.clear();
        this._graphics.fillStyle(0x808080);
        this._graphics.fillRoundedRect(0, 0, this._width, this._heigh, 5)
            .setPosition;

        if (percent > 0) {
            if (is_not_enabled) {
                this._graphics.fillStyle(0xd80404);
            } else {
                if (percent > 0.6 && percent <= 0.8) {
                    this._graphics.fillStyle(0xf7d555);
                } else if (percent > 0.8) {
                    this._graphics.fillStyle(0xff5400);
                } else {
                    this._graphics.fillStyle(0x00ff00);
                }
            }

            this._graphics.fillRoundedRect(
                0,
                0,
                this._width * percent,
                this._heigh,
                5,
            );
        }
    }

    public handleEnergyChanged(value: number, is_not_enabled: boolean = false) {
        this.scene.tweens.addCounter({
            from: this.lastEnergy,
            to: value,
            duration: 200,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: (tween) => {
                const value = tween.getValue();
                this.setEnergyBar(value, is_not_enabled);
            },
        });

        this.setEnergyBar(value, is_not_enabled);

        this.lastEnergy = value;
    }
}
