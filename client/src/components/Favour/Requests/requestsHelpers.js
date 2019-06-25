export const requestStatusVariant = status => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Declined":
        return "danger";
      case "Pending":
        return "warning";
      default:
        return "primary";
    }
  };