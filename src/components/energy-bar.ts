export default class Energy_rec extends Phaser.GameObjects.Container {
    private graphics!: Phaser.GameObjects.Graphics;
    private _width: number = 250;
    private _heigh: number = 35;
    private _initial_value: number = 5;

    private lastHealth = 100;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);

        this.graphics = scene.add.graphics().setPosition(x, y);
        this.setEnergyBar(this._initial_value);
    }

    private setEnergyBar(value: number, is_not_enabled: boolean = false) {
        const percent = Phaser.Math.Clamp(value, 0, 100) / 100;
        this.graphics.clear();
        this.graphics.fillStyle(0x808080);
        this.graphics.fillRoundedRect(0, 0, this._width, this._heigh, 5)
            .setPosition;
        if (percent > 0) {
            if (is_not_enabled) {
                this.graphics.fillStyle(0xd80404);
            } else {
                if (percent > 0.6) {
                    this.graphics.fillStyle(0xf7d555);
                } else {
                    this.graphics.fillStyle(0x00ff00);
                }
            }

            this.graphics.fillRoundedRect(
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
            from: this.lastHealth,
            to: value,
            duration: 200,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: (tween) => {
                const value = tween.getValue();
                this.setEnergyBar(value, is_not_enabled);
            },
        });

        this.setEnergyBar(value, is_not_enabled);

        this.lastHealth = value;
    }
}
