import React, { useState, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import { Route, Link as RRLink } from 'react-router-dom';

const AppNavbar = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { isAuthenticated, user } = props.auth;

  const menus = [
    {
      name: 'Quản lý sản phẩm',
      to: '/products',
      exact: false
    },
    {
      name: 'Quản lý khách hàng',
      to: '/customers',
      exact: false
    },
  ]

  const MenuLink = ({ label, to, actionOnlyWhenExact }) => {
    return (
      <Route
        path={to}
        exact={actionOnlyWhenExact}
        children={
          ({ match }) => {
            return (
              <NavItem>
                <NavLink
                  to={to}
                  tag={RRLink}
                >{label}
                </NavLink>
              </NavItem>
            )
          }}
      />
    )
  }
  var showMenu = (menus) => {
    var results;
    if (menus.length > 0) {
      results = menus.map((menu, index) => {
        return (
          <MenuLink
            key={index}
            label={menu.name}
            to={menu.to}
            actionOnlyWhenExact={menu.exact}
          />
        )
      })
    }
    return results
  }
  const authLink = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>

        <Logout />
      </NavItem>
    </Fragment>
  )
  const guestLink = (
    <Fragment>
      <NavItem>
          <RegisterModal />
      </NavItem>
      <NavItem>
          <LoginModal />
      </NavItem>
    </Fragment>
  )

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand to="/" tag={RRLink}>Yến Sào ChamPa</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {showMenu(menus)}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Manage
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Product
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {isAuthenticated ? authLink : guestLink}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(AppNavbar);