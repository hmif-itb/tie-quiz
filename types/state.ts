import { Socket } from "socket.io-client";

export type AppState = {
    loggedin: boolean;
    loading: boolean;

    name: string,
    points: number,
    status: number
};