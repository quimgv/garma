import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import * as Icon from "react-feather";
import "./SideMenu.css";

const SideMenu = ({ sideMenu }) => {
  return (
    <div
      className={`sidemenu-area sidemenu-light ${
        sideMenu ? "sidemenu-toggle" : ""
      }`}
    >
      <Navbar className={`sidemenu ${sideMenu ? "hide-nav-title" : ""}`}>
        <Navbar.Collapse>
          <Nav>
            <NavLink to="/dashboard/" className="nav-link">
              <Icon.ChevronRight className="icon" />
              <span className="title">Dashboard</span>
            </NavLink>
            <NavLink to="/favours/" className="nav-link">
              <Icon.ChevronRight className="icon" />
              <span className="title">Favours</span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(SideMenu);
