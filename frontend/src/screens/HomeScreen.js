import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const [likedProductIds, setLikedProductIds] = useState(() => {
    const data = localStorage.getItem('likedProductIds');
    return data ? JSON.parse(data) : [];
  });

  const [likedProducts, setLikedProducts] = useState(() => {
    const data = localStorage.getItem('likedProducts');
    return data ? JSON.parse(data) : [];
  });

  const handleLikeClick = (id, product) => {

    let dataIds = localStorage.getItem('likedProductIds');
    dataIds = dataIds ? JSON.parse(dataIds) : [];

    let data = localStorage.getItem('likedProducts');
    data = data ? JSON.parse(data) : [];

    if (likedProductIds.includes(id)) {
      localStorage.setItem('likedProducts', JSON.stringify(data.filter(curr => curr._id != id)));
      localStorage.setItem('likedProductIds', JSON.stringify(dataIds.filter(curr => curr != id)));
      setLikedProductIds(likedProductIds.filter(curr => curr != id))
      setLikedProducts(data.filter(curr => curr._id != id));
    } else {
      localStorage.setItem('likedProducts', JSON.stringify([...likedProducts, product]));
      localStorage.setItem('likedProductIds', JSON.stringify([...likedProductIds, id]));
      setLikedProducts([...likedProductIds, product]);
      setLikedProductIds([...likedProductIds, id]);

    }

    // console.log(dataIds)
    console.log(data)
  }

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((element, index) => (
            <Col key={element._id} sm={12} lg={6} xl={4}>
              <Product handleLikeClick={handleLikeClick} like={likedProductIds.includes(element._id)} product={element} index={index} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
