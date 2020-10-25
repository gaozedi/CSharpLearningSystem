import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../../features/nav/NavBar";
import { UnitDashboard } from "../../features/Units/dashboard/UnitDashboard";
import UnitStore from "../stores/unitStore";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "./LoadingComponent";
import { ITutorialUnit } from "../model/unit";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import UnitDetails from "../../features/Units/details/UnitDetails";
import MyCompiler from "../../features/compiler/MyCompiler";

const App = () => {
  const [units, setUnits] = useState<ITutorialUnit[]>([]);
  const store = useContext(UnitStore);

  useEffect(() => {
    store.loadUnits();
  }, [store]);

  const handleCompile = (code:string)=>{
    store.compileCode(code);
  }

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      {/* when we are hitting the route with / and anything else, then the route matches*/}
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/tutorialunits" component={UnitDashboard} />
              {/* <Route path="/activities/:id" component={ActivityDetails} /> */}
              {/* whenever the location key changes which it dose when we navigate to create actvity 
        this component will rerender*/}
              <Route path="/tutorialunits/:id" component={UnitDetails} />
              {/* <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              /> */}
               <Route path="/compiler" component={MyCompiler} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
