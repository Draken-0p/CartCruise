import React, { useState } from "react";
import "./highlight.css";
import Tabs from "@mui/material/Tabs";
import Rating from "../components/Rating";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  listProductDetails,
  productCreateReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import { BiArrowBack } from "react-icons/bi";
import Message from "../components/Message";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { imgArray } from "../imageArrays";
import {
  Col,
  Form,
  FormLabel,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div>{value === index && <p className="para">{children}</p>}</div>;
}

const Highlights = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const history = useNavigate();
  const { id, index } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const [img_link, setImg_link] = useState(null);

  const link = [...imgArray[index]];

  const change_img = (img) => {
    setImg_link(img);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [qnt, setqnt] = useState(0);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productCreateReview(id, { rating, comment }));
  };

  return (
    <>
      <Link to="/" className="btn my-3">
        <BiArrowBack className="go_back_icon" size={20} />
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="dange">{error}</Message>
      ) : (
        <>
          <div className="main">
            <div className="img_section">
              <div className="all_img">
                {link.map((img, i) => {
                  return (
                    <img
                      src={img}
                      alt="img"
                      key={i}
                      style={{ width: "6rem", height: "5rem" }}
                      // onClick={() => change_img(img)}
                    />
                  );
                })}
              </div>
              <div className="single_img">
                <SideBySideMagnifier
                  imageSrc={img_link ? img_link : product.image}
                  imageAlt={product.name}
                  alwaysInPlace
                  // largeImageSrc="./large-image.jpg" // Optional
                  // mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
                />
              </div>
            </div>
            <div className="dis_section">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <h1 className="heading"> {product.name}</h1>
              <span
                style={{
                  fontWeight: "600",
                  color: product.countInStock === 0 ? "red" : "",
                  textDecoration:
                    product.countInStock === 0 ? "line-through" : "",
                }}
              >
                availability (In Stock)
              </span>
              <h2 className="price">${product.price}</h2>
              <div className="tabs">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label="Specifications" />
                  <Tab label="About" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  {product.description}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Every product has its own unique features and benefits that
                  make it stand out in the market. From technology gadgets to
                  fashion accessories, each item offers something different that
                  appeals to its target audience.
                </TabPanel>
              </div>
              <div className="btn">
                <div className="qty_btn">
                  <span>Qnt</span>
                  <div
                    className="btn__s"
                    onClick={() => {
                      setqnt((pev) => {
                        if (pev > 1) return pev - 1;
                        return pev;
                      });
                    }}
                  >
                    -
                  </div>
                  <span>{qnt}</span>
                  <div
                    className="btn__s"
                    onClick={() => {
                      setqnt((pev) => pev + 1);
                    }}
                  >
                    +
                  </div>
                </div>
                <Button
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  style={{ backgroundColor: "#0a0e3c" }}
                  variant="contained"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <Row>
            <Col md={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review, index) => (
                  <ListGroupItem className="text-left" key={index}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text="" />
                    <p>{review.createdAt.substr(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <Form.Control
                          as="textarea"
                          row="3"
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                        ></Form.Control>
                      </Form.Group>
                      <Button className="my-3" type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">LogIn </Link>
                      To Write a Review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Highlights;
