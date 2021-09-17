import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
