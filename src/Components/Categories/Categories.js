import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, Divider } from 'antd';
import { EditOutlined, DeleteOutlined ,PlusOutlined} from '@ant-design/icons';
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

  const handleCategoryChange = (value) => {
    setCategory(value);
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
    // Handle subcategory editing logic here
    console.log('Edit Subcategory:', parentRecord, subRecord);
  };

  const handleDeleteSubcategory = (parentRecord, subRecord) => {
    // Handle subcategory deletion logic here
    const updatedSubcategories = parentRecord.subcategories.filter((sub) => sub.key !== subRecord.key);
    const updatedParentRecord = { ...parentRecord, subcategories: updatedSubcategories };
    const updatedData = tableData.map((item) => (item.key === parentRecord.key ? updatedParentRecord : item));
    setTableData(updatedData);
  };

  const handleModalOk = () => {
    // Implement logic for saving changes in the modal (e.g., updating image)
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setCategoryImage('');
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
          <Button type='primary' size='small' icon={<EditOutlined />} onClick={() => handleEditCategory(record)}>

          </Button>
          <Button type='primary'  size='small' style={{ marginLeft: '2%' }} danger  icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(record)}>

          </Button>
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
            <Button type='primary'  size='small' icon={<EditOutlined />} onClick={() => handleEditSubcategory(record, subRecord)}>
              
            </Button>
            <Button  size='small'  style={{ marginLeft: '2%' }} type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDeleteSubcategory(record, subRecord)}>
              
            </Button>
          </span>
        ),
      },
    ];

    return <Table columns={subcategoriesColumns} dataSource={record.subcategories} pagination={false} />;
  };

  return (
    <div>
      <h2>Categories</h2>

      <Row gutter={[24, 8]}>
        <Divider />
        {/* Add Category Section */}
        <Col span={12} xs={24} sm={24} md={12} lg={12} >
          <div className='category'>
            <Form layout="vertical" >
              <Form.Item style={{ marginTop: '2%' }}>
                <Typography style={{ paddingBottom: '5px' }} >Add Category:</Typography>
                <Input placeholder='Category' style={{ width: '50%' }} value={category} onChange={(e) => setCategory(e.target.value)} />

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
                <Typography style={{ paddingBottom: '5px' }} >Select Category:</Typography>
                <Select style={{ width: '50%' }} value={category} placeholder='Select Category' onChange={handleCategoryChange}>
                  {categoriesList.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
               
              </Form.Item>
              <Form.Item >
                <Typography  style={{marginBottom:'-2%'}}>Sub Category:</Typography>
                {subcategories.map((sub, index) => (
                <p>  <Input style={{ width: '50%' }} key={index} value={sub.title}  /></p>
                ))}
               <p> <Input
                  style={{ width: '50%' }}
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder=" Sub category"
                /> <Button type='primary' style={{ marginLeft: '2%' }} icon={<PlusOutlined/>}  onClick={handleAddSubcategory}>
                
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
      
      style={{marginTop:"5%" ,overflowX:'auto'}}
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
          <Form.Item label="Title">
            <Input type='text'
              value={categoryImage}
             
            />
          </Form.Item>
          <Form.Item label="Image ">
            <Input type='file'
              value={categoryImage}
             
            />
          </Form.Item>
          <Form.Item label="Rank">
            <Input type='number'
              value={categoryImage}
             
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
