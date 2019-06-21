import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavoursListItem = ({
  _id,
  title,
  description,
  value,
  categories,
  status
}) => {
  let statusVariant;

  switch (status) {
    case "Open":
      statusVariant = "success";
      break;
    case "In progress":
      statusVariant = "warning";
      break;
    case "Completed":
      statusVariant = "primary";
      break;
    default:
      statusVariant = "primary";
  }
  return (
    <Card className="mb-4 text-center">
      <Card.Header className="header">{title}</Card.Header>
      <Card.Body>
        <Card.Text>{description.length > 150 ? description.substring(0,150) + ' [...]' : description}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Badge pill variant={statusVariant} className="mr-2">
            {status}
          </Badge>
          <div className="score">{value}</div>
          <div>
            <Link to={`/favour/${_id}`}>See Favour -></Link>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        {categories.map((category, idx) => (
          <span key={category}>{"#" + category}</span>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default FavoursListItem;
