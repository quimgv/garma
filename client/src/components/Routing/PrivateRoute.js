import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { clearAlerts } from "../../redux/actions/alert";
import { checkPendingRequests } from "../../redux/actions/requests";

// Components
import Navigation from "../Layout/Navigation/Navigation";
import Footer from "../Layout/Footer/Footer";
import SideMenu from "../Layout/SideMenu/SideMenu";
import Alert from "../Common/Alert";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  sideMenu,
  alerts,
  clearAlerts,
  checkPendingRequests,
  ...rest
}) => {
  useEffect(() => {
    if (alerts.length > 0) {
      clearAlerts();
    }
    if (user) {
      // With set time out to be able to get the authentication before requests
      setTimeout(() => {
        checkPendingRequests(user._id);
      }, 200);
    }
  }, [Component, user]);

  return (
    <div className="page-wrapper">
      <Navigation />
      <SideMenu sideMenu={sideMenu} />
      <div
        className={`main-content d-flex flex-column ${
          !sideMenu ? "" : "hide-sidemenu"
        }`}
      >
        <Alert />
        <Route
          {...rest}
          render={props =>
            !isAuthenticated && !loading ? (
              <Redirect to="/login" />
            ) : (
              <Component {...props} />
            )
          }
        />
        <Footer />
      </div>
    </div>
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  sideMenu: state.sideMenu,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { clearAlerts, checkPendingRequests }
)(PrivateRoute);
