import "./App.css";
import logo from "../src/assets/logo.svg";
import Header from "./components/Header";
import Filters from "./components/Filters";
import CameraList from "./components/CameraList";

function App() {
  return (
    <div className="App">
      <div>
        <img src={logo} />
      </div>
      <Header />
      <Filters />
      <CameraList />
    </div>
  );
}

export default App;
