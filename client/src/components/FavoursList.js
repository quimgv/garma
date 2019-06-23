import React, { Fragment, useEffect, useState } from "react";

// Components
import FavoursListItem from "./FavoursListItem";
import Loader from "../components/Common/Loader";
import Pagination from "../components/Common/Pagination";

// Redux
import { connect } from "react-redux";
import { getFavours } from "../redux/actions/favour";

const FavoursList = ({ getFavours, favours, favoursCount, favoursLoading }) => {
  const favoursPerPage = 2;

  const [limit, setLimit] = useState(favoursPerPage);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getFavours(null, limit, skip);
  }, [limit, skip]);

  const onClickPagination = e => {
    if (e.currentTarget.value === "back") {
      setSkip(skip - favoursPerPage);
    } else if (e.currentTarget.value === "next") {
      setSkip(skip + favoursPerPage);
    }
  };

  if (favoursLoading) {
    return <Loader position />;
  } else if (favours && favours !== null && favours.length !== 0) {
    return (
      <Fragment>
        <Pagination
          skip={skip}
          limit={limit}
          favoursPerPage={favoursPerPage}
          favoursCount={favoursCount}
          onClick={onClickPagination}
        />
        {favours.map(favour => (
          <FavoursListItem key={favour._id} {...favour} />
        ))}
      </Fragment>
    );
  } else {
    return "There are not favours...";
  }
};

const mapStateToProps = state => ({
  favours: state.favour.favours,
  favoursCount: state.favour.favoursCount,
  favoursLoading: state.favour.loading
});

export default connect(
  mapStateToProps,
  { getFavours }
)(FavoursList);
