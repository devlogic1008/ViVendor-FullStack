import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Typography, message, Divider, Upload, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const Categories = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([
    { key: '1', icon: '👜', title: 'Women Clothing', parent: null, subcategories: ['Tops', 'Dresses'] },
    { key: '2', icon: '🛍️', title: 'Children Fashion', parent: null, subcategories: ['Kids', 'Babies'] },
    { key: '3', icon: '👚', title: 'Home Decor, Furniture & Gadgets', parent: null, subcategories: ['Furniture', 'Gadgets'] },
    { key: '4', icon: '👠', title: 'Shoes', parent: null, subcategories: ['Casual', 'Formal'] },
  ]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
        const newCategory = { key: String(categories.length + 1), ...values, subcategories: [] };
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

  const handleSubcategoryAdd = (record) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.key === record.key
          ? { ...category, subcategories: [...category.subcategories, ''] }
          : category
      )
    );
  };

  const handleSubcategoryChange = (record, index, value) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.key === record.key
          ? {
              ...category,
              subcategories: category.subcategories.map((sub, i) =>
                i === index ? value : sub
              ),
            }
          : category
      )
    );
  };

  const handleSubcategoryDelete = (record, index) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.key === record.key
          ? {
              ...category,
              subcategories: category.subcategories.filter((sub, i) => i !== index),
            }
          : category
      )
    );
  };

  const expandedRowRender = (record) => {
    const subcategoryColumns = [
      {
        title: 'Subcategory',
        dataIndex: 'subcategories',
        key: 'subcategories',
        render: (subcategories, record) => (
          <Space direction="vertical">
            {subcategories.map((sub, index) => (
              <div key={index}>
                <Input
                  value={sub}
                  onChange={(e) => handleSubcategoryChange(record, index, e.target.value)}
                  placeholder="Subcategory"
                  style={{ marginRight: 8, marginBottom: 8, width: '60%' }}
                />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleSubcategoryDelete(record, index)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleSubcategoryAdd(record)}
            >
              Add Subcategory
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={subcategoryColumns}
        dataSource={[record]}
        pagination={false}
        showHeader={false}
        size="small"
      />
    );
  };

  const expandedRowKeysChange = (keys) => {
    setExpandedRowKeys(keys);
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
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
      render: (parent, record) => (
        <Select
          value={parent}
          onChange={(value) => setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.key === record.key ? { ...category, parent: value } : category
            ))}
          style={{ width: '80px' }}
        >
          <Option value={null}>None</Option>
          {categories.map((category) => (
            <Option key={category.key} value={category.key}>
              {category.title}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)}></Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => handleDelete(record.key)}
          ></Button>
        </Space>
      ),
    },
  ];

  const uploadProps = {
    beforeUpload: (file) => {
      // Only allow uploading one file
      form.setFieldsValue({ icon: file });
      return false;
    },
  };

  return (
    <div>
      <Title level={2}>Categories</Title>
      <Divider />

      {/* Input Fields Section */}
      <div style={{ marginBottom: '6px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <Title style={{ marginBottom: '16px' }} level={5}>
          Add Category
        </Title>
        <Form form={form} layout="inline">
          <Form.Item name="icon" label="Icon">
            <Upload {...uploadProps} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Icon</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input placeholder="Category Title" />
          </Form.Item>
          <Form.Item name="parent" label="Parent">
            <Select style={{ width: '100%' }} placeholder="Select parent">
              <Option value={null}>None</Option>
              {categories.map((category) => (
                <Option key={category.key} value={category.key}>
                  {category.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Table Section */}
      <Table
        style={{ marginTop: '5%' }}
        dataSource={categories}
        columns={columns}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) => expandedRowKeysChange([record.key])}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.subcategories && record.subcategories.length > 0,
        }}
      />

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
          <Form.Item name="icon" label="Icon">
            <Upload {...uploadProps} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Icon</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input placeholder="Category Title" />
          </Form.Item>
          <Form.Item name="parent" label="Parent">
            <Select style={{ width: '100%' }} placeholder="Select parent">
              <Option value={null}>None</Option>
              {categories.map((category) => (
                <Option key={category.key} value={category.key}>
                  {category.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
