import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../../features/nav/NavBar";
import { UnitDashboard } from "../../features/Units/dashboard/UnitDashboard";
import UnitStore from "../stores/unitStore";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "./LoadingComponent";
import agent from "../api/agent";
import { ITutorialUnit } from "../model/unit";

const App = () => {
  const [units, setUnits] = useState<ITutorialUnit[]>([]);
  //const units = unitStore;
  useEffect(() => {
    agent.TutorialUnits.list()
      .then((response) => {
        let units: ITutorialUnit[] = [];
        response.forEach((activity) => {

          units.push(activity);
        });
        setUnits(units);
      })
  }, []);
  


  return (
    <Fragment>
      <NavBar />

      <Container style={{ marginTop: "7em" }}>
        
        <UnitDashboard units= {units}/>
      </Container>
    </Fragment>
  );
};

export default observer(App);
