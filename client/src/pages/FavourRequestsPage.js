import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";

// Compoenents
import RequestsList from "../components/Favour/Requests/RequestsList";

const FavourRequests = () => {
  const [tabActive, setTabActive] = useState("all");

  const handleOnselect = eventKey => {
    setTabActive(eventKey);
  };

  return (
    <div className="card mb-4">
      <div className="card-body requests-page">
        <div className="pill-tab">
          <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            <Nav variant="pills" className="nav-justified">
              <Nav.Item>
                <Nav.Link eventKey="all" onSelect={handleOnselect}>
                  All
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sent" onSelect={handleOnselect}>
                  Sent
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="received" onSelect={handleOnselect}>
                  Received
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey={tabActive}>
                <RequestsList requestFilter={tabActive} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default FavourRequests;
