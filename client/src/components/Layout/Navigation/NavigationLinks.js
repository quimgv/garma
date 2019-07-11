import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown, Image } from "react-bootstrap";
import * as Icon from "react-feather";

const NavigationLinks = ({ isAuthenticated, logout, user, userImage }) => {
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
          <div className="score">{user && user.score}</div>
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

export default NavigationLinks;
