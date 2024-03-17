export class Question {
    constructor(category, difficulty, type) {
        this.category = category;
        this.correct_answer = "";
        this.incorrect_answers = ["", "", "", ""];
        this.mixedAnswers = ["", "", "", ""];
        this.difficulty = difficulty;
        this.question = "";
        this.type = type;
    }
}