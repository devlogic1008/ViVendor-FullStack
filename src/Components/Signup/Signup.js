import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, InboxOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import shewin from '../../images/dropship.png';

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate('/login');
  };

  return (
    <div className='form_body'>
      <div className="login-container">
        <div className="header">
          <img className='form_logo' src={shewin} alt="Shewin Logo" />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                type="name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="First Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                type="name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Last name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            type="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<InboxOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="login-form-forgot" to='/forgotpassword'>
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign In
            </Button>
            <Link className="login-form-signup" to='/login'>
              If you have an account then login ?
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
