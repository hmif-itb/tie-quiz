import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppState } from "../types/state";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import { ActionType } from "../types/actions";

import styles from '../styles/Container.module.css';

const Container = (): JSX.Element => {

    const appContext = useContext(AppContext);

    return (
        <div className={styles.container}>
            {appContext.state.loading ?
                <h1>It's Loading!</h1>
            :
                <>
                {appContext.state.loggedin ? 
                    <Dashboard />
                :
                    <Login />
                }
                </>
            }
        </div>

    );
};

export default Container;