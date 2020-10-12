import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';



const NavBar: React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
            CSharp Learning
        </Menu.Item>
        <Menu.Item name='Live Teaching' />
        <Menu.Item>
            <Button  color="blue" content='Code Playground' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;