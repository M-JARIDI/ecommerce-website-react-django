import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
// import { saveShippingAddress } from "../actions/cartActions";

export default function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((sum, cartItem) => sum + cartItem.price * cartItem.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrder = () => {
    console.log("object");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <storng>Shipping :</storng> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {"   "}
                {cart.shippingAddress.postalCode}, {"   "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <storng>Method :</storng> {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((cartItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${cartItem.product}`}>
                            {cartItem.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {cartItem.qty} X ${cartItem.price} = $
                          {(cartItem.qty * cartItem.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items : </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping : </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax : </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total : </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
