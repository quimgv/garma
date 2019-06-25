import React from "react";
import { Image, Media, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RequestsListItem.css";

import { requestStatusVariant } from './requestsHelpers';

// Components
import RequestsListItemActions from './RequestsListItemActions';

// User Images
import userImage from '../../../assets/img/user/undefined.gif';

const RequestsListItem = (request) => {
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
          <h5 className="fs-14 m-0">
            <Link to="/" className="global-color">
              {request.helper.name}
            </Link>
          </h5>

          <Badge pill variant={requestStatusVariant(request.status)} className="mt-2 mr-2">
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

export default RequestsListItem;
