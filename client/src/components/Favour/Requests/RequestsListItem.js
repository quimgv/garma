import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Image, Media, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "./RequestsListItem.css";

import { requestStatusVariant } from "./requestsHelpers";
import { isOwner } from "../FavourHelpers";

// Components
import RequestsListItemActions from "./RequestsListItemActions";

// Redux
import { connect } from "react-redux";

// User Images
import userImage from "../../../assets/img/user/undefined.gif";

const RequestsListItem = ({ match, user, ...request }) => {
  console.log(typeof request.createdAt);
  const createdAt = moment(request.createdAt).format("YYYY-MM-DD HH:MM");
  return (
    <Media className="notification-card-one d-flex align-items-center mb-4">
      <div>
        <Link to="/" className="position-relative mr-3">
          <Image
            roundedCircle
            width={40}
            height={40}
            src={userImage}
            alt="User"
            thumbnail
          />
        </Link>
      </div>

      <Media.Body className="d-flex justify-content-between">
        <div>
          {match.path === "/requests/" ? (
            <Link to={`/favour/${request.favour._id}`} className="global-color">
              <h5 className="fs-14 m-0">{request.favour.title}</h5>
            </Link>
          ) : (
            <Fragment>
              <h5 className="fs-14 m-0">{request.helper.name}</h5>
              <p>{createdAt}</p>
            </Fragment>
          )}

          {match.path === "/requests/" ? (
            isOwner(request.owner._id, user._id) ? (
              <p>{`Helper: " ${request.helper.name} - ${createdAt}`}</p>
            ) : (
              <p>{`Owner: ${request.owner.name} - ${createdAt}`}</p>
            )
          ) : (
            <div />
          )}

          <Badge
            pill
            variant={requestStatusVariant(request.status)}
            className="mt-2 mr-2"
          >
            {request.status}
          </Badge>
        </div>
        <div className="text-right ml-auto">
          <RequestsListItemActions request={request} />
        </div>
      </Media.Body>
    </Media>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(RequestsListItem));
