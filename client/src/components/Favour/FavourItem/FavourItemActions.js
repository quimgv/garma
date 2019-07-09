import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

// Helpers
import { isOwner, isHelper } from "../FavourHelpers";

// Components
import CreateUpdateFavourForm from "../CreateUpdateFavourForm";
import Modal from "../../Common/Modal";
import RequestFavourForm from "./RequestFavourForm";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../../redux/actions/modal";
import {
  deleteFavour,
  markAsCompletedHelper,
  markAsCompletedOwner
} from "../../../redux/actions/favour";
import { takeRequestBack } from "../../../redux/actions/requests";

const FavourItemActions = ({
  deleteFavour,
  favour,
  handleModal,
  history,
  markAsCompletedHelper,
  markAsCompletedOwner,
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

  const markAsCompletedHelperModalContent = {
    modalName: "markAsCompletedHelper",
    title: `Mark as completed`,
    body: "Have you finished this favour?",
    confirmButtonText: "Yes"
  };

  const markAsCompletedOwnerModalContent = {
    modalName: "markAsCompletedOwner",
    title: `Mark as completed`,
    body: "Has the helper finished this favour?",
    confirmButtonText: "Yes"
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

    // Request favour
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

    // Take request back
    if (
      favour.status === "Open" &&
      requests.isRequested &&
      requests.myRequest.status === "Pending"
    ) {
      dropDownItems.push({
        label: "Take request back",
        action: function() {
          handleModal(takeRequestBackModalContent);
        }
      });
    }

    // Mark as completed helper
    if (
      favour.status === "In progress" &&
      isHelper(favour.helper.user && favour.helper.user._id, user._id) &&
      favour.helper.status === "In progress"
    ) {
      dropDownItems.push({
        label: "Mark as Completed",
        action: function() {
          handleModal(markAsCompletedHelperModalContent);
        }
      });
    }

    // Mark as completed owner
    if (
      favour.status === "In progress" &&
      isOwner(favour.owner.user._id, user._id) &&
      favour.helper.status !== null &&
      favour.owner.status !== null
    ) {
      dropDownItems.push({
        label: "Mark as Completed",
        action: function() {
          handleModal(markAsCompletedOwnerModalContent);
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
      takeRequestBack(requests.myRequest._id);
      handleModal();
    } else if (modal.modalName === "markAsCompletedHelper") {
      markAsCompletedHelper(favour._id);
      handleModal();
    } else if (modal.modalName === "markAsCompletedOwner") {
      console.log("Completed");
      markAsCompletedOwner(favour._id);
      handleModal();
    }
  };

  if (dropDownItems && dropDownItems.length > 0) {
    return (
      <Fragment>
        {modal.show && <Modal handleConfirm={handleConfirm} />}
        <DropdownButton
          drop="right"
          variant="primary"
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
    {
      handleModal,
      deleteFavour,
      markAsCompletedHelper,
      markAsCompletedOwner,
      takeRequestBack
    }
  )(FavourItemActions)
);
