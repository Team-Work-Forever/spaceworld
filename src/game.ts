import Phaser from 'phaser';
import { GameConfig } from './config';

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

export default new Phaser.Game(GameConfig);

// var game: Phaser.Game;

// window.addEventListener('load', () => {
//     //game = new Phaser.Game(GameConfig);
// });
