import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppState } from "../types/state";
import Login from "./Login/Login";

import styles from '../styles/Container.module.css';

const Container = (): JSX.Element => {

    const appContext: AppState = useContext(AppContext);

    const onClick = (): void => {
        appContext.setLoading(!appContext.loading);
    }

    return (
        <div className={styles.container}>
            {appContext.loading ?
                <h1>It's Loading!</h1>
            :
                <Login />
            }
        </div>

    );
};

export default Container;