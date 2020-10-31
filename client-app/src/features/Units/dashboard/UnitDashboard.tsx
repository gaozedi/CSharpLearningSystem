import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Grid, Icon, List,Image } from "semantic-ui-react";
import { ITutorialUnit } from "../../../app/model/unit";
import UnitsList from "./UnitsList";



//in order to use the interface above, we neet to give our component a type, then we can use props object
//in our component
export const UnitDashboard: React.FC= () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <UnitsList />
      </Grid.Column>
      <Grid.Column width={4}>
      <Card>
    <Image src='https://semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>User Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
      </Grid.Column>
    </Grid>
  );
};

export default observer(UnitDashboard);