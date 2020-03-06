import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import AddDevice from "./AddDevice";
import DeviceList from "./DeviceList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={DeviceList} />
        <Route exact path="/add-devices" component={AddDevice} />
      </Switch>
    </div>
  );
}

export default App;
