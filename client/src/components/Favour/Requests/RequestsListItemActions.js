import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownButton, Image, Media } from "react-bootstrap";
import * as Icon from "react-feather";
import { isOwner } from "../../Favour/FavourHelpers";
import "./RequestsListItemActions.css";

// Components
import Modal from "../../Common/Modal";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../../redux/actions/modal";
import {
  acceptRequest,
  checkPendingRequests,
  declineRequest,
  getRequests
} from "../../../redux/actions/requests";
import { getCurrentFavour } from "../../../redux/actions/favour";

// User Images
import userImage from "../../../assets/img/user/undefined.gif";

const FavourItemActions = ({
  acceptRequest,
  checkPendingRequests,
  declineRequest,
  getCurrentFavour,
  getRequests,
  handleModal,
  match,
  modal,
  request,
  user
}) => {
  const [dropDownItems, setDropdownItems] = useState();

  useEffect(() => {
    if (user && request) {
      setDropdownItems(setDropdownItemsStart());
    }
  }, [user, request]);

  const checkRequestModalContent = {
    modalName: "checkRequest",
    title: request.helper.name,
    body: (
      <Media>
        <Image
          roundedCircle
          width={60}
          height={60}
          src={userImage}
          alt="User"
          thumbnail
        />
        <Media.Body className="ml-4">
          <p>{request.message}</p>
        </Media.Body>
      </Media>
    ),
    footer: false
  };

  const setDropdownItemsStart = () => {
    let dropDownItems = [];
    if (
      isOwner(request.favour.owner.user, user._id) &&
      request.status === "Pending"
    ) {
      dropDownItems.push(
        {
          label: "Accept",
          action: () => {
            acceptRequest(request._id, match.path);
          }
        },
        {
          label: "Decline",
          action: () => {
            declineRequest(request._id, match.path);
          }
        },
        {
          label: "Check request",
          action: () => {
            handleModal(checkRequestModalContent);
          }
        }
      );
    }

    return dropDownItems;
  };

  if (dropDownItems && dropDownItems.length > 0) {
    return (
      <Fragment>
        {modal.show && <Modal />}
        <DropdownButton
          drop="left"
          variant="primary"
          title={<Icon.Menu className="icon mt-minus-3" size={20} />}
          id="dropdown-button-drop-left"
          key="left"
          className="mr-2 mt-2"
        >
          {dropDownItems.map((dropDownItem, idx) => {
            return (
              <Dropdown.Item
                key={idx}
                eventKey={dropDownItem.label}
                onClick={dropDownItem.action}
              >
                {dropDownItem.label}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Fragment>
    );
  } else {
    return <div />;
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  modal: state.modal,
  requests: state.requests
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      acceptRequest,
      checkPendingRequests,
      declineRequest,
      getCurrentFavour,
      getRequests,
      handleModal
    }
  )(FavourItemActions)
);
