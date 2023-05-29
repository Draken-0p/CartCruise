import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import './product.css'


const Product = ({ product, like, index, handleLikeClick }) => {

  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card_header">
        <h3>{product.brand}</h3>
        <p>{product.name}</p>
        <span>New</span>
      </div>
      <div className="card-img">
        <img src={product.image} alt="..." />
        <i onClick={() => handleLikeClick(product._id, product)} style={{ color: like ? "#f01c41" : 'grey' }} className="fa-solid fa-heart"></i>
      </div>

      <div className="card-details">
        <div className="card_price">
          <p>Price</p>
          <strong>${product.price}</strong>
        </div>
        {/* <div className="colors">
          <div className="selected">
            <i className="bx bx-check"></i>
          </div>
          <div>
            <i className="bx bx-check"></i>
          </div>
          <div>
            <i className="bx bx-check"></i>
          </div>
        </div> */}
      </div>

      {/* <div className="card-sizes">
        <span className="selected">38</span>
        <span>39</span>
        <span>40</span>
        <span>41</span>
        <span>42</span>
        <span>43</span>
      </div> */}

      <div className="card_footer">
        <button onClick={() => {
          navigate(`./highlight/${product._id}/${index + 1}`)
        }} > Visit</button>
      </div>

    </div>
  );
};

export default Product;

{/* <Card className="my-3 p-3 rounded">
      <Link to={`./highlight/${product._id}/${index + 1}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${parseFloat(product.price).toFixed(2)}</Card.Text>
      </Card.Body>
    </Card> */}