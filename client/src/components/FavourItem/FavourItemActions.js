import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { isOwner } from "../../utils/helperFunctions";

// Components
import CreateUpdateFavourForm from "../CreateUpdateFavourForm";
import Modal from "../Common/Modal";
import RequestFavourForm from "./RequestFavourForm";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";
import { deleteFavour } from "../../redux/actions/favour";
import { takeRequestBack } from '../../redux/actions/requests';

const FavourItemActions = ({
  deleteFavour,
  favour,
  handleModal,
  history,
  modal,
  requests,
  takeRequestBack,
  user
}) => {
  const [dropDownItems, setDropdownItems] = useState();

  useEffect(() => {
    if (favour && user && requests) {
      setDropdownItems(setDropdownItemsStart());
    }
  }, [favour, user, requests]);

  const editModalContent = {
    modalName: "editFavour",
    title: "Edit Favour",
    body: <CreateUpdateFavourForm action="edit" />,
    footer: false
  };

  const deleteModalContent = {
    modalName: "deleteFavour",
    title: "Delete Favour",
    body: "Are you sure?"
  };

  const requestFavourModalContent = {
    modalName: "requestFavour",
    title: `Request "${favour.title}" Favour`,
    body: <RequestFavourForm />,
    footer: false
  };

  const takeRequestBackModalContent = {
    modalName: "requestBackFavour",
    title: `Request "${favour.title}" Favour`,
    body: "Are your sure?"
  };

  const setDropdownItemsStart = () => {
    let dropDownItems = [];
    if (isOwner(favour.owner.user._id, user._id) && favour.status === "Open") {
      dropDownItems.push(
        {
          label: "Edit",
          action: () => {
            handleModal(editModalContent);
          }
        },
        {
          label: "Delete",
          action: () => {
            handleModal(deleteModalContent);
          }
        }
      );
    }

    if (
      favour.status === "Open" &&
      !isOwner(favour.owner.user._id, user._id) &&
      !requests.isRequested
    ) {
      dropDownItems.push({
        label: "Request favour",
        action: function() {
          handleModal(requestFavourModalContent);
        }
      });
    }

    if (favour.status === "Open" && requests.isRequested && requests.myRequest.status === 'Pending') {
      dropDownItems.push({
        label: "Take request back",
        action: function() {
          handleModal(takeRequestBackModalContent);
        }
      });
    }

    return dropDownItems;
  };

  const handleConfirm = e => {
    if (modal.modalName === "deleteFavour") {
      deleteFavour(favour._id);
      handleModal();
      history.push("/favours");
    } else if (modal.modalName === "requestBackFavour") {
      console.log("REQUEST BACK");
      takeRequestBack(requests.myRequest._id)
      handleModal();
    }
  };

  if (dropDownItems && dropDownItems.length > 0) {
    return (
      <Fragment>
        {modal.show && <Modal handleConfirm={handleConfirm} />}
        <DropdownButton
          drop="right"
          variant="secondary"
          title="Actions"
          id="dropdown-button-drop-right"
          key="right"
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
  favour: state.favour.currentFavour,
  modal: state.modal,
  requests: state.requests
});

export default withRouter(
  connect(
    mapStateToProps,
    { handleModal, deleteFavour, takeRequestBack }
  )(FavourItemActions)
);
