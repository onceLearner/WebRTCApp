import React, { useState, useEffect } from 'react'
import socketIoClient from "socket.io-client";

const socket_client = socketIoClient("http://localhost:5000");
socket_client.on("connect", data => {
    console.log("I am conneted to the server")
})

socket_client.on("hello", data => {
    console.log("this data is received from the server: " + data)
})

const SocketConn = () => {
    useEffect(() => {


        return () => {
            socket_client.close()

        }
    }, [])


    return (
        <div>

        </div>
    )
}

export default SocketConn
