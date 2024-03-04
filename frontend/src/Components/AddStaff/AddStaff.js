import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';

import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './AddStaff.css';

const AddStaff = () => {
  const [permissions, setPermissions] = useState([]);

  // Simulated initial permissions (replace with your actual data)
  const initialPermissions = [
    { id: 1, name: 'Permission 1' },
    { id: 2, name: 'Permission 2' },
    { id: 3, name: 'Permission 3' },
    { id: 4, name: 'Permission 4' },

    // Add more initial permissions as needed
  ];

  useEffect(() => {
    // Fetch permissions from your backend API or set initial permissions
    // For demonstration, using initialPermissions as hardcoded data
    setPermissions(initialPermissions);
  }, []);

  return (
    <div className="form-container">
      <h2 className="form-heading">Add Staff List</h2>
      <Form name="staff-form" initialValues={{ remember: true }}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the user's name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input the user's email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input the user's password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
        </div>
        {/* permission for new user  */}
        <div className="input-container">
          <label>Permissions</label>
          <Form.Item
            name="permissions"
            valuePropName="checked"
            initialValue={[]}
          >
            <Checkbox.Group>
              <Row gutter={[16, 16]}>
                {' '}
                {/* Add gutter for spacing between columns */}
                {permissions.map((permission) => (
                  <Col key={permission.id} xs={24} sm={12} md={8} lg={6}>
                    <Checkbox value={permission.id}>{permission.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStaff;
