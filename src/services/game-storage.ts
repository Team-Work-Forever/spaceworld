class GameStorage {
    private _scores: number[];
    private _max_score: number = 5;
    private _last_high_score: number;

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

    public isNewTopScore(): boolean {
        console.log(this._scores.length);

        return this._scores.length > 0
            ? this._last_high_score < this._scores.indexOf(0)
            : true;
    }

    public store(new_score: number) {
        if (this._scores.length >= this._max_score) {
            if (new_score <= this._scores[this._max_score - 1]) {
                return;
            }

            this._scores.pop();
        }

        this._last_high_score = this._scores.indexOf(0);
        this._scores.push(new_score);
        this._scores.sort((a, b) => b - a);
        console.log(this._last_high_score);
        console.log(new_score);

        localStorage.setItem('score', JSON.stringify(this._scores));
    }
}

var gameStorage = new GameStorage();

export default gameStorage as GameStorage;
