export const isOwner = (favourOwnerId, currentUserId) => {
    if (favourOwnerId === currentUserId) {
      return true;
    }
    return false;
  };
  
  export const isHelper = (favourHelperId, currentUserId) => {
    if (favourHelperId === currentUserId) {
      return true;
    }
    return false;
  };

  export const favourStatusVariant = status => {
    switch (status) {
      case "Open":
        return "success";
      case "In progress":
        return "warning";
      default:
        return "primary";
    }
  };