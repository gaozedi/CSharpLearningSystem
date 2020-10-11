import { observer } from "mobx-react-lite";
import React, {  useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { ITutorialUnit } from "../../../app/model/unit";
import UnitStore from "../../../app/stores/unitStore";

interface IProps{
  units: ITutorialUnit[];
}


const UnitsList: React.FC<IProps>= ({units}) => {
 
 
  return (
    <Segment clearing>
     
      <Item.Group divided>
        {units.map((unit) => (
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
                  content="Go!"
                  color="yellow"
                />
                {/* <Button
                  name={unit.id}
                  floated="right"
                  content="Delete"
                  color="red"
                /> */}
                <Label basic content="label content" />
              </Item.Extra>
            </Item.Content>
          </Item>
        // <h2>{unit.content}</h2>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(UnitsList);