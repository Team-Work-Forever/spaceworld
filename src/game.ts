import Phaser from 'phaser';
import { GameConfig } from './config';
import AudioManager from './services/audio-manager';

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

var game: Phaser.Game;
var audioManager: AudioManager;

window.addEventListener('load', () => {
    game = new Phaser.Game(GameConfig);
    audioManager = new AudioManager(game);
});

export { game, audioManager };
