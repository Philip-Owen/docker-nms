import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AddDevice from "./AddDevice";
import DeviceList from "./DeviceList";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Device List</Link>
        </li>
        <li>
          <Link to="/add-devices">Add A Device</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={DeviceList} />
        <Route exact path="/add-devices" component={AddDevice} />
      </Switch>
    </div>
  );
}

export default App;
