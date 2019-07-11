import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown, Image } from "react-bootstrap";
import * as Icon from "react-feather";

// Redux
import { connect } from "react-redux";

const NavigationLinks = ({
  isAuthenticated,
  logout,
  pendingRequests,
  user,
  userImage
}) => {
  switch (isAuthenticated) {
    case null:
      return <div />;
    case false:
      return (
        <div className="qg-menu-links">
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
        </div>
      );
    default:
      return (
        <Fragment>
          <NavDropdown
            disabled={!pendingRequests}
            title={
              <div className="count-info mr-2">
                <Icon.Bell className="icon" />
                {pendingRequests && <span className="ci-number">
                  <span className="ripple" />
                  <span className="ripple" />
                  <span className="ripple" />
                </span>}
              </div>
            }
            id="basic-nav-dropdown"
            className="message-box"
          >
            <Link to="/requests/" className="dropdown-item">
              You have requests pending to respond
              <Icon.ChevronRight className="icon" />
            </Link>
          </NavDropdown>

          {user && <div className="score">{user.score}</div>}
          <NavDropdown
            title={
              <div className="menu-profile">
                <span className="name">{user && user.name}</span>
                <Image
                  src={
                    user && user.avatar
                      ? `/users/${user._id}/avatar`
                      : userImage
                  }
                  alt="Profile Image"
                  roundedCircle
                />
              </div>
            }
            id="basic-nav-dropdown"
            className="profile-nav-item"
          >
            <NavLink to="/profile/" className="dropdown-item">
              <Icon.User className="icon" />
              Profile
            </NavLink>
            <NavLink to="/profile-settings/" className="dropdown-item">
              <Icon.Settings className="icon" />
              Settings
            </NavLink>
            <NavLink exact to="/" className="dropdown-item" onClick={logout}>
              <Icon.LogOut className="icon" />
              Logout
            </NavLink>
          </NavDropdown>
        </Fragment>
      );
  }
};

const mapStateToProps = state => ({
  pendingRequests: state.requests.pendingRequests
});

export default connect(mapStateToProps)(NavigationLinks);
