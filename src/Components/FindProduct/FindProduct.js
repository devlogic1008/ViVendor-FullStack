import React, { useState } from 'react';
import { Input, List, Card, Row, Col, Select, Divider, Typography, Pagination } from 'antd';
import tops from "../../images/tops.jpg";
import './FindProduct.css'
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { Title, Paragraph } = Typography;
const data = [
  'Tops',
  'Bags ',
  'Shoes ',
  'Bottoms',
  'Dresses',
  'Outer',
  'Inner ',
  'Inner ',
 

  // Add more dummy data as needed
];

function FindProduct() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, selectedFilters);
  };

  const handleFilterChange = (value) => {
    setSelectedFilters(value);
    filterData(searchText, value);
  };

  const filterData = (search, filters) => {
    let filtered = data.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

    if (filters.length > 0) {
      filtered = filtered.filter((item) => filters.includes(item));
    }

    setFilteredData(filtered);
  };

  const renderCardBottom = () => (
    <div>
      <Row gutter={[16, 16]}>
      <Col span={24}>
        <p style={{ margin: 0, marginBottom: '0px' }}>Jeans Shirt</p>
      </Col>
      <Col span={12} style={{ backgroundColor: 'rgba(198,126,64,.1)', padding: '10px' }}>
        <Paragraph style={{ color: '#c67e40' }}>Product Cost</Paragraph>
        <Title level={4} style={{ color: '#c67e40', margin: 0 }}>$30.50</Title>
      </Col>
      <Col span={12} style={{ backgroundColor: 'rgba(45,148,76,.1)', padding: '10px' }}>
        <Paragraph style={{ color: '#2d944c' }}>Suggested Price</Paragraph>
        <Title level={4} style={{ color: '#2d944c', margin: 0 }}>$46.70</Title>
      </Col>
    </Row>
      <Divider style={{ margin: '8px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Paragraph style={{ marginBottom: 0 }}>Shipping: $9.11</Paragraph>
      <Paragraph style={{ marginBottom: 0 }}>Profit: $16.20</Paragraph>
    </div>
    </div>
  );

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={18}>
          <Search
            placeholder="You can also paste Shewin product Url or ID here"
            allowClear
            enterButton="Search"
            size="default"
            onSearch={handleSearch}
          />
        </Col>
        <Col xs={24} sm={6}>
          <Select
            mode="multiple"
            style={{ width: '100%', }}
            placeholder="Select filters"
            onChange={handleFilterChange}
            value={selectedFilters}
          >
            {data.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <List
        grid={{ gutter: 2, column: 4 }}
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item>
           
              <Row>
               
                <Col span={24} >
                  <img
                    src={tops} // Replace with your actual image URL
                    alt="Product Image"
                    style={{ width: '70%', height: 'auto', borderRadius:'5px', cursor:'pointer' }}
                  />
                 
                </Col>
              </Row>
           
          </List.Item>
        )}
      />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={18}>
          <Title level={2}>All Categories</Title>
        </Col>
        <Col xs={24} sm={6}>
          <Select
            style={{ width: '100%', marginTop: '30px' }}
            placeholder="Filter by"
            onChange={handleFilterChange}
          >
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <Card 
            hoverable
            cover={<img className='all-cat-image' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            {renderCardBottom()}
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            hoverable
            cover={<img className='all-cat-image' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            {renderCardBottom()}
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            hoverable
            cover={<img className='all-cat-image' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            {renderCardBottom()}
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            hoverable
            cover={<img className='all-cat-image' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            {renderCardBottom()}
          </Card>
        </Col>
      </Row>
      <Pagination
        style={{ marginTop: '16px', textAlign: 'center' }}
        current={1}
        pageSize={8}
        total={filteredData.length}
      />
    </div>
  );
}

export default FindProduct;
