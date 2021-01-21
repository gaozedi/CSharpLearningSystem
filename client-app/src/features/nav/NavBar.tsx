import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container,Image, Dropdown } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header  as= {NavLink} to="/" >
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
            CSharp Learning
        </Menu.Item>
        <Menu.Item name='Live Teaching' />
        <Menu.Item name='Code PlayGround'/>
        {user ? (
          <Menu.Item position="right">
            {/* <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            /> */}
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item text="Logout" onClick={logout} icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ):(<Menu.Item position='right'>
                <Dropdown.Item
                  as={Link}
                  to={`/login`}
                  text="Login"
                  icon="user"
                />
        </Menu.Item>)}
      </Container>
    </Menu>
  );
};

export default NavBar;