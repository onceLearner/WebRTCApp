import { Router } from "@reach/router"
import SimplePeer from "simple-peer";
import Home from "./components/Home";
import SocketConn from "./components/SocketConn"
import TEst from "./components/test"


function App() {
  return (
    <Router>
      <Home path="/" />
      <SimplePeer path="/simple" />
      <SocketConn path="/socket" />
      <TEst path="/socke" />
    </Router>

  );
}

export default App;
