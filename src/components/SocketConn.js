import React, { useState, useEffect, useRef } from 'react'
import socketIoClient from "socket.io-client";


const socketUrl = 'http://localhost:5000';



const SocketConn = () => {
    let socket = useRef(null);


    // connection effect 
    useEffect(() => {
        socket.current = socketIoClient(socketUrl, {
            autoConnect: true,
        });

        socket.current.on("connect", data => {
            console.log("=> I am conneted to the server")
        })



        // clean up function
        return () => {
            socket.current.close();

        }

    }, []);






    return (
        <div>

        </div>
    )
}

export default SocketConn
