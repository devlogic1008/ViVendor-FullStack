import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, Divider, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import axios from 'axios';
import "./Categories.css";
import tops from "../../images/tops.png";

const Categories = () => {
  const [category, setCategory] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [rank, setRank] = useState(null);
  const [selectCategory, SetSelectCategory] = useState('');
  const [forceRerender, setForceRerender] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v1/category/get-all-categories');
        const formattedData = response.data.map(category => ({
          key: category.id,
          category: category.title,
          image: category.image,
          rank: category.rank,
        }));

        setTableData(formattedData);
        setCategoriesList(response.data.map(category => category.title));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectCategoryChange = (value) => {
    SetSelectCategory(value);
  };

  const handleSaveCategory = async () => {
    if (category.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/v1/category/create-category', {
          title: category,
          image: categoryImage,
          rank: rank,
        });

        const newCategory = {
          key: response.data.id,
          category: response.data.title,
          image: response.data.image,
          rank: response.data.rank,
        };

        setTableData([...tableData, newCategory]);
        setCategoriesList([...categoriesList, response.data.title]);
        setCategory('');
        setCategoryImage(null);
        setRank('');
        
        // Display success notification
        notification.success({
          message: 'Category Saved',
          description: 'Category has been successfully saved.',
        });
      } catch (error) {
        console.error('Error saving category:', error);

        // Display error notification
        notification.error({
          message: 'Error',
          description: 'Failed to save category. Please try again.',
        });
      }
    }
  };

  const handleEditCategory = (record) => {
    setEditingCategory(record);
    setModalVisible(true);
  };

  const handleDeleteCategory = async (record) => {
    try {
      await axios.delete(`http://localhost:5000/v1/category/delete-category/${record.key}`);
      const updatedData = tableData.filter((item) => item.key !== record.key);
      setTableData(updatedData);

      // Display success notification
      notification.success({
        message: 'Category Deleted',
        description: 'Category has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting category:', error);

      // Display error notification
      notification.error({
        message: 'Error',
        description: 'Failed to delete category. Please try again.',
      });
    }
  };

  const handleModalOk = async () => {
    try {
      if (editingCategory) {
        const { key, category, rank } = editingCategory;
  
        // Create a FormData object to send the form data including the image file
        const formData = new FormData();
        formData.append('title', category);
        formData.append('rank', rank);
        formData.append('image', categoryImage);
  
        // Send PUT request to update the category
        await axios.put(`http://localhost:5000/v1/category/update-category/${key}`, formData);
  
        // Update state with the edited data
        const updatedData = tableData.map(item =>
          item.key === key ? { ...item, category, image: categoryImage, rank } : item
        );
        setTableData(updatedData);
  
        // Display success notification
        notification.success({
          message: 'Category Updated',
          description: 'Category has been successfully updated.',
        });
      }
  
      // Clear modal state
      setModalVisible(false);
      setEditingCategory(null);
      setCategoryImage(null);
      setCategory('');
      setRank('');
    } catch (error) {
      console.error('Error handling category:', error);
  
      // Display error notification
      notification.error({
        message: 'Error',
        description: 'Failed to handle category. Please try again.',
      });
    }
    setForceRerender(!forceRerender);
  };
  




  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setCategoryImage(null);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        const imageUrl = typeof record.image === 'string' ? record.image.replace(/\\/g, '/') : null;
        console.log('Rendering image for record:', record);
        console.log('Image URL:', imageUrl);
        return imageUrl ? <img src={`${imageUrl}?t=${new Date().getTime()}`} alt="Category" style={{ width: '50px' }} /> : null;
      },
    },
    
    { title: 'Title', dataIndex: 'category', key: 'category' },
    { title: 'Rank', dataIndex: 'rank', key: 'rank' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleEditCategory(record)}></Button>
          <Button type='primary' size='small' className='delete-button' danger icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(record)}></Button>
        </span>
      ),
    },
  ];
 
  return (
    <div className='categories_main'>
      <h2>Categories</h2>

      <Row gutter={[24, 8]}>
        <Divider />
        {/* Add Category Section */}
        <Col span={12} xs={24} sm={24} md={12} lg={12} >
          <div className='category'>
            <Form layout="vertical" >
              <Form.Item className='add_category' >
                <Typography className='category_Text'  >Add Category:</Typography>
                <Input placeholder='Category' className='category_input' value={category} onChange={(e) => setCategory(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleSaveCategory}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Add Subcategory Section */}
        <Col span={12} xs={24} sm={24} md={12} lg={12}>
          <div className='category'>
            <Form layout="vertical">
              <Form.Item >
                <Typography  className='select_sub_category'  >Select Category:</Typography>
                <Select className='select_cat' value={selectCategory} placeholder='Select Category' onChange={handleSelectCategoryChange} >
                  {categoriesList.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Button type="primary" onClick={handleModalOk}>
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Expandable Table */}
      <Table 
  className='category_table'
  columns={columns}
  dataSource={tableData}
  key={forceRerender}  // Add a unique key to force re-render
/>

      {/* Edit Category Modal */}
      <Modal
        title={`Edit ${editingCategory ? 'Category' : 'Add Category'}`}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form>
          <Form.Item className='title'>
            <label>Title:</label>
            <Input type='text' value={editingCategory ? editingCategory.category : ''} onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })} />
          </Form.Item>
          <Form.Item className='title'>
            <label>Image:</label>
            <Input type='file' onChange={(e) => setCategoryImage(e.target.files[0])} />
          </Form.Item>
          <Form.Item className='rank'>
            <label>Rank:</label>
            <Input type='number' value={editingCategory ? editingCategory.rank : ''} onChange={(e) => setEditingCategory({ ...editingCategory, rank: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
