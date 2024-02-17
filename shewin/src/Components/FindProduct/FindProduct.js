import React, { useState } from 'react';
import { Input, Card, Row, Col, Select, Divider, Typography, Pagination, Button,Breadcrumb } from 'antd';
import tops from "../../images/tops.png";
import bottoms from "../../images/bottoms.png";
import sweater from "../../images/sweater.png";
import shirt1 from "../../images/shirt1.jpg";
import shirt2 from "../../images/shirt2.jpg";
import shirt3 from "../../images/shirt3.jpg";
import shirt4 from "../../images/shirt4.jpg";
import shirt5 from "../../images/shirt5.jpg";
import shirt6 from "../../images/shirt6.jpg";
import shirt7 from "../../images/shirt7.jpg";
import shirt8 from "../../images/shirt8.jpg";
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

  const handleImageHover = (index) => {
    setHovered((prevHovered) => ({ ...prevHovered, [index]: !prevHovered[index] }));
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

  
      <Row className='category_row' gutter={16}>
       
       <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Bottoms</p>
               <img className='category_card_img'  src={bottoms}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Sweater</p>
               <img className='category_card_img'  src={tops}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Tops</p>
               <img className='category_card_img'  src={bottoms}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Bottoms</p>
               <img className='category_card_img'  src={tops}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Sweater</p>
               <img className='category_card_img'  src={bottoms}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Tops</p>
               <img className='category_card_img'  src={tops}  />
             </div>
           </Card>
         </Col>

       
       </Row>
       <Row className='category_row' gutter={16}>
       
       <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Bottoms</p>
               <img className='category_card_img'  src={bottoms}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Sweater</p>
               <img className='category_card_img'  src={tops}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Tops</p>
               <img className='category_card_img'  src={bottoms}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Bottoms</p>
               <img className='category_card_img'  src={tops}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Sweater</p>
               <img className='category_card_img'  src={bottoms}  />
             </div>
           </Card>
         </Col>
         <Col span={4} xs={24} sm={12} md={8} lg={4}>
           <Card  className='category_card'>
             <div className='category_card_head' >
               <p className='category_card_bottom' >Tops</p>
               <img className='category_card_img'  src={tops}  />
             </div>
           </Card>
         </Col>

       
       </Row>
       
    
      
      <Divider />

      <Row gutter={[16, 1]}>
        <Col xs={24} sm={18}>
        <h2 className='all_products' >
  All Products
</h2>
        </Col>
        <Col xs={24} sm={6} className='filter_by'>
          <Select
          className='select_category'
          
            placeholder="Filter by"
            onChange={handleFilterChange}
          >
            <Option value="1">Jeans</Option>
            <Option value="2">Shorts</Option>
            <Option value="3">Tops</Option>
          </Select>
        </Col>
       
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <NavLink to="/product-detail">
            <Card
              className={`product-info-list ${hovered[0] ? 'hovered' : ''}`}
              onMouseEnter={() => handleImageHover(0)}
              onMouseLeave={() => handleImageHover(0)}
              cover={
                <div className="hoverable-image-container">
                  <img
                    className='all-cat-image'
                    alt="shirt1"
                    src={hovered[0] ? shirt6 : shirt5}
                  />
                </div>
              }
            >
              {renderCardBottom()}
            </Card>
          </NavLink>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <NavLink to="/product-detail">
            <Card
              className={`product-info-list ${hovered[1] ? 'hovered' : ''}`}
              onMouseEnter={() => handleImageHover(1)}
              onMouseLeave={() => handleImageHover(1)}
              cover={
                <div className="hoverable-image-container">
                  <img
                    className='all-cat-image'
                    alt="shirt2"
                    src={hovered[1] ? shirt7 : shirt8}
                  />
                </div>
              }
            >
              {renderCardBottom()}
            </Card>
          </NavLink>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <NavLink to="/product-detail">
            <Card
              className={`product-info-list ${hovered[2] ? 'hovered' : ''}`}
              onMouseEnter={() => handleImageHover(2)}
              onMouseLeave={() => handleImageHover(2)}
              cover={
                <div className="hoverable-image-container">
                  <img
                    className='all-cat-image'
                    alt="shirt3"
                    src={hovered[2] ? shirt1 : shirt2}
                  />
                </div>
              }
            >
              {renderCardBottom()}
            </Card>
          </NavLink>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <NavLink to="/product-detail">
            <Card
              className={`product-info-list ${hovered[3] ? 'hovered' : ''}`}
              onMouseEnter={() => handleImageHover(3)}
              onMouseLeave={() => handleImageHover(3)}
              cover={
                <div className="hoverable-image-container">
                  <img
                    className='all-cat-image'
                    alt="shirt4"
                    src={hovered[3] ? shirt1 : shirt2}
                  />
                </div>
              }
            >
              {renderCardBottom()}
            </Card>
          </NavLink>
        </Col>
      </Row>

      <Pagination
      className='pagination'
       
        current={1}
        pageSize={8}
        total={filteredData.length}
      />
    </div>
  );
}



export default FindProduct;
