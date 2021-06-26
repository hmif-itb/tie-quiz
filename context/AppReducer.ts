import { Action, ActionType } from "../types/actions";
import { AppState } from "../types/state";

const AppReducer = (state: AppState, action: Action): AppState => {
    switch(action.type){
        case ActionType.SetLoading:
            return {...state, loading: action.payload};
        case ActionType.SetLogin:
            return {...state, loggedin: action.payload};
        case ActionType.SetName:
            return {...state, name: action.payload};
        case ActionType.SetPoints:
            return {...state, points: action.payload};
        case ActionType.SetStatus:
            return {...state, status: action.payload};
        case ActionType.SetRoom:
            return {...state, roomId: action.payload};
        case ActionType.SetRoundNumber:
            return {...state, roundNumber: action.payload};
        case ActionType.SetGame:
            return {...state, game: action.payload};
        case ActionType.SetPlayerState:
            return {
                ...state,
                player: {
                    answer: [...state.player.answer, action.payload.answer],
                    points: [...state.player.points, action.payload.points]
                }
            };
        case ActionType.SetAnswerButton:
            return {...state, answerDisabled: action.payload};
        case ActionType.SetCorrectAnswer:
            return {...state, correctAnswer: action.payload};
        case ActionType.SetGameFinished:
            return {...state, gameFinished: action.payload};
        default:
            return state;
    }
};

export default AppReducer;