import React from 'react';
import { Row, Col, Input, Button } from 'antd';

const UserInfo = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <p>Account Information</p>
        </Col>
        <Col span={16}>
          <p>Name</p>
          <p>Mian Muzammil Afzal</p>
          <p>Email</p>
          <p>muzammilmian88@gmail.com</p>
          <Button type="primary">Sign Out</Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <p>Update Password</p>
        </Col>
        <Col span={16}>
          <p>New Name</p>
          <Input style={{ width: '50%' }} placeholder="Please enter the new name" />

          <p>New Password</p>
          <Input style={{ width: '50%' }} placeholder="Please enter the new password" />

          <p>Confirm Password</p>
          <Input style={{ width: '50%' }} placeholder="Please enter the new password" />

          <p>
            <Button type="primary">Save</Button>
          </p>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <p>Phone number</p>
        </Col>
        <Col span={16}>
          <Input style={{ width: '50%' }} placeholder="Please enter the new password" />
          <Button style={{ marginLeft: '4%' }} type="primary">
            Save
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserInfo;
