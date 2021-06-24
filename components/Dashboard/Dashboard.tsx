import { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

import styles from '../../styles/dashboard/dashboard.module.css';
import { ActionType } from "../../types/actions";

const Dashboard = (): JSX.Element => {

    const appContext = useContext(AppContext);

    const SERVER_URL: string = process.env.NEXT_PUBLIC_SERVER_URL;

    const tryMatching = (): void => {
        appContext.dispatch({
            type: ActionType.SetStatus,
            payload: 1
        });
    }

    const onLogout = async (): Promise<void> => {
        try {
            const resp = await axios.post(`${SERVER_URL}/logout`, {}, {
                withCredentials: true
            });

            const { status }: { status: string } = resp.data;

            if(status === "success") {
                appContext.dispatch({
                    type: ActionType.SetLogin,
                    payload: false
                });
            }


            //console.log(resp.data);
        } catch (e) {
            const errorMessage: string = (e as Error).message;
            console.log(errorMessage);
        }
    }

    return (
        <div className={styles.container}>
            {
                function(): JSX.Element {
                    switch(appContext.state.status) {
                        case 1:
                        return (
                            <>
                            <h1>Matching...</h1>
                            </>
                        );
                        case 0:
                        default:
                        return (
                            <>
                            <h1>name: {appContext.state.name}</h1>
                            <h1>points: {appContext.state.points}</h1>
                            <button onClick={tryMatching}>match!</button>
                            <button onClick={onLogout}>log out</button>
                            </>
                        );
                    }

                }()
            }
        </div>
    );
};

export default Dashboard;