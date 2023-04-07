import DisplayBar from './display-bar';

export default class ShieldBar extends DisplayBar {
    constructor(scene: Phaser.Scene) {
        super(scene, 'Shield', false, 0x54a3ff, 100);
        this.setVisible(false);
    }

    override renderProgress(
        percent: number,
        _is_enabled: boolean = false,
        fill_color: number,
    ): void {
        if (percent > 0.4 && percent <= 0.8) {
            this._graphics.fillStyle(0xf7d555);
        } else if (percent > 0.8) {
            this._graphics.fillStyle(fill_color);
        } else {
            this._graphics.fillStyle(0xff5400);
        }
    }
}
