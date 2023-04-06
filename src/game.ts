import Phaser from 'phaser';
import { GameConfig } from './config';

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

// var game: Phaser.Game;

// window.addEventListener('load', () => {
//     //game = new Phaser.Game(GameConfig);
// });

export default new Phaser.Game(GameConfig);
