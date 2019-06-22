import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { isOwner } from "../../utils/helperFunctions";
import isEmpty from "../../validation/isEmpty";

// Redux
import { connect } from "react-redux";

const setDropdownItemsStart = (favour, userId) => {
  let dropDownItems = [];
  if (isOwner(favour.owner.user._id, userId) && favour.status === "Open") {
    dropDownItems.push(
      {
        label: "Edit",
        action: () => console.log("Edit action")
      },
      {
        label: "Delete",
        action: () => console.log("Delete action")
      }
    );
  }

  return dropDownItems;
};

const FavourItemActions = ({ favour, user }) => {
  const [dropDownItems, setDropdownItems] = useState();

  useEffect(() => {
    if (favour && user) {
      setDropdownItems(setDropdownItemsStart(favour, user._id));
    }
  }, [favour, user]);

  if (dropDownItems && dropDownItems.length > 0) {
    return (
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
              onSelect={dropDownItem.action}
            >
              {dropDownItem.label}
            </Dropdown.Item>
          );
        })}
        {console.log("Render")}
      </DropdownButton>
    );
  } else {
    return <div />;
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  favour: state.favour.favours[0]
});

export default connect(mapStateToProps)(FavourItemActions);
