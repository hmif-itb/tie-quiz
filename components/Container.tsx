import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppState } from "../types/state";

const Container = (): JSX.Element => {

    const appContext: AppState = useContext(AppContext);

    const onClick = (): void => {
        appContext.setLoading(!appContext.loading);
    }

    return (
        <div>
            {appContext.loading &&
                <h1>It's Loading!</h1>
            }
            <button onClick={onClick}>click me</button>
        </div>

    );
};

export default Container;