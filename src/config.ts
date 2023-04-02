import { MainScene, HudScene } from './scenes';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    title: 'Template',
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
    },
    scene: [MainScene, HudScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
    },
    backgroundColor: '#000000',
    render: { pixelArt: false, antialias: true },
};
