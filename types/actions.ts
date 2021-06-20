export enum ActionType {
    SetLoading
};

export type SetLoading = {
    type: ActionType.SetLoading,
    payload: boolean
};

export type Action = SetLoading;