import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import UnitStore from "../../../app/stores/unitStore";

const UnitsList: React.FC = () => {
  const unitStore = useContext(UnitStore);
  //insead of using activities directly, we use computed value activitiesByDate
  const { allunits } = unitStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {allunits.map((unit) => (
          <Item>
            <Item.Content>
              <Item.Header as="a">{unit.content}</Item.Header>
              <Item.Meta>date</Item.Meta>
              <Item.Description>Description</Item.Description>

              <Item.Extra>
                <Button
                  animated
                  color="blue"
                  name={unit.id}
                  as={Link}
                  to={`/tutorialunits/${unit.id}`}
                  icon="right arrow"
                  floated="right"
                >
                  <Button.Content visible>Study</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>

                <Label basic content="label content" />
                <Button
                  color="red"
                  content="Like"
                  icon="heart"
                  label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: "128",
                  }}
                  floated="right"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(UnitsList);
