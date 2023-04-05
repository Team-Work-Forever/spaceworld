import DisplayBar from './display-bar';

export default class EnergyBar extends DisplayBar {
    constructor(scene: Phaser.Scene) {
        super(scene, 'Energy', false, 0xf7d555);
    }

    override renderProgress(
        percent: number,
        is_enabled: boolean,
        fill_color: number,
    ): void {
        if (is_enabled) {
            this._graphics.fillStyle(0xd80404);
        } else {
            if (percent > 0.6 && percent <= 0.8) {
                this._graphics.fillStyle(fill_color);
            } else if (percent > 0.8) {
                this._graphics.fillStyle(0xff5400);
            } else {
                this._graphics.fillStyle(0x00ff00);
            }
        }
    }
}
