// Import statements (add any additional necessary imports)
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, Divider, notification, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory, createSubCategory } from '../../Redux/Slices/CategorySlice';
import './Categories.css';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const [category, setCategory] = useState('');
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [rank, setRank] = useState(null);
  const [selectCategory, setSelectCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');

  useEffect(() => {
    setTableData(categories.map(category => ({
      key: category.id,
      category: category.title,
      image: category.image,
      rank: category.rank,
    })));
  }, [categories]);

  useEffect(() => {
   
    setTableData(prevTableData => [...prevTableData].sort((a, b) => a.rank - b.rank));
  }, [categories]); 
  

  // here is the id of category
  const categoriesList = categories.map(category => ({
    id: category.id,
    title: category.title,
  }));
  

  const handleSelectCategoryChange = (value) => {
    setSelectCategory(value);
  };

  const handleSaveCategory = async () => {
    if (category.trim() !== '') {
      try {
        await dispatch(addCategory({ title: category }));

        notification.success({
          message: 'Category Saved',
          description: 'Category has been successfully saved.',
        });
        setCategory('');
      } catch (error) {
        console.error('Error saving category:', error);
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
      await dispatch(deleteCategory(record.key));
      notification.success({
        message: 'Category Deleted',
        description: 'Category has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to delete category. Please try again.',
      });
    }
  };

  const handleModalOk = async () => {
    try {
      setLoading(true);

      if (editingCategory) {
        const { key, category, rank } = editingCategory;
        const formData = new FormData();
        formData.append('title', category);
        formData.append('rank', rank);
        if (image) {
          formData.append('image', image);
        }

        await dispatch(updateCategory({ key, formData }));
        notification.success({
          message: 'Category Updated',
          description: 'Category has been successfully updated.',
        });
      }

      setModalVisible(false);
      setEditingCategory(null);
      setImage(null);
    } catch (error) {
      console.error('Error handling category:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to handle category. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setImage(null);
  };

  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== '') {
      setSubCategories(prevSubCategories => [...prevSubCategories, newSubCategory]);
      setNewSubCategory('');
    }
  };

  const handleSaveSubCategory = async () => {
    if (subCategories.length > 0 && selectCategory) {
      try {
        await dispatch(createSubCategory({ title: subCategories, parentCategoryId: selectCategory }));

        notification.success({
          message: 'Sub Category Saved',
          description: 'Sub Category has been successfully saved.',
        });
        setSubCategories([]);
        setNewSubCategory('');
      } catch (error) {
        console.error('Error saving subcategory:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to save subcategory. Please try again.',
        });
      }
    } else {
      notification.warning({
        message: 'Validation Error',
        description: 'Please select a category and add at least one subcategory.',
      });
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        const imageUrl = typeof record.image === 'string' ? record.image.replace(/\\/g, '/') : null;
        return imageUrl ? <img src={`${imageUrl}`} alt="Category" style={{ width: '50px'}} /> : null;
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
        <Col span={12} xs={24} sm={24} md={12} lg={12}>
          <div className='category'>
            <Form layout="vertical">
              <Form.Item >
                <Typography  className='select_sub_category'>Select Category :</Typography>
                <Select className='select_cat' value={selectCategory} placeholder='Select Category' onChange={handleSelectCategoryChange} >
  {categoriesList.map((option) => (
    <Select.Option key={option.id} value={option.id}>
  {  option.title}
    </Select.Option>
  ))}
</Select>

              </Form.Item>
              <label>Sub Category :</label>
              {subCategories.map((subCategory, index) => (
                <Form.Item key={index} className='title'>
                  <Input type='text' value={subCategory} readOnly />
                </Form.Item>
              ))}
              <Form.Item className='title'>
                <Input type='text' value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} style={{ width: '50%' }} />
                <Button type='primary' className='delete_btn' icon={<PlusOutlined />} onClick={handleAddSubCategory}></Button>
              </Form.Item>
              <Button type="primary" loading={loading} onClick={handleSaveSubCategory}>
                Save 
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Table 
        className='category_table'
        columns={columns}
        dataSource={tableData}
      />
       <Modal
        title={`Edit ${editingCategory ? 'Category' : 'Add Category'}`}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form>
          <Form.Item >
            <label>Title : </label>
            <Input type='text' value={editingCategory ? editingCategory.category : ''} onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })} />
          </Form.Item>
          <Form.Item >
             <label>Image : </label> 
            <Upload 
              name="image"
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                setImage(file);
                return false; // Prevent upload
              }}
            >
              <Button icon={<UploadOutlined />}>Select Thumbnail</Button>
            </Upload>
          </Form.Item>
          <Form.Item className='rank'>
            <label>Rank : </label>
            <Input type='number' value={editingCategory ? editingCategory.rank : ''} onChange={(e) => setEditingCategory({ ...editingCategory, rank: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
