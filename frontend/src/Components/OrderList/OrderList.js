import React, { useState } from 'react';
import { Tabs, Table, Space, Checkbox, Input, Typography } from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const data = [
  // Sample data, you can replace it with your actual data
  {
    key: '1',
    date: '2024-02-01',
    dropshipOrder: 'DSO123',
    shopifyOrder: 'SO123',
    customer: 'John Doe',
    requestFulfillment: 'Yes',
    qty: 2,
    amount: '$50.00',
    status: 'Unpaid',
    payment: 'Pending',
    shipment: 'Not Shipped',
  },
  {
    key: '2',
    date: '2024-02-02',
    dropshipOrder: 'DSO124',
    shopifyOrder: 'SO124',
    customer: 'Jane Smith',
    requestFulfillment: 'No',
    qty: 1,
    amount: '$30.00',
    status: 'Paid',
    payment: 'Completed',
    shipment: 'Shipped',
  },
  // Add more data as needed
];

const columns = [
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    render: () => <Checkbox />,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Dropship Order',
    dataIndex: 'dropshipOrder',
    key: 'dropshipOrder',
  },
  {
    title: 'Shopify Order',
    dataIndex: 'shopifyOrder',
    key: 'shopifyOrder',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Request Fulfillment',
    dataIndex: 'requestFulfillment',
    key: 'requestFulfillment',
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
  },
  {
    title: 'Shipment',
    dataIndex: 'shipment',
    key: 'shipment',
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

const TabsLayoutTable = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
        <Title style={{ marginBottom: '30px' }} level={4}>Search Orders</Title>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: '500px' }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="All" key="1">
          <Table dataSource={data} columns={columns} />
        </TabPane>
        <TabPane tab="Unpaid" key="2">
          <Table dataSource={data.filter((item) => item.status === 'Unpaid')} columns={columns} />
        </TabPane>
        <TabPane tab="Paid" key="3">
          <Table dataSource={data.filter((item) => item.status === 'Paid')} columns={columns} />
        </TabPane>
        <TabPane tab="Shipped" key="4">
          <Table dataSource={data.filter((item) => item.shipment === 'Shipped')} columns={columns} />
        </TabPane>
        <TabPane tab="Cancel" key="5">
          <Table dataSource={data.filter((item) => item.status === 'Cancel')} columns={columns} />
        </TabPane>
        <TabPane tab="Fulfilled" key="6">
          <Table dataSource={data.filter((item) => item.status === 'Fulfilled')} columns={columns} />
        </TabPane>
        <TabPane tab="Fail" key="7">
          <Table dataSource={data.filter((item) => item.status === 'Fail')} columns={columns} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default TabsLayoutTable;
