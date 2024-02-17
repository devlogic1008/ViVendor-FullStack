import React from 'react';
import { Table, Space, Image, Button, Checkbox, Typography, Row, Col, Divider } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import shirt2 from "../../images/shirt2.jpg";
import shirt1 from "../../images/shirt1.jpg";
import "./ImportList.css"
const { Text, Title } = Typography;

const dataSource = [
  {
    key: '1',
    select: <Checkbox />,
    image: <Image src={shirt2} style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '2px' }} />,
    productName: 'Product 1',
    sku: 'SKU123',
    productCost: '$30.50',
    shippingCost: '$9.11',
    suggestedPrice: '$46.70',
    profit: '$7.09',
    comparedPrice: '$42.00',
    variants: 'Variant',
  },
  {
    key: '2',
    select: <Checkbox />,
    image: <Image src={shirt1} style={{ maxWidth: '50px', maxHeight: '50px' }} />,
    productName: 'Product 2',
    sku: 'SKU456',
    productCost: '$40.50',
    shippingCost: '$8.11',
    suggestedPrice: '$56.70',
    profit: '$16.20',
    comparedPrice: '$52.00',
    variants: 'Variant',
  },
  {
    key: '3',
    select: <Checkbox />,
    image: <Image src={shirt2} style={{ maxWidth: '50px', maxHeight: '50px' }} />,
    productName: 'Product 3',
    sku: 'SKU789',
    productCost: '$40.50',
    shippingCost: '$8.11',
    suggestedPrice: '$56.70',
    profit: '$16.20',
    comparedPrice: '$52.00',
    variants: 'Variant ',
  },

];

const columns = [
  {
    //when i click on this check box then select all the check box 
    title:  <Checkbox onChange={(e) => {
      dataSource.forEach(item => item.select = <Checkbox checked={e.target.checked} />);
    }} />,

    dataIndex: 'select',
    key: 'select',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image) => (
      <div className='flex_img' >
        {image}
      </div>
    ),
  },
  {
    title: ' Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Product Cost',
    dataIndex: 'productCost',
    key: 'productCost',
  },
  {
    title: 'Shipping Cost',
    dataIndex: 'shippingCost',
    key: 'shippingCost',
  },
  {
    title: 'Suggested Price',
    dataIndex: 'suggestedPrice',
    key: 'suggestedPrice',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: ' Compared Price',
    dataIndex: 'comparedPrice',
    key: 'comparedPrice',
  },
  {
    title: 'Variants',
    dataIndex: 'variants',
    key: 'variants',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Space>
        <EyeOutlined style={{ color: '#1890ff' }} />
        <EditOutlined style={{ color: '#52c41a' }} />
        <DeleteOutlined style={{ color: '#ff4d4f' }} />
      </Space>
    ),
  },
];

const handleAddToStore = (key) => {
 
  console.log(`Add to Store clicked for key: ${key}`);
};

const handleEdit = (key) => {

  console.log(`Edit clicked for key: ${key}`);
};

const handleDelete = (key) => {
  
  console.log(`Delete clicked for key: ${key}`);
};

const ResponsiveTable = () => {
  return (
    <>
    <div className="import-list-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 level={2}>Import List</h2>
          <Divider />
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} />
      <Row className='list_btns'>
        <Col xs={24} sm={12} className='import_all'>
          <Button  type="primary" icon={<PlusOutlined />} onClick={() => console.log('IMPORT ALL TO STORE clicked')}>
            IMPORT ALL TO STORE
          </Button>
          <Button danger  className='delete_btn' icon={<DeleteOutlined />} onClick={() => console.log('BATCH DELETION clicked')}>
            BATCH DELETION
          </Button>
        </Col>
      
      </Row>
    </div>
  </>
  );
};

export default ResponsiveTable;
