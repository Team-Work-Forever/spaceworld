class GameStorage {
    private _scores: number[];
    private _max_score: number = 5;
    private _last_high_score: number = 0;

    constructor() {
        this._scores = this.getAll();
    }

    public getAll() {
        const getLocalScore = localStorage.getItem('score');

        if (getLocalScore) {
            return JSON.parse(getLocalScore);
        }

        return [];
    }

    public isNewTopScore(top: number): boolean {
        return this._scores.length > 1 ? this._last_high_score < top : true;
    }

    public store(new_score: number) {
        this._last_high_score = this._scores[0];

        if (this._scores.length >= this._max_score) {
            if (new_score <= this._scores[this._max_score - 1]) {
                return;
            }

            this._scores.pop();
        }

        this._scores.push(new_score);
        this._scores.sort((a, b) => b - a);

        localStorage.setItem('score', JSON.stringify(this._scores));
    }
}

var gameStorage = new GameStorage();

export default gameStorage as GameStorage;
