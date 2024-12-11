const express = require('express');
// const { resolve } = require('path'); // removed @@@
const cors = require('cors'); // new added

const app = express();
const port = 3010;

// app.use(express.static('static'));//  removed @@@
app.use(cors()); // Enable CORS for all routes

//app.get('/', (req, res) => {                           //  removed @@@
//res.sendFile(resolve(__dirname, 'pages/index.html')); //  removed @@@
//});                                                  //  removed @@@

// Example route
//app.get('/', (req, res) => {
//res.send('CORS enabled for this backend!');
//});

//   serve-side-values
let taxRate = 5; //5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $

//Endpoint 1: Calculate the total price of items in the cart

function calculationCartTotal(newItemPrice, cartTotal) {
  let cartTotal1 = newItemPrice + cartTotal;
  return cartTotal1;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculationCartTotal(newItemPrice, cartTotal).toString());
  // /cart-total?newItemPrice=1200&cartTotal=0
});

//Endpoint 2 : Apply a discount based on membership status

function finalPrice(isMember, cartTotal) {
  isMember === 'true';
  if (isMember) {
    let cartTotal1 = cartTotal - (cartTotal * discountPercentage) / 100;
    return cartTotal1;
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(finalPrice(isMember, cartTotal).toString());
  //   /membership-discount?isMember=true&cartTotal=3600
});

//Endpoint 3 : Calculate tax on the cart total

function calculateTax(cartTotal) {
  let Tax = (cartTotal * taxRate) / 100;
  return Tax;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());

  // /calculate-tax?cartTotal=3600
});

//Endpoint 4 : Estimate delivery time based on shipping method

function calculateEstimatedDeliveryTime(distance, shippingMethod) {
  if (shippingMethod === 'standard') {
    let deliveryInDays = distance / 50;
    return deliveryInDays;
  } else if (shippingMethod === 'express') {
    let deliveryInDays = distance / 100;
    return deliveryInDays;
  } else {
    return 'Delivery method invalid';
  }
}
app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  res.send(calculateEstimatedDeliveryTime(distance, shippingMethod).toString());
  //   /estimate-delivery?shippingMethod=express&distance=600
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost;
}
app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  res.send(calculateShippingCost(distance, weight).toString());
  //  /shipping-cost?weight=2&distance=600
});

// Endpoint 6 : Calculate loyalty points earned from a purchase

function calculateLoyaltyPoint(purchaseAmount) {
  let loyalityPoint = purchaseAmount * loyaltyRate;
  return loyalityPoint;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoint(purchaseAmount).toString());
  //  /loyalty-points?purchaseAmount=3600
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
