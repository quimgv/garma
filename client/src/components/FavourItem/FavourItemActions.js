import React, { Fragment, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { isOwner } from "../../utils/helperFunctions";

// Components
import CreateUpdateFavourForm from "../CreateUpdateFavourForm";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";

const FavourItemActions = ({ favour, handleModal, user }) => {
  const [dropDownItems, setDropdownItems] = useState();

  useEffect(() => {
    if (favour && user) {
      setDropdownItems(setDropdownItemsStart());
    }
  }, [favour, user]);

  const modalContent = {
    title: "Edit Favour",
    body: <CreateUpdateFavourForm action="edit" />,
    footer: false
  };

  const setDropdownItemsStart = () => {
    let dropDownItems = [];
    if (isOwner(favour.owner.user._id, user._id) && favour.status === "Open") {
      dropDownItems.push(
        {
          label: "Edit",
          action: () => handleModal(modalContent)
        },
        {
          label: "Delete",
          action: () => console.log("Delete action")
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
                onClick={() => handleModal(modalContent)}
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

export default connect(
  mapStateToProps,
  { handleModal }
)(FavourItemActions);
