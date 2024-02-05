import React, { useEffect } from 'react';
import { Tabs, Table, Button, Divider } from 'antd';
import "./ProductDetail.css";

import pic1 from "../../images/pic1.jpg";
import pic2 from "../../images/pic2.jpg";
import pic3 from "../../images/pic3.jpg";
import pic4 from "../../images/pic4.jpg";

const { TabPane } = Tabs;

export default function ProductDetail() {
  useEffect(() => {
    const featuredImg = document.getElementById('featured-image');
    const smallImgs = document.getElementsByClassName('small-Img');

    const handleThumbnailClick = (url, index) => {
      featuredImg.src = url;

      // Remove 'sm-card' class from all small images
      for (let i = 0; i < smallImgs.length; i++) {
        smallImgs[i].classList.remove('sm-card');
      }

      // Add 'sm-card' class to the clicked small image
      smallImgs[index].classList.add('sm-card');
    };

    // Add event listeners to each small image
    for (let i = 0; i < smallImgs.length; i++) {
      smallImgs[i].addEventListener('click', () => handleThumbnailClick(smallImgs[i].src, i));
    }

    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      for (let i = 0; i < smallImgs.length; i++) {
        smallImgs[i].removeEventListener('click', () => handleThumbnailClick(smallImgs[i].src, i));
      }
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const sizeChartColumns = [
    { title: 'Sizes', dataIndex: 'Sizes', key: 'Sizes' },
    { title: 'Bust', dataIndex: 'Bust', key: 'Bust' },
    { title: 'Hem_Width', dataIndex: 'Hem_Width', key: 'Hem_Width' },
    { title: 'Shoulder', dataIndex: 'Shoulder', key: 'Shoulder' },
    { title: 'Sleeve_Length', dataIndex: 'Sleeve_Length', key: 'Sleeve_Length' },
    { title: 'Length', dataIndex: 'Length', key: 'Length' },
  ];

  const sizeChartData = [
    { Sizes: 'S', Bust: '82', Hem_Width: '90', Shoulder: '37', Sleeve_Length: '58', Length: '62' },
    { Sizes: 'M', Bust: '86', Hem_Width: '94', Shoulder: '38', Sleeve_Length: '59', Length: '63' },
    { Sizes: 'L', Bust: '90', Hem_Width: '98', Shoulder: '39', Sleeve_Length: '60', Length: '64' },
    { Sizes: 'L', Bust: '90', Hem_Width: '98', Shoulder: '39', Sleeve_Length: '60', Length: '64' },
    { Sizes: 'L', Bust: '90', Hem_Width: '98', Shoulder: '39', Sleeve_Length: '60', Length: '64' },
    { Sizes: 'L', Bust: '90', Hem_Width: '98', Shoulder: '39', Sleeve_Length: '60', Length: '64' },
    // Add more rows as needed
  ];

  const descriptionData = [
    { label: 'Item No', value: 'LC2724596-P1010' },
    { label: 'Tag', value: 'Light Pink Valentines Day Heart Jacquard Knit Sweater' },
    { label: 'Category', value: 'Knit Sweater' },
    { label: 'Color', value: 'Light Pink' },
    { label: 'Sleeve Length', value: 'Long Sleeve' },
    { label: 'Occasion', value: 'Casual' },
    { label: 'Material', value: '30% Polyester + 42% Acrylic + 28% Nylon' },
    { label: 'Product Weight', value: '0.4980 kg' },
    { label: 'Brand', value: 'LEVI\'S' },
    { label: 'Creation Time', value: '2022-02-06' },
    { label: 'Style', value: 'Heart Jacquard' },
    { label: 'Neckline', value: 'Round Neck' },
    { label: 'Silhouette', value: 'Loose' },
  ];

  return (
    <>
      <section className="product-container">
        <div className="img-card">
          <img src={pic1} alt="featured" id="featured-image" />
          <div className="small-Card">
            <img src={pic4} alt="small-1" className="small-Img" />
            <img src={pic2} alt="small-2" className="small-Img" />
            <img src={pic4} alt="small-3" className="small-Img" />
            <img src={pic2} alt="small-4" className="small-Img" />
          </div>
        </div>
        {/* Right side */}
        <div className="product-info">
          <h3>Light Pink Valentines Day Heart Jacquard Knit Sweater</h3>
          <p>Item NO.: LC2724596-P1010</p>
          <h5> $140 </h5>
          <div className='p_detail'>
            <p>MATERIAL & WEIGHT</p>
            <p>Product Weight: 0.4980 kg</p>
            <p>Material: 30%Polyester+42%Acrylic+28%Nylon</p>
          </div>
          <div>
            <p className='colorr' style={{fontWeight:700, marginTop:'2%'}}>Color:Light Pink</p>
           
          </div>
          <div className="sizes " >
            <h5 style={{marginTop:'2%'}}>Size:</h5>
            <div className='p_size'>
              <p className='p_sizes'>(US 4-6)S</p>
              <p className='p_sizes'>(US 4-6)S</p>
              <p className='p_sizes'>(US 4-6)S</p>
              <p className='p_sizes'>(US 4-6)S</p>
            </div>
          </div>
          <div className="quantity">
            <Button type='primary' style={{width:'40%' , height:'50px',marginTop:'5%'}}>IMPORTED</Button>
          </div>
        </div>
      </section>
      <Divider />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Size Chart " key="1">
          <h4>Size Chart (CM)</h4>
          <Table bordered columns={sizeChartColumns} dataSource={sizeChartData} pagination={false} />
          <h4 style={{marginTop:'5%'}}> Size Chart (INCH)</h4>
          <Table bordered columns={sizeChartColumns} dataSource={sizeChartData} pagination={false} />

        </TabPane>
      
        <TabPane tab="Description" key="2">
          <Table bordered
            dataSource={descriptionData}
            columns={[
              { title: 'Label', dataIndex: 'label', key: 'label' },
              { title: 'Value', dataIndex: 'value', key: 'value' },
            ]}
            pagination={false}
          />
        </TabPane>
      </Tabs>
      <div className='notes'
      >
        <h4>Note:</h4>
        <p>1.There maybe 1-2 cm deviation in different sizes, locations and stretch of fabrics. Size chart is for reference only, there may be a little difference with what you get.</p>
        <p>2.There are 3 kinds of elasticity: High Elasticity (two-sided stretched), Medium Elasticity (one-sided stretched) and Nonelastic (can not stretched ).</p>
        <p>3.Color may be lighter or darker due to the different PC display.</p>
        <p>4.Wash it by hand in 30-degree water, hang to dry in shade, prohibit bleaching.</p>
        <p>5.There maybe a slightly difference on detail and pattern.</p>
      </div>
    </>
  );
}
