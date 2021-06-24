export enum ActionType {
    SetLoading,
    SetLogin,
    SetName,
    SetPoints,
    SetStatus
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
}

export type Action = SetLoading | SetLogin | SetName | SetPoints | SetStatus;