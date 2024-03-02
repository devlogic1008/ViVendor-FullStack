import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Form, Typography, Tag, Row, Col, message, Divider, Breadcrumb } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags, addTag, deleteTag } from '../../Redux/Slices/TagSlice';
import "./Tags.css";


const TagsPage = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    if (selectedTag && selectedTag.id) {
      dispatch(deleteTag(selectedTag.id));  // Use 'id' instead of 'key'
      setIsModalVisible(false);
      message.success('Tag deleted successfully');
    } else {
      // Handle the case where selectedTag or its id is undefined
      console.error('Selected tag or id is undefined:', selectedTag);
      // Additional error handling or feedback if needed
    }
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      dispatch(addTag(values));
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
      <div className='tags_header'>
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item name="title" className='add_tag' label="Add Tag">
                <Input name='title' type='text'  placeholder="Enter Tag name here..." />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className='btn_end'>
              <Button type="primary" onClick={handleSave}>
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
      key={tag.id} // Assuming 'id' is the property you want to use as the key
      onClick={() => showModal(tag)}
    >
      {tag.title}
    </Tag>
  ))}
</div>

      {/* Tag Details Modal */}
      <Modal
        title={`Tag Details - ${selectedTag?.title}`}
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
