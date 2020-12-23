import React from 'react'
import Peer from "simple-peer"


const Home = () => {



    const gotMedia = (stream) => {
        const peer1 = new Peer({ initiator: true, stream: stream })
        const peer2 = new Peer();

        peer1.on('signal', data => {
            peer2.signal(data)
        })
        peer2.on('signal', data => {
            peer1.signal(data);
        })

        peer2.on('stream', stream => {
            // here we got the remote stream;
            const video = document.querySelector('video');
            video.srcObject = stream;
            video.play();
        })
    }
    // get the user media streams
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(gotMedia)
        .catch((err) => console.error(err));







    return (
        <div>
            <h1>
                hello world
            </h1>
            <video autoPlay />
        </div>
    )
}

export default Home
