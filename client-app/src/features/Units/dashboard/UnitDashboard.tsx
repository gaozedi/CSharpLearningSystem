import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  Button,
  Card,
  Container,
  Feed,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Reveal,
  Segment,
} from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoginForm from "../../user/LoginForm";
import UnitsList from "./UnitsList";

//in order to use the interface above, we neet to give our component a type, then we can use props object
//in our component
export const UnitDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment style={{ padding: "3em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Help You Progreee
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  By using the technologies of ReactJS, .NET Core, AI and
                  Machine Learning, Cloud and Container, We can give you
                  superpower to learn C#
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams, but
                  even bananas can be bioengineered.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={4}>
                <Card>
                  <Image
                    src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>Leslie Gao</Card.Header>
                    <Card.Meta>
                      <span className="date">Content creater</span>
                    </Card.Meta>
                    <Card.Description>
                      Leslie is a developer with hundreds of years experience.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a href="/">
                      <Icon name="user" />
                      0 People liked
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column floated="right" width={4}>
                <Card>
                  <Image
                    src="https://semantic-ui.com/images/avatar2/large/matthew.png"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>Dr. George Pissanidis</Card.Header>
                    <Card.Meta>
                      <span className="date">Supervisor</span>
                    </Card.Meta>
                    <Card.Description>
                      Dr George is a developer with <strong>millions</strong> of
                      years experience.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a href="/">
                      <Icon name="user" />
                      0 People liked
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge">Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>

      <Grid.Row centered>
        {user ? (
          <Grid.Column width={16}>
            <UnitsList />
          </Grid.Column>
        ) : (
          <Grid.Column width={16}>
            <Reveal animated="move right">
              <Reveal.Content visible>
                {/* <Image src='/assets/head.jpg'/> */}
                <Card fluid>
                  <Image src="/assets/blue.png" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header textAlign="center">Join Us Now!</Card.Header>
                    <Message floating icon>
                      <Icon name="circle notched" loading />
                      <Message.Content>
                        <Message.Header>API Is Avaliable Now</Message.Header>
                        <p>
                        To ensure user experience, only limited user allow accessing AI API and Video Streaming API. 
                        <br/>
                        (Maybe we can ask for some money because of this in real scenario)
                        </p>
                      </Message.Content>
                    </Message>
                    <br/>
                    <Card.Meta textAlign="right">Current Online Users:1</Card.Meta>
                    
                    {/* <Card.Description textAlign="right">
                      1
                    </Card.Description> */}
               
                    {/* <a>
                      <Icon name="user" />
                      10 Friends
                    </a> */}

                  </Card.Content>
                </Card>
              </Reveal.Content>
              <Reveal.Content hidden>
                <LoginForm />
              </Reveal.Content>
            </Reveal>
          </Grid.Column>
        )}
      </Grid.Row>

      {/* <Grid.Column width={4}>
      
      </Grid.Column> */}
    </Grid>
  );
};

export default observer(UnitDashboard);
