import Phaser from 'phaser';

export default class KeyBoardInput {
    private _cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    private _keys: any;
    private _is_energy_no_lost: boolean = false;
    private _is_infinity_shield: boolean = false;

    constructor(scene: Phaser.Scene) {
        this._cursor = scene.input.keyboard.createCursorKeys();

        this._keys = scene.input.keyboard.addKeys({
            v: Phaser.Input.Keyboard.KeyCodes.V,
            b: Phaser.Input.Keyboard.KeyCodes.B,
            n: Phaser.Input.Keyboard.KeyCodes.N,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            h: Phaser.Input.Keyboard.KeyCodes.H,
        });
    }

    public isFire() {
        return this.cursor.space.isDown;
    }

    // V + B
    public fullLifeCheat() {
        return this._keys.v.isDown && this._keys.b.isDown;
    }

    // B + N + SPACE
    public noEnergyLostCheat() {
        if (this._keys.b.isDown && this._keys.n.isDown)
            this._is_energy_no_lost = !this._is_energy_no_lost;

        return this._is_energy_no_lost;
    }

    // S + H
    public infintyShield() {
        if (this._keys.s.isDown && this._keys.h.isDown)
            this._is_infinity_shield = !this._is_infinity_shield;

        return this._is_infinity_shield;
    }

    get cursor() {
        return this._cursor;
    }
}
