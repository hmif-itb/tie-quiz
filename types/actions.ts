import { AppState } from "./state";

export enum ActionType {
    SetLoading,
    SetLogin,
    SetName,
    SetPoints,
    SetStatus,
    SetRoom,
    SetRoundNumber,
    SetGame,
    SetPlayerState,
    SetAnswerButton,
    SetCorrectAnswer,
    SetGameFinished
};

export type SetLoading = {
    type: ActionType.SetLoading,
    payload: boolean
};

export type SetLogin = {
    type: ActionType.SetLogin,
    payload: boolean
};

export type SetName = {
    type: ActionType.SetName,
    payload: string
};

export type SetPoints = {
    type: ActionType.SetPoints,
    payload: number
};

export type SetStatus = {
    type: ActionType.SetStatus,
    payload: number
};

export type SetRoom = {
    type: ActionType.SetRoom,
    payload: string
};

export type SetRoundNumber = {
    type: ActionType.SetRoundNumber,
    payload: number
};

export type SetGame = {
    type: ActionType.SetGame,
    payload: AppState["game"]
};

export type SetPlayerState = {
    type: ActionType.SetPlayerState,
    payload: {
        answer: number,
        points: number
    }
};

export type SetAnswerButton = {
    type: ActionType.SetAnswerButton,
    payload: boolean
};

export type SetCorrectAnswer = {
    type: ActionType.SetCorrectAnswer,
    payload: number
};

export type SetGameFinished = {
    type: ActionType.SetGameFinished,
    payload: AppState["gameFinished"]
};

export type Action = SetLoading | SetLogin | SetName | SetPoints | SetStatus | SetRoom | SetGame | SetRoundNumber | SetGame | SetPlayerState | SetAnswerButton | SetCorrectAnswer | SetGameFinished;