import AsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc Create New Order
//@route POST http://localhost:5000/api/orders
//@access Private

const addOrderItems = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).send({ message: "No Order Items" });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc Get order by ID
//@route GET http://localhost:5000/api/orders
//@access Private

const getOrderById = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

//@desc Update order to paid
//@route GET http://localhost:5000/api/orders/:id/pay
//@access Private

const updateOrdertoPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

//@desc Get logged-in user order
//@route GET http://localhost:5000/api/orders/myorders
//@access Private

const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//@desc Get all orders
//@route GET http://localhost:5000/api/orders/
//@access Private/Admin

const getOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

//@desc Update order to Delivered
//@route PUT http://localhost:5000/api/orders/:id/delivered
//@access Private/Admin

const updateOrdertoDelivered = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  getMyOrders,
  getOrders,
  updateOrdertoDelivered,
};
