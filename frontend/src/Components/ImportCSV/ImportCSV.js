import React, { useState } from 'react';
import { Table, Button, Space, Typography, Popconfirm, message, Modal, Upload, Divider } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import './ImportCSV.css';
const { Title } = Typography;

const data = [
  {
    key: '1',
    csv: 'file1.csv',
    createdAt: '2022-02-09 12:30:45',
  },
  {
    key: '2',
    csv: 'file2.csv',
    createdAt: '2022-02-08 09:15:30',
  },
  {
    key: '1',
    csv: 'file1.csv',
    createdAt: '2022-02-09 12:30:45',
  },
  {
    key: '2',
    csv: 'file2.csv',
    createdAt: '2022-02-08 09:15:30',
  },
  {
    key: '1',
    csv: 'file1.csv',
    createdAt: '2022-02-09 12:30:45',
  },
  {
    key: '2',
    csv: 'file2.csv',
    createdAt: '2022-02-08 09:15:30',
  },
];

const ImportCSV = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle file upload logic here
    message.success('File uploaded successfully');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    // Your delete logic here
    message.success(`Deleted record with key: ${key}`);
  };

  const handleFileDownload = (csvFileName) => {
    // Handle file download logic here
    message.success(`Downloading file: ${csvFileName}`);
  };

  const columns = [
    {
      title: 'CSV',
      dataIndex: 'csv',
      key: 'csv',
      className: 'blue-bold-text', // Add class for styling
      render: (text) => (
        <Button type="link" onClick={() => handleFileDownload(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const uploadProps = {
    beforeUpload: (file) => {
      setSelectedFile(file);
      return false;
    },
  };

  return (
    <div className='import_csv'  >
        
          <h2>Product Import</h2>
          <Divider/>
      <div >
      
        <div className='btn_end'>
          <Button type="primary" className='upload_btn_2'  ghost  onClick={showModal}>
            Upload Product csv
          </Button>
          <Button type="primary">View Sample csv</Button>
        </div>
      </div>

      <div className="csv_table" >
        <Table dataSource={data} columns={columns} />
      </div>

      <Modal
        title="Upload Product CSV"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Upload"
        cancelText="Cancel"
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </Modal>

     
    </div>
  );
};

export default ImportCSV;
