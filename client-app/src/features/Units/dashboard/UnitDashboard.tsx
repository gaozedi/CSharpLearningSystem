import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, List } from "semantic-ui-react";
import { ITutorialUnit } from "../../../app/model/unit";
import UnitsList from "./UnitsList";



//in order to use the interface above, we neet to give our component a type, then we can use props object
//in our component
export const UnitDashboard: React.FC= () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <UnitsList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(UnitDashboard);