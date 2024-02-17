import React from 'react';
import { Form, Input, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './ForgotPassword.css';
import shewin from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);

    // Assuming some logic for password reset here

    // After successful password reset, navigate to the login page
    navigate('/login');
  };

  return (
    <div className="form_body">
      <div className="login-container">
        <div className="header">
          <img className="form_logo" src={shewin} alt="Shewin Logo" />
        </div>
        <label className="forgot_label">Please Enter Your email here! </label>
        <Form
          style={{ marginTop: '5%' }}
          name="forgot_password_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            type="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<InboxOutlined className="site-form-item-icon" />}
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
