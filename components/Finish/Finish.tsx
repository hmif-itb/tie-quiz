import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ActionType } from "../../types/actions";

const Finish = (): JSX.Element => {

    const appContext = useContext(AppContext);

    let text: string = "";
    if(appContext.state.gameFinished.status === "tie") {
        text = "You tied with your opponent!";
    } else if(appContext.state.gameFinished.status === "win") {
        text = "you win!";
    } else {
        text = "you lose!";
    }

    const goBack = (): void => {
        appContext.dispatch({
            type: ActionType.SetStatus,
            payload: 0
        });
    }

    return (
        <div>
            <h1>{text}</h1>
            <h2>points: {appContext.state.gameFinished.point}</h2>
            <button onClick={goBack}>go back</button>
        </div>
    )
};

export default Finish;