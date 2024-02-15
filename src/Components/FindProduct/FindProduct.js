import React, { useState } from 'react';
import { Input, Card, Row, Col, Select, Divider, Typography, Pagination, Button,Breadcrumb } from 'antd';
import tops from "../../images/tops.png";
import bottoms from "../../images/bottoms.png";
import sweater from "../../images/sweater.png";
import shirt1 from "../../images/shirt1.jpg";
import shirt2 from "../../images/shirt2.jpg";
import shirt from "../../images/shirt.jpg";
import { NavLink } from 'react-router-dom';
import "./FindProduct.css";
// dfsdfasdf
const { Search } = Input;
const { Option } = Select;
const { Title, Paragraph } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;



const data = [
  'Tops',
  'Bags ',
  'Shoes ',
  'Bottoms',
  'Dresses',
  'Outer',
  'Inner ',
  
];

function FindProduct() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hovered, setHovered] = useState(false);

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
    <div >
      
      <Row gutter={[16, 1]}>  
      {/* col,row gap */}
    
        <Col span={24} >
          <label className='card_label'>Jeans Shirt</label>
        </Col>
        <Col span={12} className='card_cost' >
          <Paragraph className='card_para' >Product Cost</Paragraph>
          <Title level={4} className='card_title'  >$30.50</Title>
        </Col>
        <Col span={12} className='card_suggest_head' >
          <Paragraph className='card_suggest' >Suggest Price</Paragraph>
          <Title level={4} className='card_suggest_price' >$46.70</Title>
        </Col>
      </Row>
      <Divider className='card_divider'  />
      <div className='card_bottom'>
        <Paragraph className='card_bottom_price' >Shipping: $9.11</Paragraph>
        <Paragraph  className='card_bottom_price' >Profit: $16.20</Paragraph>
      </div>
    </div>
  );

  const handleImageHover = () => {
    setHovered(!hovered);
  };

  return (
    <div>
        <Breadcrumb className='bread_crumb' >
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>FindProduct</BreadcrumbItem>
      </Breadcrumb>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={18}>
          <Search
            placeholder="You can also paste Shewin product URL or ID here"
            allowClear
            enterButton="Search"
            size="default"
            onSearch={handleSearch}
          />
        </Col>
        <Col xs={24} sm={6} className='find_p_filter'>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
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

    
      <Row style={{ marginTop: '2%' }} gutter={16}>
       
       <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Bottoms</p>
               <img  src={bottoms} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Shoes</p>
               <img alt="example" src={sweater} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Bottoms</p>
               <img  src={bottoms} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Shoes</p>
               <img alt="example" src={tops} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Bottoms</p>
               <img alt="example" src={bottoms} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Shoes</p>
               <img alt="example" src={tops} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
       
       </Row>
       <Row style={{ marginTop: '2%' }} gutter={16}>
       
       <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Bottoms</p>
               <img  src={bottoms} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Shoes</p>
               <img alt="example" src={sweater} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Bottoms</p>
               <img  src={bottoms} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Shoes</p>
               <img alt="example" src={tops} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Bottoms</p>
               <img alt="example" src={bottoms} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className='category_card'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ margin: 0 }}>Shoes</p>
               <img alt="example" src={tops} style={{ maxWidth: '30%', marginLeft: 40 }} />
             </div>
           </Card>
         </Col>
       
       </Row>
      <Divider />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={18}>
          <Title level={2}>All Categories</Title>
        </Col>
        <Col xs={24} sm={6} className='filter_by'>
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

      <Row gutter={[16, 16]}>
        {[...Array(4)].map((_, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6}>
           <NavLink to="/product-detail">
             <Card className='product-info-list' 
              style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
              cover={
                <div
                  className="hoverable-image-container"
                  onMouseEnter={handleImageHover}
                  onMouseLeave={handleImageHover}
                >
                  <img
                    className='all-cat-image'
                    style={{ maxHeight: '250px', width: '100%' }}
                    alt="example"
                    src={hovered ? shirt1 : shirt2}
                  />
                  {/* {hovered && (
                    <div className="hover-button-container" style={{ display: 'flex', justifyContent: 'center', zIndex: '777' }} >
                      <Button ghost>
                        View Details
                      </Button>
                    </div>
                  )} */}
                </div>
              }
            >
              {renderCardBottom()}
            </Card></NavLink>
          </Col>
        ))}
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
