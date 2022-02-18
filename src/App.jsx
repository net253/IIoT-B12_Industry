import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "semantic-ui-css/semantic.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-circular-progressbar/dist/styles.css";

import ContentWrapper from "./components/wrapper/ContentWrapper";
import CallAPI from "./components/CallAPI";

import {
  Login,
  Overview,
  AllMachineWorkInProcess,
  Dashboard,
  MachineReport,
  // FormCountManual,
} from "./pages";

function App() {
  return (
    <>
      {/* <FormCountManual /> */}
      <CallAPI />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          path="/overview"
          component={() => <ContentWrapper content={Overview} />}
        />
        <Route
          path="/all-machine-work-in-process"
          component={() => <ContentWrapper content={AllMachineWorkInProcess} />}
        />
        <Route
          path="/dashboard"
          component={() => <ContentWrapper content={Dashboard} />}
        />
        <Route
          path="/machine-report"
          component={() => <ContentWrapper content={MachineReport} />}
        />
      </Switch>
    </>
  );
}

export default App;
