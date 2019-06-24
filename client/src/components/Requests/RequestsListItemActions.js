import React, { Fragment, useEffect, useState } from "react";
import { Dropdown, DropdownButton, Image, Media } from "react-bootstrap";
import * as Icon from "react-feather";
import { isOwner } from "../../utils/helperFunctions";
import "./RequestsListItemActions.css";

// Components
import Modal from "../Common/Modal";
import Loader from "../Common/Loader";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";

// User Images
import userImage from "../../assets/img/user/undefined.gif";

const FavourItemActions = ({ favour, handleModal, modal, request, user }) => {
  const [dropDownItems, setDropdownItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favour && user && request) {
      setDropdownItems(setDropdownItemsStart());
      setLoading(false);
    }
  }, [favour, user, request]);

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
          <p>
            {request.message}
          </p>
        </Media.Body>
      </Media>
    ),
    footer: false
  };

  const setDropdownItemsStart = () => {
    let dropDownItems = [];
    if (
      isOwner(favour.owner.user._id, user._id) &&
      request.status === "Pending"
    ) {
      dropDownItems.push(
        {
          label: "Accept",
          action: () => {
            console.log("ACCEPT");
          }
        },
        {
          label: "Decline",
          action: () => {
            console.log("DECLINE");
          }
        },
        {
          label: "Check request",
          action: () => {
            handleModal(checkRequestModalContent);
            console.log("CHECK");
          }
        }
      );
    }

    return dropDownItems;
  };

  if (loading) {
    return <Loader />;
  } else {
    if (dropDownItems && dropDownItems.length > 0) {
      return (
        <Fragment>
          {console.log(request)}
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
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  favour: state.favour.currentFavour,
  modal: state.modal,
  requests: state.requests
});

export default connect(
  mapStateToProps,
  { handleModal }
)(FavourItemActions);
