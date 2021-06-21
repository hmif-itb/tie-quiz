import { Action, ActionType } from "../types/actions";
import { AppState } from "../types/state";

const AppReducer = (state: AppState, action: Action): AppState => {
    switch(action.type){
        case ActionType.SetLoading:
            return {...state, loading: action.payload};
        default:
            return state;
    }
};

export default AppReducer;