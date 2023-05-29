import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Fetch All Product
//@route GET http://localhost:5000/api/product
//@access Public

const getProducts = AsyncHandler(async (req, res) => {
  const product = await Product.find({});
  res.json(product);
});

//@desc Fetch Single Product
//@route GET http://localhost:5000/api/product/:id
//@access Public

const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Delete a Product
//@route GET http://localhost:5000/api/products/:id
//@access Private/Admin

const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create a Product
//@route POST http://localhost:5000/api/products
//@access Private/Admin

const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

//@desc Update a Product
//@route PUT http://localhost:5000/api/products/:id
//@access Private/Admin

const updateProduct = AsyncHandler(async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

//@desc Create New Review
//@route POST http://localhost:5000/api/products/:id/reviews
//@access Private

const createProductReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
