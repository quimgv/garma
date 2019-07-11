import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import * as Icon from 'react-feather';
import PropTypes from "prop-types";

// Components
import NavigationLinks from "./NavigationLinks";

// Logo image path
import Logo from "../../../assets/img/logo.png";
import SmallLogo from "../../../assets/img/small-logo.png";

// Redux
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { setSideMenu } from "../../../redux/actions/sideMenu";

// User Images
import userImage from "../../../assets/img/user/undefined.gif";

const Navigation = ({
  sideMenu,
  logout,
  setSideMenu,
  isAuthenticated,
  user
}) => {
  const toggleClass = () => {
    setSideMenu(!sideMenu);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="page-wrapper">
      <Navbar fixed="top" className="top-menu">
        <Link
          to="/dashboard"
          className={`navbar-brand ${sideMenu ? "navbar-logo" : ""}`}
        >
          {/* Large logo */}
          <Image src={Logo} alt="Logo" className="large-logo" />
          {/* Small logo */}
          <Image src={SmallLogo} alt="Small Logo" className="small-logo" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Burger menu */}
        {isAuthenticated && (
          <div
            className={`burger-menu ${sideMenu ? "toggle-menu" : ""}`}
            onClick={() => toggleClass()}
          >
            <span className="top-bar" />
            <span className="middle-bar" />
            <span className="bottom-bar" />
          </div>
        )}
        {/* End Burger menu */}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto right-nav">
            <NavDropdown
              title={
                <div className="count-info">
                  <Icon.Bell className="icon" />
                  <span className="ci-number">
                    <span className="ripple" />
                    <span className="ripple" />
                    <span className="ripple" />
                  </span>
                </div>
              }
              id="basic-nav-dropdown"
              className="message-box"
            >
              <NavLink to="#" className="dropdown-item">
                <div className="message-item">
                  <span className="user-pic">
                    <Image src={userImage} alt="User Image" roundedCircle />
                    <span className="profile-status online" />
                  </span>

                  <span className="chat-content">
                    <h5 className="message-title">Aaron Rossi</h5>
                    <span className="mail-desc">Just sent a new comment!</span>
                  </span>
                  <span className="time">0 seconds ago</span>
                </div>
              </NavLink>


              <Link to="/notifications/" className="dropdown-item">
                Check all notifications
                <Icon.ChevronRight className="icon" />
              </Link>
            </NavDropdown>
            <NavigationLinks
              isAuthenticated={isAuthenticated}
              logout={handleLogout}
              user={user}
              userImage={userImage}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

Navigation.propTypes = {
  setSideMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  sideMenu: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  sideMenu: state.sideMenu,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, setSideMenu }
  )(Navigation)
);
