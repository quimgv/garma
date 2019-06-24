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
import { requestFavour } from "../../redux/actions/requests";

const FavourItemActions = ({
  deleteFavour,
  favour,
  handleModal,
  history,
  modal,
  requestFavour,
  user
}) => {
  const [dropDownItems, setDropdownItems] = useState();

  useEffect(() => {
    if (favour && user) {
      setDropdownItems(setDropdownItemsStart());
    }
  }, [favour, user]);

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
    body: <RequestFavourForm />
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
    if (favour.status === "Open" && !isOwner(favour.owner.user._id, user._id)) {
      dropDownItems.push({
        label: "Request favour",
        action: function() {
          handleModal(requestFavourModalContent);
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
  modal: state.modal
});

export default withRouter(
  connect(
    mapStateToProps,
    { handleModal, deleteFavour, requestFavour }
  )(FavourItemActions)
);
