import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { AppState } from '../types/state';
import { ActionType } from '../types/actions';

const initialStateValue: AppState = {
    loading: false,
    setLoading: undefined
};

const AppContext = createContext<AppState>(undefined);

const AppProvider = (props) => {

    const [state, dispatch] = useReducer(AppReducer, initialStateValue);

    useEffect(() => {
        /* Subscribe Here */

        return (() => {
            /* Unsubscribe Here */
        })
    }, []);

    const doAsyncTask = async () => {
        
        /* Do await stuff */

        /*

            dispatch({
                type: DO_STUFF,
                payload: stuff
            })
        */
    };

    const setLoading = (value: boolean) => {

        dispatch({
            type: ActionType.SetLoading,
            payload: value
        });
    }


    return (
    <AppContext.Provider value={{...state, setLoading}} >
        {props.children}
    </AppContext.Provider>);
}

export {AppContext, AppProvider};
