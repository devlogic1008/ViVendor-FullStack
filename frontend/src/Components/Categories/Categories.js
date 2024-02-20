import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, Divider, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import "./Categories.css";
import tops from "../../images/tops.png";
import bottoms from "../../images/bottoms.png";

const Categories = () => {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [categoriesList, setCategoriesList] = useState(['Electronics', 'Clothing']);
  const [tableData, setTableData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryImage, setCategoryImage] = useState('');

  // State for subcategory editing
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const onFinish = (values) => {
    // Handle form submission
    console.log('Received values:', values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() !== '') {
      setSubcategories([...subcategories, { key: Date.now().toString(), title: newSubcategory, image: '' }]);
      setNewSubcategory('');
    }
  };

  const handleSaveCategory = () => {
    if (category.trim() !== '') {
      const newCategory = {
        key: Date.now().toString(),
        category,
        image: categoryImage,
        subcategories: subcategories.slice(),
      };

      setTableData([...tableData, newCategory]);
      setCategoriesList([...categoriesList, category]);
      setCategory('');
      setSubcategories([]);
      setCategoryImage('');
    }
  };

  const handleEditCategory = (record) => {
    setEditingCategory(record);
    setModalVisible(true);
  };

  const handleDeleteCategory = (record) => {
    const updatedData = tableData.filter((item) => item.key !== record.key);
    setTableData(updatedData);
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

  const handleModalOk = () => {
    // Implement logic for saving changes in the modal (e.g., updating image)
    setModalVisible(false);
    setEditingCategory(null);
    setEditingSubcategory(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setEditingSubcategory(null);
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
      render: (text, record) => <img src={tops} alt="Category" style={{ width: '50px' }} />,
    },
    { title: 'Title', dataIndex: 'category', key: 'category' },
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
              <Typography  className='select_sub_category'  >Select Category:</Typography>
              <Select className='select_cat' value={category} placeholder='Select Category' onChange={handleCategoryChange}>
                {categoriesList.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
             
            </Form.Item>
            <Form.Item >
              <Typography className='subcategory_typo' >Sub Category:</Typography>
              {subcategories.map((sub, index) => (
              <p>  <Input className='sub_input' key={index} value={sub.title}  /></p>
              ))}
             <p> <Input

                className='sub_input'
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                placeholder=" Sub category"
              /> <Button type='primary' className='delete_btn' icon={<PlusOutlined/>}  onClick={handleAddSubcategory}>
              
            </Button></p>
             
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
      <Form>
        <Form.Item className='title'>
          <lable>Title:</lable>
          <Input type='text'
            value={categoryImage}
           
          />
        </Form.Item>
        <lable>Thumbnail:</lable>
        <Form.Item  name="categoryImage" valuePropName="fileList" getValueFromEvent={normFile}>
      
      <Upload className='thumbnail' name="logo"  listType="picture" beforeUpload={() => false}>
        <Button className='upload_btn' icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
    <lable>Rank:</lable>
        <Form.Item className='rank'>
          <Input type='number'
            
           
          />
        </Form.Item>
      </Form>
    </Modal>
  </div>
  );
};

export default Categories;
