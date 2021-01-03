import React, { useState, useEffect, useRef } from 'react'
import Peer from 'peerjs'






const Peerjs = () => {

    const [username, setUsername] = useState('hamid')
    const [localPeer, setLocalPeer] = useState('a' + Math.floor(Math.random() * 100).toString());
    const [remotePeer, setRemotePeer] = useState('')
    const [listPeers, setListPeers] = useState([])
    const peer = useRef(new Peer());


    useEffect(() => {
        // getlistPeers();
        let remoteObj = { url: `webrtc-back1.herokuapp.com`, port: 25877 }
        let localObj = { url: `http://localhost`, port: 5000 }
        peer.current = new Peer(localPeer, {
            host: remoteObj.url,
            port: 443,
            path: "/peerjs",
            // debug: 3,

            secure: true

        })
        peer.current.on("open", id => {
            console.log(`connected to peerServer, my Id is : ${id}`)

        })


        return () => {
            peer.current.disconnect()
        }
    }, [localPeer]);

    peer.current.on('call', (call) => {
        console.log("calling from peer")
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', (remoteStream) => {
                    // Show stream in some <video> element.
                    console.log("=> stream reacieied ")
                    const video = document.querySelector('video');
                    video.srcObject = remoteStream;
                    video.play();


                });
            }).catch((err) => console.error(err));
    })


    const getlistPeers = () => {
        const local_url = `http://localhost:5000/peers`;
        const remote_url = `https://webrtc-back1.herokuapp.com/peers`
        fetch(remote_url)
            .then(res => res.json())
            .then(data => { console.log(data.allPeers); setListPeers(data.allPeers) })

    }

    const callPeer = (peerId) => {
        setLocalPeer(localPeer)
        console.log('let call him :')
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                console.log('trying to call him ................')
                const dataconn = peer.current.connect(peerId);

                console.log(dataconn)

                const call = peer.current.call(peerId, stream);


                call.on('stream', (remoteStream) => {
                    // Show stream in some <video> element.
                    const video = document.querySelector('video');
                    video.srcObject = remoteStream;
                    // Show loading animation.
                    var playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // Automatic playback started!
                            // Show playing UI.
                        })
                            .catch(error => {
                                // Auto-play was prevented
                                // Show paused UI.
                                console.error(error)
                            });
                    }

                });
            }).catch((err) => console.error(err));
    }







    return (
        <>
            <div className="p-20 shadow-md space-y-20">
                <div className="border p-10 ">
                    <p>username:  <span className="font-bold">{localPeer}</span></p>
                    <label >enter your username  </label>
                    <input onChange={evt => setUsername(evt.target.value)} className="border  p-2 m-4" />

                    <button onClick={() => { setLocalPeer(username) }} className="border text-gray-100 bg-gray-800 p-2" >update </button>

                </div>
                <div className="border p-10">
                    <div className=" mb-6 w-80 p-2 border border-gray-200 
                    ">
                        <div className="flex  gap-12">
                            <p className="text-gray-700 text-lg">list of all peers Id:</p>
                            <button onClick={() => { getlistPeers() }} className="border text-gray-100 bg-gray-800 p-2" >Refresh </button>
                        </div>
                        <ul>
                            {listPeers.map(id => {
                                return <li key={id} className="font-bold" > {id}</li>
                            })}
                        </ul>
                    </div>

                    <label >enter peer id </label>
                    <input onChange={evt => setRemotePeer(evt.target.value)} className="border  p-2 m-4" />

                    <button onClick={() => callPeer(remotePeer)} className="border text-gray-100 bg-gray-800 p-2" >call a peer</button>
                </div>

            </div>
            <video autoPlay />



        </>
    )
}

export default Peerjs
