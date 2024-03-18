export const sortUsers = (users, sortBy) => {
    if (users) {
        switch (sortBy) {
            case "dateDescending":
                return users.sort((a, b) => b.createdOn - a.createdOn);
            case "dateAscending":
                return users.sort((a, b) => a.createdOn - b.createdOn);
            case "usernameDescending":
                return users.sort((a, b) => b.handle.localeCompare(a.handle));
            case "usernameAscending":
                return users.sort((a, b) => a.handle.localeCompare(b.handle));
            default:
                return users
                    .slice()
                    .sort(
                        (a, b) =>
                            (b ? new Date(b.createdOn) : 0) -
                            (a ? new Date(a.createdOn) : 0)
                    );
        }
    }
}

export const sortQuizzes = (quizzes, sortBy) => {
    if (quizzes) {
        switch(sortBy) {
            case "easy":
                return quizzes.filter((quiz) => quiz.difficulty === "easy");
            case "medium":
                return quizzes.filter((quiz) => quiz.difficulty === "medium");
            case "hard":
                return quizzes.filter((quiz) => quiz.difficulty === "hard");
            case "all":
                return quizzes;
            default:
                return quizzes;
        }
    }
}