import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
    withCredentials: true
});