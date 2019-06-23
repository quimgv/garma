import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownButton } from "react-bootstrap";
import { isOwner } from "../../utils/helperFunctions";

// Components
import CreateUpdateFavourForm from "../CreateUpdateFavourForm";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";
import { deleteFavour } from '../../redux/actions/favour';

const FavourItemActions = ({ deleteFavour, favour, handleModal, history, user }) => {
  const [dropDownItems, setDropdownItems] = useState();

  useEffect(() => {
    if (favour && user) {
      setDropdownItems(setDropdownItemsStart());
    }
  }, [favour, user]);

  const editModalContent = {
    title: "Edit Favour",
    body: <CreateUpdateFavourForm action="edit" />,
    footer: false
  };

  const deleteModalContent = {
    title: "Delete Favour",
    body: 'Are you sure?',
    handleConfirm: () => {
      deleteFavour(favour._id);
      handleModal();
      history.push('/favours');
    }
  };

  const setDropdownItemsStart = () => {
    let dropDownItems = [];
    if (isOwner(favour.owner.user._id, user._id) && favour.status === "Open") {
      dropDownItems.push(
        {
          label: "Edit",
          action: () => handleModal(editModalContent)
        },
        {
          label: "Delete",
          action: () => handleModal(deleteModalContent)
        }
      );
    }

    return dropDownItems;
  };

  if (dropDownItems && dropDownItems.length > 0) {
    return (
      <Fragment>
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
  favour: state.favour.currentFavour
});

export default withRouter(connect(
  mapStateToProps,
  { handleModal, deleteFavour }
)(FavourItemActions));
