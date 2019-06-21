import React from "react";
import * as Icon from "react-feather";
import { Button } from "react-bootstrap";
import './Pagination.css';

const Pagination = ({ onClick, skip, limit, favoursPerPage, favoursCount }) => {
  return (
    <div className="d-flex justify-content-between pagination">
      {skip !== 0 ? (
        <Button
          value="back"
          variant="outline-primary"
          size="xs"
          className="mt-2 mr-2 rounded-pill"
          onClick={e => onClick(e)}
        >
          <Icon.ArrowLeftCircle className="icon" />
        </Button>
      ) : (
        <div />
      )}
      {skip + favoursPerPage < favoursCount && (
        <Button
          value="next"
          variant="outline-primary"
          size="xs"
          className="mt-2 mr-2 rounded-pill"
          onClick={e => onClick(e)}
        >
          <Icon.ArrowRightCircle className="icon" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
