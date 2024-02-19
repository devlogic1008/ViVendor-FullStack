import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Radio, Button, Checkbox, Select, Divider, notification, Table ,message,Modal} from 'antd';
import { Upload } from 'antd';
import { InboxOutlined ,PlusOutlined} from '@ant-design/icons';
import JoditEditor from 'jodit-react';
import './CreateProduct.css';
import { TagsInput } from 'react-tag-input-component';

const { Dragger } = Upload;
const { Option } = Select;
const data = [
  'Tops',
  'Bags ',
  'Shoes ',
  'Bottoms',
  'Dresses',
  'Outer',
  'Inner ',

];
const AddNewProductPage = () => {
  const [form] = Form.useForm();
  const [showVariantOptions, setShowVariantOptions] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [variantOptions, setVariantOptions] = useState([{ attributeName: '', tags: [] }]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Generate table data whenever variantOptions change
    generateTableData();
  }, [variantOptions]);

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle form submission logic here
  };

  const handleVariantCheckboxChange = (e) => {
    setShowVariantOptions(e.target.checked);
  };


  const addAnotherOption = () => {
    const emptyFields = variantOptions.some((option) => !option.attributeName || option.tags.length === 0);

    if (emptyFields) {
      notification.warning({
        message: 'Empty Fields',
        description: 'Please fill in all variant fields before adding another option.',
        duration: 2,
        placement: 'bottomRight',
        style: {
          backgroundColor: '#ff4d4f',
          color: 'white',
        },
      });
    } else {
      setVariantOptions([...variantOptions, { attributeName: '', tags: [] }]);

      // Preserve the existing table data and update it with the new combinations
      const existingData = [...tableData];
      const newData = generateCombinations([...variantOptions, { attributeName: '', tags: [] }]);
      setTableData([...existingData, ...newData]);
    }
  };




  const handleOptionChange = (index, field, value) => {
    setVariantOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index][field] = value;
      return updatedOptions;
    });
  };

  const handleTagChange = (index, tags) => {
    handleOptionChange(index, 'tags', tags);
  };

  const generateTableData = () => {
    // Generate table data
    const newData = generateCombinations(variantOptions);
    setTableData(newData);
  };

  const generateCombinations = (options) => {
    const combinations = [];
    const generate = (index, currentCombination) => {
      if (index === options.length) {
        combinations.push({ key: combinations.length, title: currentCombination });
        return;
      }
      for (const tag of options[index].tags) {
        generate(index + 1, currentCombination ? `${currentCombination} / ${tag}` : tag);
      }
    };

    generate(0, '');
    return combinations;
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <Input placeholder='$0.00' />
      ),
    },
    {
      title: 'COG',
      dataIndex: 'cog',
      key: 'cog',
      render: (_, record) => (
        <Input placeholder='$0.00' />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <Input placeholder='0' />
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (_, record) => (
        <Input placeholder='SKU' />
      ),
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (_, record) => (
        <Input placeholder='Barcode' />
      ),
    },
  ];
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (file.url || file.preview) {
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

  const customRequest = ({ onSuccess }) => {
    // Simulating file upload success
    setTimeout(() => {
      onSuccess();
      message.success('Image uploaded successfully.');
    }, 2000);
  };


  return (
    <div className='add_new_product' >
      <div className='product_head'>
        <h2 className='Product_heading'>
          Add New Product
        </h2>
        <div>
          <Button type="primary" className='discard_btn' ghost  >
            Discard
          </Button>
          <Button type="primary">
            Save
          </Button>
        </div>
      </div>
      <Row gutter={[18, 8]}>
        <Col span={18}>
          <div className='product_title'>
            <Form
              form={form}
              name="addNewProductForm"
              onFinish={onFinish}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item
                label={<strong>Title</strong>}
                name="title"
                rules={[{ message: 'Please enter the product title!' }]}
              >
                <Input placeholder='Please enter the product title!' />
              </Form.Item>

              <Form.Item
                label={<strong> Description</strong>}
                name="description"
              >
                <JoditEditor

                  tabIndex={1}
                  onBlur={(content) => console.log('onBlur event', content)}
                  onChange={(content) => console.log('onChange event', content)}
                />
              </Form.Item>

             
            </Form>
          </div>
          <div className="product_images" >
           
          <Upload
         
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        listType="picture-card"
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
          showDownloadIcon: false,
        }}
        maxCount={5} // Set your desired count limitation here
        multiple
      >
        {fileList.length >= 5 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>

      <Modal
        visible={previewVisible}
        title="Preview"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
          </div>
         
        <h4 className='pricing' >
            PRICING / SHIPPING / INVENTORY
          </h4>
          <div className='product_title'>
            <Row gutter={[18, 8]}>
              <Col span={8}>
                <Form

                  form={form}
                  name="pricingForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item

                    label='Cost Price'
                    name="costPrice"
                  >
                    <Input className='cost_input' placeholder='$ 0.00' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <Form
                  form={form}
                  name="pricingForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='COG'
                    name="cog"
                  >
                    <Input placeholder='$ 0.00' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <Form
                  form={form}
                  name="pricingForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item

                    label='Recommended Price'
                    name="recommendedPrice"
                  >
                    <Input placeholder='$ 0.00' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item

                    label='Quantity '
                    name="quantity"
                    type="number"
                  >
                    <Input placeholder='0' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='Weight '
                    name="weight"
                    type="number"
                  >
                    <Input placeholder='0.0Kg' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='SKU '
                    name="sku"
                    type="number"
                  >
                    <Input placeholder='SKU' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='Barcode '
                    name="barcode"
                  >
                    <Input placeholder='Barcode' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='Length(cm) '
                    name="length"
                  >
                    <Input placeholder='Length' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='Width(cm) '
                    name="width"
                  >
                    <Input placeholder='Width' />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8}>
                <Form
                  form={form}
                  name="inventoryForm"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label='Height(cm) '
                    name="height"
                  >
                    <Input placeholder='Height' />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
       


        </Col>
        <Col span={6}>
          <div className='product_status'>
            <Form
              form={form}
              name="statusForm"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item label={<strong>Status</strong>} style={{ margin: 0 }}>
                <Form.Item name="status" initialValue="published" noStyle>
                  <Radio.Group>
                    <Radio style={{ display: 'block' }} value="published">Published</Radio>
                    <Radio style={{ display: 'block' }} value="draft">Draft</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
          <div className='product_status'>
            <Form
              form={form}
              name="statusForm"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item label={<strong>Sort By</strong>} style={{ margin: 0 }}>
                <Form.Item name="sortBy" initialValue="published" noStyle>
                  <Radio.Group>
                    <Radio style={{ display: 'block' }} value="bestSeller">Best Seller</Radio>
                    <Radio style={{ display: 'block' }} value="WinningProduct">Winning Product</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
          <div className='product_status' >
            <Form
              form={form}
              name="sortByForm"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Form.Item label={<strong>PRODUCT CATEGORY</strong>} style={{ margin: 0 }}>
                <Form.Item name="productCategory" initialValue="bestSeller" noStyle>
                  <Checkbox.Group>
                    <Checkbox value="bestSeller">Bath & Body</Checkbox>
                    <Checkbox value="Outdoor">Outdoor Recreation</Checkbox>
                    <Checkbox value="Loungewear">Loungewear & Lingerie</Checkbox>
                    <Checkbox value="Kids">Kids Toys & Accessories</Checkbox>
                    <Checkbox value="Hair">Hair & Beauty</Checkbox>
                    <Checkbox value="winningProduct">Beachwear & Beach Accessories</Checkbox>
                    <Checkbox value="winningProduct">Jewelry, Bags & Accessories</Checkbox>
                    <Checkbox value="winningProduct">Fitness Gears</Checkbox>
                    <Checkbox value="winningProduct">Home Decor, Furniture & Gadgets</Checkbox>
                    <Checkbox value="winningProduct">Men's Fashion</Checkbox>
                    <Checkbox value="winningProduct">Children Fashion</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
          <div className='product_status'>
  <Form
    form={form}
    name="organizationform"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
  >
    <Form.Item label={<strong>ORGANIZATION</strong>}>

    </Form.Item>
    <Form.Item label='Product Type' name="productType">
      <Input placeholder='eg. Shirts' />
    </Form.Item>
    <Form.Item label='Vendor' name="vendor">
      <Input placeholder='eg. Nike' />
    </Form.Item>
    <Form.Item label='Add Tags' name="addTags">
    <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select filters"
           
          >
            {data.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
    </Form.Item>
  </Form>
</div>

        </Col>
        
       
        <Col span={18}>
          <div className='product_status'>
            <Form
              form={form}
              name="variantForm"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ variant: 'bestSeller' }}
            >
              <Form.Item label={<strong>VARIANT</strong>} style={{ margin: 0 }}>
                <Form.Item name="variant" valuePropName="" noStyle>
                  <Checkbox onChange={handleVariantCheckboxChange}>
                    This product has multiple options, like different sizes or colors
                  </Checkbox>
                </Form.Item>
              </Form.Item>
            </Form>
            <Divider />
            {showVariantOptions && (
              <div className='variant_options'>
                <Form
                  form={form}
                  name="variant_options"
                  onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  {variantOptions.map((option, index) => (
                    <Form.Item key={index} label={<strong>{`Option${index + 1}`}</strong>}>

                      <div className='attribtes'  >
                        <Input
                          placeholder='Attribute name'
                          name='attributeName'
                          className='attribute_name'
                          size="small"

                          value={option.attributeName}
                          onChange={(e) => handleOptionChange(index, 'attributeName', e.target.value)}
                        />

                        <TagsInput
                          className='add_tags'
                          placeHolder='Add Tags here'
                          value={option.tags}
                          onChange={(tags) => handleTagChange(index, tags)}
                          handleOptionChange={(field, value) => handleOptionChange(index, field, value)}
                        />
                      </div>
                    </Form.Item>
                  ))}
                </Form>
                <Button type="primary" ghost onClick={addAnotherOption}>
                  Add another option
                </Button>
                <Divider />
                <div className='preview'>
                  <h3 className='preview_head' >Preview</h3>
                  <Row gutter={[18, 8]}>
                    <Col span={24}>
                      <Table columns={columns} dataSource={tableData} pagination={false} />
                    </Col>
                    <Divider />
                  </Row>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
     
      <Row gutter={[18, 8]}>
       
      </Row>
      <Divider />
      <div className='submit_btn' >
        <Button type="primary" className='discard_btn' ghost style={{ marginRight: '2px' }}>
          Discard
        </Button>
        <Button type="primary" onClick={generateTableData}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddNewProductPage;
