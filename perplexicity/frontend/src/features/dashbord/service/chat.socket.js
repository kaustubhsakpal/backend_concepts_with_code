import { io } from "socket.io-client";


export const initializeSocketConnection = () => {

    // const socket = io("http://aws-creat-new-loadbalncer-1887930048.ap-northeast-1.elb.amazonaws.com/", {
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server")
    })

}