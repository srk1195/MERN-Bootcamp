/* eslint-disable implicit-arrow-linebreak */
const {
  Order: OrderModel,
  ProductCart: ProductCartModel,
} = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
  OrderModel.findById(id)
    .populate('products.product', 'name price') // Comeback here!
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: 'No order found in DB!',
        });
      }

      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;

  const freshOrder = new OrderModel(req.body.order);
  freshOrder.save((err, order) => {
    if (err || !order) {
      return res.status(400).json({
        error: 'Failed to create an order in DB!',
      });
    }

    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  OrderModel.find()
    .populate('user', '_id name')
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: 'Unable to list all the orders!',
        });
      }

      return res.json(orders);
    });
};

exports.getOrderStatus = (req, res) =>
  res.json(OrderModel.schema.path('status').enumValues);

exports.updateStatus = (req, res) => {
  OrderModel.update(
    { _id: req.body.orderId }, // Come backhere!
    { $set: req.body.order.status }
  ).exec((err, order) => {
    if (err || !order) {
      return res.status(400).json({
        error: 'Unable to change the status of the order ',
      });
    }

    return res.json(order);
  });
};

// req.body.order is set by front-end or what?
