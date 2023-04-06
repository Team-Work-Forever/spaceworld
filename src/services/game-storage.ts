class GameStorage {
    private scores: number[];
    private max_score: number = 5;

    constructor() {
        this.scores = this.getAll();
    }

    public getAll() {
        const getLocalScore = localStorage.getItem('score');

        if (getLocalScore) {
            return JSON.parse(getLocalScore);
        }

        return [];
    }

    public getTopScore() {
        return this.scores.slice(0, this.max_score);
    }

    public store(new_score: number) {
        if (this.scores.length >= this.max_score) {
            if (new_score <= this.scores[this.max_score - 1]) {
                return;
            }

            this.scores.pop();
        }

        this.scores.push(new_score);
        this.scores.sort((a, b) => b - a);
        localStorage.setItem('score', JSON.stringify(this.scores));
    }
}

var gameStorage = new GameStorage();

export default gameStorage as GameStorage;
