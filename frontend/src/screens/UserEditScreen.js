import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userContant";

const UserEditSceen = () => {
  const { id: userId } = useParams("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      Dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user || user._id !== userId) {
        Dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [Dispatch, userId, user, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    Dispatch(updateUser({ _id: userId, name, email }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn my-3">
        <BiArrowBack className="go_back_icon" size={20} />
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter email"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* <Form.Group controlId="isAdmin">
              <Form.Label>Password</Form.Label>
              <Form.Check
                type="checkbox"
                label={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group> */}
            <Button className="my-3" type="Submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditSceen;
