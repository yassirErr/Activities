import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../Store/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Activities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item as={NavLink} to="/errors" name="errors" />

        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>

        <Menu.Item position="right">
          <Image src={ '/assets/user.png'} avatar spaced="right" />
          {/* user?.image || thats make error inside source */}
          <Dropdown pointing="top left">{/*$text={user!.displayName}*/}
            <Dropdown.Menu>

                <Dropdown.Item tag={Link} to={`/profile/`} text="My Profile" />{/*${user!.username}*/}
                

                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
