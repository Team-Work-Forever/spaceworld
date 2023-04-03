import Phaser from 'phaser';

export default class KeyBoardInput {
    private _cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        this._cursor = scene.input.keyboard.createCursorKeys();
    }

    get cursor() {
        return this._cursor;
    }
}
