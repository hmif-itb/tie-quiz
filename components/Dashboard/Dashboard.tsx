import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { socket } from '../../services/socket';
import Finish from "../Finish/Finish";
import styles from '../../styles/dashboard/dashboard.module.css';
import { ActionType } from "../../types/actions";
import Room from "../Room/Room";

const Dashboard = (): JSX.Element => {

    const appContext = useContext(AppContext);

    const SERVER_URL: string = process.env.NEXT_PUBLIC_SERVER_URL;

    

    const createRoom = (): void => {
        socket.emit("createroom", {});
    }

    const tryMatching = (): void => {
        appContext.dispatch({
            type: ActionType.SetStatus,
            payload: 1
        });
        socket.emit("startmatch", {});
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
                        case 3:
                        return (
                            <>
                            <Finish />
                            </>
                        );
                        case 2:
                        return (
                            <>
                            <Room />
                            </>
                        );
                        case 1:
                        return (
                            <>
                            <h1>Matching...</h1>
                            </>
                        );
                        case 0:
                        default:
                        return (
                            <div className={styles.flex}>
                            <h1>name: {appContext.state.name}</h1>
                            <h1>points: {appContext.state.points}</h1>
                            <button onClick={createRoom}>create room</button>
                            <button onClick={tryMatching}>match!</button>
                            

                            <div className={styles.room}>
                                <ul>
                                    <li>0xxx-24fi</li>
                                </ul>
                            </div>
                            <button onClick={onLogout}>log out</button>
                            </div>
                        );
                    }

                }()
            }
        </div>
    );
};

export default Dashboard;