import "./App.css";
import logo from "../src/assets/logo.svg";
import Header from "./components/Header";
import Filters from "./components/Filters";
import CameraList from "./components/CameraList";
import { useState } from "react";

function App() {
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  return (
    <div className="App">
      <div>
        <img src={logo} />
      </div>
      <Header />
      <Filters
        locations={locations}
        status={status}
        selectedLocation={selectedLocation}
        selectedStatus={selectedStatus}
        setSelectedLocation={setSelectedLocation}
        setSelectedStatus={setSelectedStatus}
      />
      <CameraList
        setLocations={setLocations}
        setStatus={setStatus}
        selectedLocation={selectedLocation}
        selectedStatus={selectedStatus}
      />
    </div>
  );
}

export default App;
