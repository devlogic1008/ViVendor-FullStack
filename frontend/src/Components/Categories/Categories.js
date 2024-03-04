import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, Divider, notification, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory, createSubCategory, deleteSubCategory, updateSubCategory } from '../../Redux/Slices/CategorySlice';
import './Categories.css';



const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);

  const [category, setCategory] = useState('');
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [selectCategory, setSelectCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [editSubCategoryModalVisible, setEditSubCategoryModalVisible] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    // Fetch categories when component mounts or when the status changes to 'idle'
    if (status === 'idle') {
      dispatch(fetchCategories());
    }

    // Update tableData based on categories
    setTableData(
      categories
        .filter(category => !category.parentCategoryId)
        .map(category => ({
          key: category.id,
          category: category.title,
          image: category.image,
          rank: category.rank,
          subCategories: categories.filter(subCategory => subCategory.parentCategoryId === category.id),
        }))
        .sort((a, b) => a.rank - b.rank)
    );
  }, [categories, status, dispatch]);

  const parentCategoriesList = categories
  .filter(category => !category.parentCategoryId)
  .map(category => ({
    id: category.id,
    title: category.title,
  }));

const handleSelectCategoryChange = (value) => {
  setSelectCategory(value);
};

  const handleSaveCategory = async () => {
    if (category.trim() !== '') {
      // Check if the category starts with a letter
      if (/^[a-zA-Z]/.test(category)) {
        // Check if the category starts with a special character or number
        if (/^[^a-zA-Z]/.test(category)) {
          notification.warning({
            message: 'Validation Error',
            description: 'Category cannot start with a special character or number.',
          });
        } else if (categories.some(cat => cat.title.trim().toLowerCase() === category.trim().toLowerCase())) {
          // Check for duplicate category
          notification.warning({
            message: 'Validation Error',
            description: 'Category already exists.',
          });
        } else {
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
      } else {
        notification.warning({
          message: 'Validation Error',
          description: 'Category must start with a letter.',
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
      // Check if the category has subcategories
      const hasSubcategories = categories.some(subCategory => subCategory.parentCategoryId === record.key);
  
      if (hasSubcategories) {
        notification.warning({
          message: 'Validation Error',
          description: 'Cannot delete category with subcategories. Delete subcategories first.',
        });
      } else {
        // No subcategories, proceed with deletion
        await dispatch(deleteCategory(record.key));
        // Fetch categories after deleting a category
        await dispatch(fetchCategories());
  
        notification.success({
          message: 'Category Deleted',
          description: 'Category has been successfully deleted.',
        });
  
        // Reset selectCategory to default value
        setSelectCategory('');
      }
  
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
      setLoadingModal(true);

      if (editingCategory) {
        const { key, category, rank } = editingCategory;

        // Check if an image file is selected
        if (image) {
          // Validate file extension
          const allowedExtensions = ["png", "jpg", "jpeg"];
          const fileNameParts = image.name.split(".");
          const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

          if (!allowedExtensions.includes(fileExtension)) {
            notification.warning({
              message: 'Validation Error',
              description: 'Please select a valid image file with PNG, JPG, or JPEG extension.',
            });

            setLoadingModal(false);
            return;
          }
        }

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
      setLoadingModal(false);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setImage(null);
  };

  const handleGenerateSubCategory = () => {
    if (newSubCategory.trim() !== '') {
      // Check for duplicate subcategory
      if (subCategories.some(subCat => subCat.trim().toLowerCase() === newSubCategory.trim().toLowerCase())) {
        setSubCategoryError('Subcategory already exists.');
      } else {
        // Check if the subcategory starts with a letter
        if (/^[a-zA-Z]/.test(newSubCategory)) {
          setSubCategories(prevSubCategories => [...prevSubCategories, newSubCategory.trim()]);
          setNewSubCategory('');
          setSubCategoryError('');
        } else {
          setSubCategoryError('Subcategory must start with a letter.');
        }
      }
    } else {
      setSubCategoryError('Subcategory cannot be empty.');
    }
  };

  const handleSaveSubCategory = async () => {
    if (subCategories.length >= 0 && selectCategory) {
      try {
        // Check if all subcategories start with a letter
        if (subCategories.every(subCat => /^[a-zA-Z]/.test(subCat))) {
          await dispatch(createSubCategory({ title: subCategories, parentCategoryId: selectCategory }));
          // Fetch categories after creating a subcategory
          dispatch(fetchCategories());

          notification.success({
            message: 'Sub Category Saved',
            description: 'Sub Category has been successfully saved.',
          });
          setSubCategories([]);
          setNewSubCategory('');
        } else {
          notification.warning({
            message: 'Validation Error',
            description: 'All subcategories must start with a letter.',
          });
        }
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
  

  const handleDeleteSubCategory = async (parentCategory, subCategory) => {
    try {
      await dispatch(deleteSubCategory(subCategory.id));
      // Fetch categories after deleting a subcategory
      dispatch(fetchCategories());

      notification.success({
        message: 'Subcategory Deleted',
        description: 'Subcategory has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to delete subcategory. Please try again.',
      });
    }
  };
  const showEditSubCategoryModal = (subCategory) => {
    setEditingSubCategory(subCategory);
    setEditSubCategoryModalVisible(true);
  };

  const handleEditSubCategoryOk = async () => {
    try {
      setLoadingModal(true);

      // Assuming you have formData with updated details for the subcategory
      const formData = { title: editingSubCategory.title }; // Replace this with your formData

      await dispatch(updateSubCategory({ key: editingSubCategory.id, formData }));
      notification.success({
        message: 'Subcategory Updated',
        description: 'Subcategory has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating subcategory:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update subcategory. Please try again.',
      });
    } finally {
      setLoadingModal(false);
      setEditSubCategoryModalVisible(false);
    }
  };

  const handleEditSubCategoryCancel = () => {
    setEditSubCategoryModalVisible(false);
    setEditingSubCategory(null);
  };

  const handleExpandRowToggle = (expanded, record) => {
    const keys = [...expandedKeys];

    if (expanded) {
      keys.push(record.key);
    } else {
      const index = keys.indexOf(record.key);
      if (index !== -1) {
        keys.splice(index, 1);
      }
    }

    setExpandedKeys(keys);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        const imageUrl = typeof record.image === 'string' ? record.image.replace(/\\/g, '/') : null;
        return imageUrl ? <img src={`${imageUrl}`} style={{ width: '50px' }} alt="Category Thumbnail" /> : null;
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

  const expandedRowRender = (record) => {
    const subCategoriesColumns = [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      {
        title: 'Action',
        key: 'action',
        render: (text, subCategory) => (
          <span>
            <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => showEditSubCategoryModal(subCategory)}></Button>
            <Button type='primary' size='small' className='delete-button' danger icon={<DeleteOutlined />} onClick={() => handleDeleteSubCategory(record, subCategory)}></Button>
          </span>
        ),
      },
    ];

    return (
      <Table
        columns={subCategoriesColumns}
        dataSource={record.subCategories}
        pagination={false}
        rowKey="id"
      />
    );
  };

  return (
    <div className='categories_main'>
      <h2>Categories</h2>
      <Row gutter={[24, 8]}>
        <Divider />
        <Col span={12} xs={24} sm={24} md={12} lg={12} >
          <div className='category'>
            <Form layout="vertical" >
            <Form.Item className='add_category'>
            <Typography className='category_Text'>Add Category :</Typography>
            <Input
              placeholder='Category'
              type='text'
              className='category_input'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Item>
          {categoryError && (
            <div className="error-message">
              <Typography.Text type="danger">{categoryError}</Typography.Text>
            </div>
          )}
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
                  {parentCategoriesList.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <label>Sub Category :</label>
              {subCategories.map((subCategory, index) => (
                <Form.Item key={index} className='title'>
                  <Input type='text'  value={subCategory} style={{width:'50%'}} />
                </Form.Item>
              ))}
            <Form.Item className='title'>
            <Input type='text' value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} style={{ width: '50%' }} />
            <Button type='primary' className='delete_btn' icon={<PlusOutlined />} onClick={handleGenerateSubCategory}></Button>
          </Form.Item>
        
          {subCategoryError && (
            <div className="error-message">
              <Typography.Text type="danger">{subCategoryError}</Typography.Text>
            </div>
          )}
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
        expandable={{ expandedRowRender, expandedRowKeys: expandedKeys, onExpand: handleExpandRowToggle }}
      />
      <Modal
        title={`Edit ${editingCategory ? 'Category' : 'Add Category'}`}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loadingModal}
      >
        <Form>
          <Form.Item >
            <Typography className='category_Text'  >Title:</Typography>
            <Input type='text' value={editingCategory ? editingCategory.category : ''} onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })} />
          </Form.Item>
          <Form.Item >
            <Form.Item className='rank'>
              <Typography className='category_Text'  >Rank:</Typography>
              <Input type='number' value={editingCategory ? editingCategory.rank : ''} onChange={(e) => setEditingCategory({ ...editingCategory, rank: e.target.value })} />
            </Form.Item>
            <Typography className='category_Text'  >Image:</Typography>
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
        </Form>
      </Modal>
      <EditSubCategoryModal
        visible={editSubCategoryModalVisible}
        onCancel={handleEditSubCategoryCancel}
        onOk={handleEditSubCategoryOk}
        loading={loadingModal}
        subCategory={editingSubCategory}
        setSubCategory={setEditingSubCategory}
      />
    </div>
  );
};



const EditSubCategoryModal = ({ visible, onCancel, onOk, loading, subCategory, setSubCategory }) => {
  const handleOk = () => {
    onOk();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleTitleChange = (e) => {
    setSubCategory({ ...subCategory, title: e.target.value });
  };
  return (
    <Modal
    title={`Edit Subcategory`}
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    confirmLoading={loading}
  >
    <Form>
      <Form.Item>
        <Typography className='category_Text'>Title:</Typography>
        <Input type='text' value={subCategory?.title || ''} onChange={handleTitleChange} />
      </Form.Item>
    </Form>
  </Modal>
  );
};

export default Categories;
