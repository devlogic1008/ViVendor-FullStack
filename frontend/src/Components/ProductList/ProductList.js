import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Select, Space, Image, Button, Checkbox, Typography } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllProductsAsync } from '../../Redux/Slices/ProductSlice'; // Import the action from your product slice
import "./ProductList.css";

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

const ResponsiveTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const dataSource = products.map((product) => ({
    key: product.id,
    select: <Checkbox />,
    image: <Image src={product.images[0]?.url} style={{ maxWidth: '70px', maxHeight: '70px' }} />, // Assuming images is an array
    title: product.title,
    sku: product.sku,
    costPrice: `$${product.costPrice}`,
    status: product.status,
  }));
  

  const columns = [
    {
      title: <Checkbox />,
      dataIndex: 'select',
      key: 'select',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Title ',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: ' Cost Price',
      dataIndex: 'costPrice',
      key: 'costPrice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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

  return (
    <div>
      <div className='search_product' >
        <h2>All Products</h2>
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
