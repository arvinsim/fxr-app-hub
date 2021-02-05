import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MicroClient from "./MicroClient";

function App() {
  return (
    <div className="App">
      <Router>
        <div>This is something that will always show up</div>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <MicroClient {...props} clientName="originate" />
            )}
          />
          <Route
            path="/originate"
            exact
            render={(props) => (
              <MicroClient {...props} clientName="originate" />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
