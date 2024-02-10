import React, { useState } from 'react';
import { Table, Input, Select, Button, Space, Modal, Form, Typography, message, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const Categories = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([
    { key: '1', icon: '🌟', title: 'Women Clothing' },
    { key: '2', icon: '🌈', title: 'Children Fashion' },
    { key: '3', icon: '🌟', title: 'Home Decor, Furniture & Gadgets' },
    { key: '4', icon: '🌈', title: ' Fitness Gears' },
   
  ]);
  const [editingCategory, setEditingCategory] = useState(null);

  const showModal = (category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
    form.setFieldsValue(category);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCategory(null);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingCategory) {
        // Update existing category
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.key === editingCategory.key ? { ...category, ...values } : category
          )
        );
        message.success('Category updated successfully');
      } else {
        // Add new category
        const newCategory = { key: String(categories.length + 1), ...values };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        message.success('Category added successfully');
      }

      handleCancel();
    });
  };

  const handleDelete = (key) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.key !== key));
    message.success('Category deleted successfully');
  };

  const columns = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)}>
            
          </Button>
          <Button icon={<DeleteOutlined />} type="primary" danger onClick={() => handleDelete(record.key)}>
            
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Categories</Title>
      <Divider />

      {/* Input Fields Section */}
      <div style={{ marginBottom: '6px',backgroundColor:'#f8f8fa', padding:'20px', borderRadius:'10px'}}>
        <Title style={{ marginBottom: '16px' }} level={5}>
       Add   Category
        </Title>
        <Form form={form} layout="inline">
          <Form.Item name="icon" label="Icon">
            <Select style={{ width: 120 }} placeholder="Select icon">
              <Option value="🌟">🌟</Option>
              <Option value="🌈">🌈</Option>
              <Option value="🛒">🛒</Option>
              {/* Add more icons as needed */}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input placeholder="Category Title" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Table Section */}
      <Table style={{ marginTop: '5%' }} dataSource={categories} columns={columns} />

      {/* Edit Category Modal */}
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="icon" label="Icon:">
            <Select style={{ width: '100%' }} placeholder="Select icon">
              <Option value="🌟">🌟</Option>
              <Option value="🌈">🌈</Option>
              <Option value="🛒">🛒</Option>
              {/* Add more icons as needed */}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="Title:">
            <Input placeholder="Category Title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
