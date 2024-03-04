import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch staff data from your backend API
    // Example API call:
    // fetch('/api/staff')
    //   .then(response => response.json())
    //   .then(data => setStaffData(data));
    // For demonstration, using hardcoded data
    const hardcodedStaffData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: '********',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '********',
      },
      // Add more staff data as needed
    ];
    setStaffData(hardcodedStaffData);
  }, []);

  const handleView = (record) => {
    Modal.info({
      title: 'Staff User Details',
      content: (
        <div>
          <p>
            <strong>Name:</strong> {record.name}
          </p>
          <p>
            <strong>Email:</strong> {record.email}
          </p>
          <p>
            <strong>Password:</strong> {record.password}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = (record) => {
    // Implement delete functionality here
    console.log('Deleting staff user:', record);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: () => (
        <Button type="link">
          {' '}
          {/* Use a button instead of rendering the password directly */}
          <EyeOutlined />
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            <EyeOutlined />
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Staff List
      </Button>
      <Table dataSource={staffData} columns={columns} />
      <Modal
        title="Add Staff"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={(values) => {
            console.log('Submitted:', values);
            // Implement submit functionality here
            setVisible(false);
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffList;
