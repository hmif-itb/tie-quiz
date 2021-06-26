import { createContext, useReducer, useEffect, Dispatch} from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';
import { AppState } from '../types/state';
import { Action, ActionType } from '../types/actions';
import { socket } from '../services/socket';

const initialStateValue: AppState = {
    loggedin: false,
    loading: true,
    name: null,
    points: 0,
    status: 0,
    roomId: null,
    roundNumber: 0,
    game: null,
    player: {
        answer: [],
        points: []
    },
    answerDisabled: false,
    correctAnswer: -1,
    gameFinished: null
};

type ContextType = {
    state: AppState,
    dispatch: Dispatch<Action>
}

const AppContext = createContext<ContextType>(undefined);

type AppProviderType = {
    children: JSX.Element
}

const AppProvider = ({ children }: AppProviderType): JSX.Element => {

    const [state, dispatch] = useReducer(AppReducer, initialStateValue);

    useEffect(() => {
        /* Subscribe Here */

        if (state.loggedin) {

            socket.emit("login", {});

            socket.on("init", (resp): void => {
                dispatch({
                    type: ActionType.SetName,
                    payload: resp.name
                });// name = junho
                dispatch({
                    type: ActionType.SetPoints,
                    payload: resp.points
                }); 
            });

            socket.on("match", (arg: {roomId: string, game: AppState["game"]}): void => {
                console.log("Matched!");
                dispatch({
                    type: ActionType.SetRoom,
                    payload: arg.roomId
                });
                dispatch({
                    type: ActionType.SetGame,
                    payload: arg.game
                });
                dispatch({
                    type: ActionType.SetStatus,
                    payload: 2
                });
            });

            socket.on("answerreceived", (value: number): void => {
                dispatch({
                    type: ActionType.SetCorrectAnswer,
                    payload: value
                });
            });

            socket.on("nextround", (arg: number): void => {
                dispatch({
                    type: ActionType.SetRoundNumber,
                    payload: arg
                });
            });

            socket.on("gamefinished", (arg: {status: string, point: number}): void => {
                dispatch({
                    type: ActionType.SetGameFinished,
                    payload: {
                        status: arg.status,
                        point: arg.point
                    }
                });
                dispatch({
                    type: ActionType.SetStatus,
                    payload: 3
                });
            });

            socket.on("messagefromroom", (resp: string) => {
                console.log("from room :" + resp);
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
    <AppContext.Provider value={{state, dispatch}} >
        {children}
    </AppContext.Provider>);
}

export {AppContext, AppProvider};
