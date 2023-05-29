import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SideBySideMagnifier } from "react-image-magnifiers";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductDetails,
  productCreateReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi'

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const history = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

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
    // console.log(rating, comment);
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
          <Row>
            <Col md={6}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
              <SideBySideMagnifier
                imageSrc={product.image}
                imageAlt={product.name}
                alwaysInPlace
              // largeImageSrc="./large-image.jpg" // Optional
              // mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : ₹{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description :{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col> Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status : </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className="justify-content-center">
                        <Col>Qty : </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
                        <FormControl
                          as="textarea"
                          row="3"
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                        ></FormControl>
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

export default ProductScreen;
