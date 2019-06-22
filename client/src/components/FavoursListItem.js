import React from "react";
import { Badge, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { favourStatusVariant } from '../utils/helperFunctions';

const FavoursListItem = ({
  _id,
  title,
  description,
  value,
  categories,
  status
}) => {
  
  return (
    <Card className="mb-4 text-center">
      <Card.Header className="header">{title}</Card.Header>
      <Card.Body>
      <Container>
      <Card.Text>{description.length > 150 ? description.substring(0,150) + ' [...]' : description}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Badge pill variant={favourStatusVariant(status)} className="mr-2">
            {status}
          </Badge>
          <div className="score">{value}</div>
          <div>
            <Link to={`/favour/${_id}`}>See Favour -></Link>
          </div>
        </div>
      </Container>
        
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
