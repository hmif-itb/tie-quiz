import { useState, useContext, ChangeEvent, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { socket } from '../../services/socket';
import { AppContext } from '../../context/AppContext';
import styles from '../../styles/room/room.module.css';
import { ActionType } from '../../types/actions';

const Room = (): JSX.Element => {

    const duration: number = 10;

    const [inputtext, setInput] = useState<string>("");
    const [score1, setScore1] = useState<number>(0);
    const [score2, setScore2] = useState<number>(0);
    const [pointValue, setValue] = useState<number>(100);
    const [points, setPoints] = useState<string>("");
    const [answer, setAnswer] = useState<number>(-1);
    const [answerColor, setAnswerColor] = useState([styles.normal, styles.normal, styles.normal, styles.normal]);
    const appContext = useContext(AppContext);

    const now = new Date();

    const { seconds, restart } = useTimer({
        expiryTimestamp: 0,
        autoStart: false,
        onExpire: () => {
        }
    });

    useEffect(() => {
        if(appContext.state.correctAnswer !== -1) {
            if(appContext.state.correctAnswer === answer) {
                setAnswerColor(answerColor.map((item, index) => {
                    if(index === answer) {
                        return styles.correct;
                    } else {
                        return styles.normal;
                    }
                }));
                setPoints(`+${pointValue}`);
                setScore1(pointValue);
            } else {
                setAnswerColor(answerColor.map((item, index) => {
                    if(index === appContext.state.correctAnswer) {
                        return styles.correct;
                    } else if(index === answer) {
                        return styles.wrong;
                    } else {
                        return styles.normal;
                    }
                }));
            }
            appContext.dispatch({
                type: ActionType.SetPlayerState,
                payload: {
                    answer: answer,
                    points: pointValue
                }
            });
        }
    }, [appContext.state.correctAnswer]);

    useEffect(() => {
        setAnswerColor([styles.normal, styles.normal, styles.normal, styles.normal]);
        setPoints("");
    }, [appContext.state.roundNumber]);

    

    const textChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const sendMessage = () => {
        socket.emit("sendmessage", {
            roomId: appContext.state.roomId,
            message: inputtext
        });
        setInput("");
    }

    const test = () => {
        const time: Date = new Date();
        restart(time.setSeconds(time.getSeconds() + duration));
    }

    const onClickAnswer = (value: number) => {
        if(!appContext.state.answerDisabled) {
            setAnswer(value);
            socket.emit("answer", {roomId: appContext.state.roomId, answer: value, point: pointValue});
        }
    }

    return (
        <div className={styles.container}>
            
                {/* <input type="text" onChange={textChange} value={inputtext}/>
                <button onClick={sendMessage}>send</button> */}

                <div style={{ width: seconds * 10 + "%"}} className={styles.timer}></div>

                <div onClick={test} className={styles.flex}>
                    <div style={{ height: score1 + "%"}} className={styles.score1}></div>
                    <div className={styles.content}>
                        <h1 className={styles.point}>{points}</h1>
                        <h1 className={styles.question}>
                            {appContext.state.game.questions[appContext.state.roundNumber]}
                        </h1>
                        <ul className={styles.answers}>
                            {
                                appContext.state.game.answers[appContext.state.roundNumber].map((item: string, index: number) => {
                                    return <li onClick={() => onClickAnswer(index)} key={index} className={answerColor[index]}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div style={{ height: score2 + "%"}} className={styles.score2}></div>
                </div>

                
        </div>
    );
};

export default Room;