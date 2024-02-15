import React, { useState } from 'react';
import { Button, Col, Divider, Input, Modal, Row, Checkbox, Table, Select } from 'antd';
import Search from 'antd/es/input/Search';
import './ShippingZones.css';
import { EditOutlined, DeleteOutlined, PlusOutlined ,CloseOutlined} from '@ant-design/icons';
const { Option } = Select;
const ShippingZonesComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddRateModalVisible, setIsAddRateModalVisible] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [allCountries] = useState([
    'Afghanistan',
    'Albania',
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Austrian Empire*",
    "Azerbaijan",
    "Baden*",
    "Bahamas, The",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Bavaria*",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin (Dahomey)",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Brunswick and Lüneburg*",
    "Bulgaria",
    "Burkina Faso (Upper Volta)",
    "Burma",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands, The",
    "Central African Republic",
    "Central American Federation*",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    'Czechoslovakia*',
  ]);

  const [editRecord, setEditRecord] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setIsAddRateModalVisible(false);
    setEditRecord(null);
  };

  const handleCreateZone = () => {
    // Handle logic for creating or editing shipping zone with selectedCountries
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setIsAddRateModalVisible(false);
  };

  const handleCheckboxChange = (country) => {
    const newSelectedCountries = [...selectedCountries];

    if (newSelectedCountries.includes(country)) {
      // Deselect if already selected
      newSelectedCountries.splice(newSelectedCountries.indexOf(country), 1);
    } else {
      // Select if not already selected
      newSelectedCountries.push(country);
    }

    setSelectedCountries(newSelectedCountries);
  };

  const handleEdit = (record) => {
    // Handle logic for opening edit modal
    setEditRecord(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record) => {
    // Handle logic for deleting shipping zone
    console.log('Delete', record);
  };

  const handleAddRate = () => {
    // Handle logic for opening add rate modal
    setEditRecord();
    setIsAddRateModalVisible(true);
  };

  // Table columns for the extendable table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Countries',
      dataIndex: 'countries',
      key: 'countries',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type='primary' onClick={() => handleAddRate()}  style={{ marginRight: '8px' }}>
            Add Rate
          </Button>
          <Button type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: '8px' }} />
          <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
        </span>
      ),
    },
  ];

  // Data for the extendable table
  const data = [
    {
      key: '1',
      title: 'Zone 1',
      countries: 'China, Canada',
    },
    {
      key: '2',
      title: 'Zone 2',
      countries: 'Pakistan, England',
    },
    {
      key: '3',
      title: 'Zone 3',
      countries: 'Australia, Malysia',
    },
    // ... (add more data as needed)
  ];

  const expandedColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Rate Type',
      dataIndex: 'rateType',
      key: 'rateType',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Shipping Time',
      dataIndex: 'shippingTime',
      key: 'shippingTime',
    },
    {
      title: 'Processing Time',
      dataIndex: 'processingTime',
      key: 'processingTime',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type='primary' icon={<EditOutlined />} style={{ marginRight: '8px' }} onClick={() => handleAddRate(record)} />
          <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
        </span>
      ),
    },
  ];

  const expandedData = [
    {
      key: '1',
      title: 'Free Shipping',
      rateType: 'Standard',
      price: '$50',
      shippingTime: '3-5 days',
      processingTime: '1 day',
    },
  ];

  return (
    <div>
      <h2>Shipping Zones</h2>
      <Divider />

      <Row gutter={[2, 16]} >
        <Col  span={14}>
          <Search
            placeholder="You can also paste Shewin product URL or ID here"
            allowClear
            enterButton="Search"
            size="default"
          />
        </Col>
        <Col span={4}>
       
        <Button type="primary" danger icon={<CloseOutlined />}>
               Clear
        </Button>
        </Col>
        <Col span={6} style={{display:'flex', justifyContent:'end'}}>
          <Button type="primary" onClick={showModal}>
            Create Shipping Zone
          </Button>
        </Col>
      </Row>

      <Modal
        className="shipping_modal"
        title={editRecord ? 'Edit Shipping Zone' : 'Create Shipping Zone'}
        visible={isModalVisible || isEditModalVisible}
        onOk={handleCreateZone}
        onCancel={handleCancel}
      >
        {/* Always show the Title field */}
        <div>
          <strong style={{ marginBottom: '20px' }}>Title:</strong>
          <Input placeholder="Title" defaultValue={editRecord?.title} style={{ marginBottom: 16 }} />
        </div>

        {/* Rest of the modal content */}
      <div style={{ marginBottom: '10px' }}>  <strong >Select Countries:</strong></div>
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
          {allCountries.map((country) => (
            <div key={country}>
              <Checkbox
                onChange={() => handleCheckboxChange(country)}
                checked={selectedCountries.includes(country)}
              >
                {country}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        className="add_rate_modal"
        title="Add Rate"
        visible={isAddRateModalVisible}
        onOk={handleCreateZone}
        onCancel={handleCancel}
      >
        <Row gutter={16}>
          <Col span={24}>
            <div>
              <label for='title' style={{ marginBottom: '20px' }}>Title:</label>
              <Input id='title' placeholder="Title" defaultValue={editRecord?.title} style={{ marginBottom: 16 }} />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <strong style={{ marginBottom: '20px' }}>Rate Type:</strong>
              <Select defaultValue="flat" style={{ width: '100%' }}>
                <Option value="flat">Flat Rate</Option>
                <Option value="order">Per Order Price</Option>
                <Option value="per_price">Per Weight</Option>
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <strong style={{ marginBottom: '20px' }}>Price:</strong>
              <Input placeholder="Price" style={{ marginBottom: 16 }} />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <strong style={{ marginBottom: '20px' }}>Shipping Time (Days):</strong>
              <Input placeholder="Shipping Time" style={{ marginBottom: 16 }} />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <strong style={{ marginBottom: '20px' }}>Processing Time (Days):</strong>
              <Input placeholder="Processing Time" style={{ marginBottom: 16 }} />
            </div>
          </Col>
        </Row>
      </Modal>

      <Divider />

      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={expandedColumns}
              dataSource={expandedData}
              pagination={false}
              rowKey="key"
            />
          ),
        }}
        rowKey="key"
      />
    </div>
  );
};

export default ShippingZonesComponent;
