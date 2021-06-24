import { createContext, useReducer, useEffect, Dispatch} from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import AppReducer from './AppReducer';
import { AppState } from '../types/state';
import { Action, ActionType } from '../types/actions';

const initialStateValue: AppState = {
    loggedin: false,
    loading: true,
    name: null,
    points: 0,
    status: 0
};

type ContextType = {
    state: AppState,
    dispatch: Dispatch<Action>,
    socket: Socket
}

const AppContext = createContext<ContextType>(undefined);

type AppProviderType = {
    children: JSX.Element
}

const AppProvider = ({ children }: AppProviderType): JSX.Element => {

    const [state, dispatch] = useReducer(AppReducer, initialStateValue);

    let socket: Socket = null;

    useEffect(() => {
        /* Subscribe Here */

        if (state.loggedin) {

            socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
                withCredentials: true
            });

            socket.on("init", (resp) => {
                dispatch({
                    type: ActionType.SetName,
                    payload: resp.name
                });
                dispatch({
                    type: ActionType.SetPoints,
                    payload: resp.points
                });
            });

        } else {

            (async (): Promise<void> => {
                try {
                    const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/verifysession`, {
                        withCredentials: true
                    });
        
                    const { status }: { status: string } = resp.data;

                    if(status === "success") {
                        dispatch({
                            type: ActionType.SetLogin,
                            payload: true
                        });
                    }
                    
                    
                } catch (e) {
                    const errorMessage: string = (e as Error).message;
                    console.log(errorMessage);
                }
                
                dispatch({
                    type: ActionType.SetLoading,
                    payload: false
                });
            })();

        }
        

        return (() => {
            /* Unsubscribe Here */
            
            if(state.loggedin) {
                socket?.offAny();
            }
        })
    }, [state.loggedin]);

    const doAsyncTask = async (): Promise<void> => {
        
        /* Do await stuff */

        /*

            dispatch({
                type: DO_STUFF,
                payload: stuff
            })
        */
    };


    return (
    <AppContext.Provider value={{state, dispatch, socket}} >
        {children}
    </AppContext.Provider>);
}

export {AppContext, AppProvider};
