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
        default:
            return state;
    }
};

export default AppReducer;