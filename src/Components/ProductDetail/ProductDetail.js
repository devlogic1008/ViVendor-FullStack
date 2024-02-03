import React, { useState } from 'react';
import { Row, Col, Card, Carousel, Select, Button, Divider } from 'antd';
// import './ProductDetail.css';
const { Option } = Select;

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const colors = ['Red', 'Blue', 'Green'];
  const sizes = ['S', 'M', 'L', 'XL'];

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card>
            <Carousel>
              {/* Replace these image URLs with your actual product images */}
              <div>
                <img alt="Product Image" src="https://placekitten.com/800/400" />
              </div>
              <div>
                <img alt="Product Image" src="https://placekitten.com/800/401" />
              </div>
              {/* Add more images as needed */}
            </Carousel>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <h2>Product Name</h2>
            <p>Product Description goes here.</p>
            <Divider />

            <div className="select-options">
              <h3>Select Color:</h3>
              <Select
                placeholder="Select color"
                onChange={handleColorChange}
                value={selectedColor}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                {colors.map((color) => (
                  <Option key={color} value={color}>
                    {color}
                  </Option>
                ))}
              </Select>

              <h3>Select Size:</h3>
              <Select
                placeholder="Select size"
                onChange={handleSizeChange}
                value={selectedSize}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                {sizes.map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>

              <Button type="primary" size="large" block>
                Add to Cart
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
