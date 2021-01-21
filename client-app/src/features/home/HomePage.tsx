import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";

const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Visual C#
        </Header>
        <Header as="h2" inverted content="# pronounced as 'sharp', obviuosly" />
        <Button as={Link} to="/tutorialUnits" size="huge" inverted >
          Begin My Journey
        </Button>
      </Container>
    </Segment>
  );
};
export default HomePage;
