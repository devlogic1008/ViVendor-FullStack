import React, { useState } from 'react';
import { Input, Button, Modal, Form, Typography, Tag, Row, Col, message, Divider, Breadcrumb } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "./Tags.css"
const { Title } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

const TagsPage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState([
    { key: '1', tag: 'BONG COLLECTION' },
    { key: '2', tag: 'CATEGORIES_BONG ACCESSORIES' },
    { key: '3', tag: 'COLOR_CLEAR ' },
    { key: '4', tag: 'TYPES_ASH  ' },
    { key: '5', tag: 'AREA Q3  ' },

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
    <div className='tags_main'>
      {/* Breadcrumb */}
      

     <h2>Tags</h2>
   
      <Divider />

      {/* Input Fields Section */}
      <div className='tags_header' >
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item  name="tag" className='add_tag' label="Add Tag" >
                <Input   placeholder="Enter Tag name here..." />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className='btn_end'>
              <Button    type="primary" onClick={handleSave}>
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
          className='all_tags'
            key={tag.key}
            onClick={() => showModal(tag)}
          
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
