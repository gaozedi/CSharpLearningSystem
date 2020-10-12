import { observer } from "mobx-react-lite";
import React, {  useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import UnitStore from "../../../app/stores/unitStore";

const UnitsList: React.FC = () => {
  const unitStore = useContext(UnitStore);
  //insead of using activities directly, we use computed value activitiesByDate
  const {allunits,title} = unitStore;
 

  return (
    <Segment clearing>
      <h1>{title}</h1>
      <Item.Group divided>
        {allunits.map((unit) => (
          <Item >
            <Item.Content>
              <Item.Header as="a">{unit.content}</Item.Header>
              <Item.Meta>date</Item.Meta>
              <Item.Description>
                Description
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={unit.id}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content="label content" />
              </Item.Extra>
            </Item.Content>
          </Item>
        
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(UnitsList);