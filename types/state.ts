export type AppState = {
    loggedin: boolean;
    loading: boolean;

    name: string;
    points: number;
    status: number;

    roomId: string;

    roundNumber: number;

    answerDisabled: boolean;

    correctAnswer: number;

    game: {
        questions: string[],
        answers: string[][],
    };

    player: {
        answer: number[],
        points: number[]
    };

    gameFinished: {
        status: string,
        point: number
    };
};