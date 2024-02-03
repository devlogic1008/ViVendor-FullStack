import React from 'react';
import { Table, Input, Select, Space, Image, Button, Checkbox, Typography } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import shirt2 from "../../images/shirt2.jpg";
import shirt1 from "../../images/shirt1.jpg";

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

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
  // Add more data as needed
];

const columns = [
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Product Name',
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
    title: 'Your Compared Price',
    dataIndex: 'comparedPrice',
    key: 'comparedPrice',
  },
  {
    title: 'Inventory',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: 'Lock Inventory',
    dataIndex: 'Lock_Inventory',
    key: 'Lock_Inventory',
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <h2>Search Products</h2>
        <Input placeholder="Search" prefix={<SearchOutlined />} style={{ width: '500px' }} />
        <Select defaultValue="All" style={{ width: '200px', margin: '0 16px' }}>
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </div>

      <Table dataSource={dataSource} columns={columns} />

      <Button type="primary" style={{ marginTop: '16px' }}>
        BATCH DELETION
      </Button>
    </div>
  );
};

export default ResponsiveTable;
