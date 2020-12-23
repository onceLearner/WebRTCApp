import { Router } from "@reach/router"
import Home from "./components/Home"


function App() {
  return (
    <Router>
      <Home path="/" />
    </Router>

  );
}

export default App;
