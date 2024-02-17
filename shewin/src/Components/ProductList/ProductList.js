import React from 'react';
import { Table, Input, Select, Space, Image, Button, Checkbox, Typography } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import shirt2 from "../../images/shirt2.jpg";
import shirt1 from "../../images/shirt1.jpg";
import "./ProductList.css"
const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

// console.log("This is var");
// console.log(number);
// var number=22;

// console.log("This is let");
// console.log(num);
// let num=22;

const dataSource = [
  {
    key: '1',
    select: <Checkbox />,
    image: <Image src={shirt1} style={{ maxWidth: '70px', maxHeight: '70px' }} />,
    productName: 'Product 1',
    sku: 'SKU123',
    productCost: '$30.50',
    shippingCost: '$9.11',
    suggestedPrice: '$46.70',
    profit: '$7.09',
    inventory: '245',
    Lock_Inventory: 'yes',
    comparedPrice: '$42.00',
    ActiveInShopify: 'yes',
  },
  {
    key: '2',
    select: <Checkbox />,
    image: <Image src={shirt2} style={{ maxWidth: '70px', maxHeight: '70px' }} />,
    productName: 'Product 2',
    sku: 'SKU456',
    productCost: '$40.50',
    shippingCost: '$8.11',
    suggestedPrice: '$56.70',
    profit: '$16.20',
    inventory: '245',
    Lock_Inventory: 'yes',
    comparedPrice: '$52.00',
    ActiveInShopify: 'yes',
  },
  {
    key: '3',
    select: <Checkbox />,
    image: <Image src={shirt1} style={{ maxWidth: '70px', maxHeight: '70px' }} />,
    productName: 'Product 3',
    sku: 'SKU789',
    productCost: '$50.50',
    shippingCost: '$7.11',
    suggestedPrice: '$66.70',
    profit: '$27.30',
    inventory: '245',
    Lock_Inventory: 'yes',
    comparedPrice: '$62.00',
    ActiveInShopify: 'no',
  },
];

const columns = [
  {
    title: (
      <Checkbox
        // onChange={(e) => handleSelectAll(e.target.checked)}
      />
    ),
    dataIndex: 'select',
    key: 'select',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Product ',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: ' Cost',
    dataIndex: 'productCost',
    key: 'productCost',
  },
  {
    title: 'Shipping Cost',
    dataIndex: 'shippingCost',
    key: 'shippingCost',
  },
  {
    title: ' Price',
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
    title: 'Inventory',
    dataIndex: 'inventory',
    key: 'inventory',
  },
 
  {
    title: 'Active in Shopify?',
    dataIndex: 'ActiveInShopify',
    key: 'ActiveInShopify',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Space>
        <PlusOutlined style={{ color: '#1890ff' }} />
        <EditOutlined style={{ color: '#52c41a' }} />
        <DeleteOutlined style={{ color: '#ff4d4f' }} />
      </Space>
    ),
  },
];

const ResponsiveTable = () => {
  return (
    <div>
      <div className='search_product' >
        <h2>Search Products</h2>
        <Input placeholder="Search" className='search_input' prefix={<SearchOutlined />}  />
        <Select className='select_input' defaultValue="All">
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </div>

      <Table className='product_table' dataSource={dataSource} columns={columns} />

      <Button type="primary" className='batch_btn' >
        BATCH DELETION
      </Button>
    </div>
  );
};

export default ResponsiveTable;
