import { MainScene, HudScene, StartScene } from './scenes';
import GameOverScene from './scenes/game-over-scene';
import HistoryScene from './scenes/history-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    title: 'Template',
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
    },
    scene: [StartScene, MainScene, HudScene, GameOverScene, HistoryScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
    },
    backgroundColor: '#000000',
    render: { pixelArt: false, antialias: true },
};

export const player_initial_lifes = 4;
export const player_max_lifes = player_initial_lifes + 6;
export const heart_probability = 10; // 10%
export const invert_pill_probability = 1; // 10%
export const increment_velocity_asteroids = 0.05; // 10%
export const background_velocity = 0.5;
export const background_menu_velocity = 0.2;
