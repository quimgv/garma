import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";

// Components
import Loader from '../components/Common/Loader';

// Redux
import { connect } from "react-redux";

// User Images
import userImage from "../assets/img/user/undefined.gif";

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Row>
        <Col lg={12}>
          <div className="profile-header mb-4">
            <Image
              src={
                user && user.avatar ? `/users/${user._id}/avatar` : userImage
              }
              alt="Profle"
              roundedCircle
              width="70"
              height="70"
            />
            <h3 className="name mt-3">{user && user.name}</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p>{user.score} points</p>
          </div>
        </Col>
      </Row>
    );
  }
};

Profile.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
