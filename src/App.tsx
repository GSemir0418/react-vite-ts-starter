import Router from "./router";
import { HashRouter, Link } from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Link to="/home">To Home</Link>
        <Link to="/about">To About</Link>
        <Router />
      </HashRouter>
    </div>
  );
};

export default App;
