import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, Divider, Upload, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import axios from 'axios';
import "./Categories.css";
import tops from "../../images/tops.png";
import bottoms from "../../images/bottoms.png";

const Categories = () => {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryImage, setCategoryImage] = useState('');

  // State for subcategory editing
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  // Fetch categories from the server on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/category/get-all-categories');
      setCategoriesList(response.data);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const handleSelectCategoryChange = (value) => {
    setSelectCategory(value);
  };
  const handleAddSubcategory = () => {
    if (newSubcategory.trim() !== '') {
      setSubcategories([...subcategories, { key: Date.now().toString(), title: newSubcategory, image: '' }]);
      setNewSubcategory('');
    }
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleSaveCategory = async () => {
    if (category.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/v1/category/create-category', {
          title: category,
          image: categoryImage,
          subcategories: subcategories.map((sub) => ({ title: sub.title })),
        });

        const newCategory = response.data;

        const formattedCategory = {
          key: newCategory.id.toString(),  // Make sure 'id' is available
          title: newCategory.title,
          image: newCategory.image,
          subcategories: newCategory.subcategories || [],
        };

        setTableData([...tableData, formattedCategory]);
        setCategoriesList([...categoriesList, formattedCategory]);  // Change 'category' to 'formattedCategory' here
        setCategory('');
        setSubcategories([]);
        setCategoryImage('');
        message.success('Category created successfully');
      } catch (error) {
        console.error('Error creating category:', error);
        message.error('Error creating category');
      }
    }
  };

  // New function for saving subcategories
  const handleSaveSubcategory = () => {
    // Implement logic for saving subcategories
    // You can use a similar approach as in handleSaveCategory
  };

  const handleEditCategory = async (record) => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/category/get-category/${record.id}`);
      const editingCategoryData = response.data;

      setEditingCategory(editingCategoryData);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching category details for editing:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      console.log('Deleting category with id:', categoryId);

      await axios.delete(`http://localhost:5000/v1/category/delete-category/${categoryId}`);

      console.log('Category deleted successfully');

      const updatedData = tableData.filter((item) => item.key !== categoryId);
      console.log('Updated data after deletion:', updatedData);

      setTableData(updatedData);

      const updatedCategoriesList = categoriesList.filter((category) => category.id !== categoryId);
      console.log('Updated categoriesList after deletion:', updatedCategoriesList);

      setCategoriesList(updatedCategoriesList);

      message.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Error deleting category');
    }
  };


  const handleEditSubcategory = (parentRecord, subRecord) => {
    setEditingSubcategory({
      parentRecord,
      subRecord,
    });
    setModalVisible(true);
  };

  const handleDeleteSubcategory = (parentRecord, subRecord) => {
    const updatedSubcategories = parentRecord.subcategories.filter((sub) => sub.key !== subRecord.key);
    const updatedParentRecord = { ...parentRecord, subcategories: updatedSubcategories };
    const updatedData = tableData.map((item) => (item.key === parentRecord.key ? updatedParentRecord : item));
    setTableData(updatedData);
  };
  const handleModalOk = async () => {
    try {
      // Update category data on the client side
      const updatedCategoryData = {
        ...editingCategory,
        image: categoryImage, // Update with the new image data
        // reank:
      };

      const updatedTableData = tableData.map((item) =>
        item.key === editingCategory.id.toString() ? { ...item, image: categoryImage } : item
      );

      setTableData(updatedTableData);
      setModalVisible(false);
      setEditingCategory(null);
      setCategoryImage('');

      // Send updated category data to the server for persistence
      await axios.put(`http://localhost:5000/v1/category/update-category/${editingCategory.id}`, {
        title: updatedCategoryData.title,
        image: updatedCategoryData.image,
        rank: updatedCategoryData.rank,
        parentCategoryId: updatedCategoryData.parentCategoryId,
        // Include other fields as needed
      });

      message.success('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      message.error('Error updating category');
    }
  };


  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setCategoryImage('');
  };


  const handleEditSubcategoryChange = (value) => {
    // Handle changes in subcategory title during editing
    const updatedSubcategories = editingSubcategory.parentRecord.subcategories.map((sub) =>
      sub.key === editingSubcategory.subRecord.key ? { ...sub, title: value } : sub
    );
    const updatedParentRecord = { ...editingSubcategory.parentRecord, subcategories: updatedSubcategories };
    const updatedData = tableData.map((item) => (item.key === editingSubcategory.parentRecord.key ? updatedParentRecord : item));
    setTableData(updatedData);
  };
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img src={editingCategory ? categoryImage : record.image} alt="Category" style={{ width: '50px' }} />
      ),
    },

    { title: 'Title', dataIndex: 'title', key: 'title' }, // Change 'category' to 'title' here
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleEditCategory(record)}></Button>
          <Button
            type='primary'
            size='small'
            className='delete-button'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCategory(record.id)}  // Assuming 'id' is the correct identifier
          ></Button>

        </span>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const subcategoriesColumns = [
      { title: 'Image', dataIndex: 'image', key: 'image', render: (text) => <img src={bottoms} alt="Subcategory" style={{ width: '30px' }} /> },
      { title: 'Title', dataIndex: 'title', key: 'title' },
      {
        title: 'Action',
        key: 'action',
        render: (text, subRecord) => (
          <span>
            <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleEditSubcategory(record, subRecord)}></Button>
            <Button size='small' className='delete-button' type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDeleteSubcategory(record, subRecord)}></Button>
          </span>
        ),
      },
    ];

    return <Table columns={subcategoriesColumns} dataSource={record.subcategories} pagination={false} />;
  };

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
                <Typography className='select_sub_category'  >Select Category:</Typography>
                <Select className='select_cat' value={selectCategory} placeholder='Select Category' onChange={handleSelectCategoryChange}>
                  {categoriesList.map((option) => (
                    <Select.Option key={option.id} value={option.title}>
                      {option.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item >
                <Typography className='subcategory_typo' >Sub Category:</Typography>
                {subcategories.map((sub, index) => (
                  <p key={index}>  <Input className='sub_input' value={sub.title} onChange={(e) => handleEditSubcategoryChange(e.target.value)} /></p>
                ))}
                <p>
                  <Input
                    className='sub_input'
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    placeholder=" Sub category"
                  />
                  <Button type='primary' className='delete_btn' icon={<PlusOutlined />} onClick={handleAddSubcategory}>
                  </Button>
                </p>
              </Form.Item>
              <Button type="primary" onClick={handleSaveCategory}>
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
        expandable={{ expandedRowRender }}
      />

      {/* Edit Category Modal */}

      <Modal
        title={`Edit ${editingCategory ? 'Category' : 'Add Category'}`}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form initialValues={editingCategory}>
          <Form.Item className='title' name="title" label="Title">
            <Input type='text' />
          </Form.Item>

          <Form.Item name="categoryImage" label="" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload className='thumbnail' name="logo" listType="picture" beforeUpload={() => false}>
              <Button className='upload_btn' icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item className='rank' name="rank" label="Rank">
            <Input type='number' />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default Categories;
