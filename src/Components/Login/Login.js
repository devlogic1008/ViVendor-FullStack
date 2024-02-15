import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined,InboxOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import shewin from '../../images/dropship.png';
import logo from '../../images/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);

    // Store user credentials in local storage
    localStorage.setItem('userEmail', values.email);
    localStorage.setItem('userPassword', values.password);

    // Navigate to the "/find-product" route
    navigate('/find-product');
  };

  return (
    <div className='form_body'>
      <div className="login-container">
        <div className="header">
          <img className='form_logo'  src={logo} alt="Shewin Logo" />
        </div>
        <Form
          name="normal_login"
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
            <Link className="login-form-signup" to='/signup'> 
              Create an account ?
            </Link>
          </Form.Item>
         
        </Form>
      </div>
    </div>
  );
};

export default Login;
