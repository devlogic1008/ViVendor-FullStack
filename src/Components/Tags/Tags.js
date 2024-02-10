import React, { useState } from 'react';
import { Input, Button, Modal, Form, Typography, Tag, Row, Col, message, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TagsPage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState([
    { key: '1', tag: 'BONG COLLECTION' },
    { key: '2', tag: 'CATEGORIES_BONG ACCESSORIES' },
    { key: '3', tag: 'COLOR_CLEAR ' },
    { key: '4', tag: 'TYPES_ASH  ' },
    { key: '5', tag: 'AREA Q3  ' },
    // Add more tags as needed
  ]);
  const [selectedTag, setSelectedTag] = useState(null);

  const showModal = (tag) => {
    setSelectedTag(tag);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedTag(null);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    setTags((prevTags) => prevTags.filter((tag) => tag.key !== selectedTag.key));
    setIsModalVisible(false);
    message.success('Tag deleted successfully');
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newTag = { key: String(tags.length + 1), ...values };
      setTags((prevTags) => [...prevTags, newTag]);
      form.resetFields();
      message.success('Tag added successfully');
    });
  };

  return (
    <div>
      <Title level={2}>Tags</Title>
      <Divider/>
      {/* Input Fields Section */}
      <div style={{ marginBottom: '16px', backgroundColor: '#f8f8fa', padding: '30px', borderRadius: '10px' }}>
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item name="tag" label="Add Tag" style={{ width: '100%' }}>
                <Input  size='large' placeholder="Enter Tag name here..." />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button  size='large'  type="primary" onClick={handleSave}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Tags Section */}
      <div>
        {tags.map((tag) => (
          <Tag
            key={tag.key}
            onClick={() => showModal(tag)}
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              padding: '10px',
              marginBottom: '8px',
              marginRight: '8px',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              background: '#1677ff',
              color:'white'
            }}
          >
            {tag.tag}
          </Tag>
        ))}
      </div>

      {/* Tag Details Modal */}
      <Modal
        title={`Tag Details - ${selectedTag?.tag}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="discard" onClick={handleCancel}>
            Discard
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            <DeleteOutlined />
            Delete
          </Button>,
        ]}
      >
        <p>Details of the selected tag go here.</p>
      </Modal>
    </div>
  );
};

export default TagsPage;
