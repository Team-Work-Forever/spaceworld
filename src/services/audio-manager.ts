export default class AudioManager {
    private _game: Phaser.Game;

    private _volume_background: number = 0.25;
    private _volume: number = 0.5;

    // Gameover
    private _gameover: Phaser.Sound.BaseSound;
    private _highscore: Phaser.Sound.BaseSound;

    // Player Sounds
    private _destroy_esteves: Phaser.Sound.BaseSound;
    private _destroy_asteroid: Phaser.Sound.BaseSound;
    private _damage_sound: Phaser.Sound.BaseSound;
    private _laser_sound: Phaser.Sound.BaseSound;
    private _reload_sound: Phaser.Sound.BaseSound;
    private _over_heat: Phaser.Sound.BaseSound;

    // count
    private _counter: Phaser.Sound.BaseSound;
    private _counter_start: Phaser.Sound.BaseSound;

    // Music
    private _background_music: Phaser.Sound.BaseSound;

    constructor(game: Phaser.Game) {
        this._game = game;
    }

    public setUpAllSounds() {
        this._background_music = this._game.sound.add('background-audio', {
            loop: true,
            volume: this._volume_background,
        });

        this._counter = this._game.sound.add('counter', {
            volume: this._volume,
        });

        this._counter_start = this._game.sound.add('counter-start', {
            volume: this._volume,
        });

        this._destroy_esteves = this._game.sound.add('esteves-destroy', {
            volume: 1,
        });

        this._destroy_asteroid = this._game.sound.add('destroy-asteroid', {
            volume: this._volume,
        });

        this._damage_sound = this._game.sound.add('esteves-damage', {
            volume: 0.1,
        });

        this._laser_sound = this._game.sound.add('laser-sound', {
            volume: this._volume - 0.2,
        });
        this._reload_sound = this._game.sound.add('reload-weapon', {
            volume: this._volume - 0.2,
        });
        this._highscore = this._game.sound.add('high-score', {
            volume: this._volume,
        });
        this._gameover = this._game.sound.add('gameover-sound', {
            volume: this._volume,
        });
        this._over_heat = this._game.sound.add('overheat', {
            volume: this._volume,
        });
    }

    public setUpBackgroundMusic() {
        this._background_music.play();
    }

    public setDownBackgroundMusic() {
        this._background_music.destroy();
    }

    public getBackgroundMusic() {
        return this._background_music;
    }

    public stopBackgroundMusic() {
        this._background_music.stop();
    }

    public playSingleCounter() {
        this._counter.play();
    }

    public playStartCounter() {
        this._counter_start.play();
    }

    public playDestroyPlayer() {
        this._destroy_esteves.play();
    }

    public playDestroyAsteroid() {
        this._destroy_asteroid.play();
    }

    public playTakeDamege() {
        this._damage_sound.play();
    }

    public playLaserSound() {
        this._laser_sound.play();
    }

    public playReloadSound() {
        this._reload_sound.play();
    }

    public playGameOver() {
        this._gameover.play();
    }

    public playHighScore() {
        this._highscore.play();
    }

    public playOverHeat() {
        this._over_heat.play();
    }

    public stopGameOver() {
        this._gameover.stop();
        this._highscore.stop();
    }
}
