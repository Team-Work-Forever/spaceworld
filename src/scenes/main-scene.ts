import Phaser from "phaser";
import Player from "../gameObjects/player";
import KeyBoardInput from "../utils/cursor-utils";

export default class MainScene extends Phaser.Scene {

    in: KeyBoardInput
    player: Player

    preload() {
        this.load.spritesheet('player', '../../assets/player.png', { frameWidth: 280, frameHeight: 344 });
    }

    create() {
        this.in = new KeyBoardInput(this);
        this.player = new Player(this, 200, 200);
    }

    update(): void {
        this.player.update();
    }

}