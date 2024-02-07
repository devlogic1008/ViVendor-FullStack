import React, { useState } from 'react';
import { Row, Col, Form, Input, Radio, Button, Checkbox, Select } from 'antd';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import JoditEditor from 'jodit-react';
import './CreateProduct.css';

const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

const AddNewProductPage = () => {
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Handle form submission logic here
    };

    const onDrop = (acceptedFiles) => {
        console.log('Accepted files:', acceptedFiles);
        setFileList(
            acceptedFiles.map((file) => ({
                uid: file.name,
                name: file.name,
                status: 'done',
                url: URL.createObjectURL(file),
            }))
        );
    };

    const onRemove = (file) => {
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ borderBottom: '1px solid rgb(235, 237, 240)', paddingBottom: '10px', fontWeight: 'bold' }}>
                    Add New Product
                </h2>
                <div>
                    <Button type="primary" ghost style={{ marginRight: '5px' }}>
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
                                label={<strong>Long Description</strong>}
                                name="description"

                            >
                                <JoditEditor
                                    tabIndex={1}
                                    onBlur={(content) => console.log('onBlur event', content)}
                                    onChange={(content) => console.log('onChange event', content)}

                                />
                            </Form.Item>
                            <Form.Item style={{ marginTop: '15%' }}
                                label={<strong>Shipping Info</strong>}
                                name="shippingInfo"

                            >
                                <JoditEditor
                                    tabIndex={2}
                                    onBlur={(ct) => console.log('onBlur event', ct)}
                                    onChange={(ct) => console.log('onChange event', ct)}
                                />
                            </Form.Item>

                            {/* Add other product fields as needed */}
                        </Form>
                    </div>
                    <div className="product_images" style={{ marginTop: "4%" }}>
                        <Dragger
                            fileList={fileList}
                            onDrop={onDrop}
                            onRemove={onRemove}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag images to this area to upload</p>
                        </Dragger>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='product_status'>
                        <Form
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
                    <div className='product_status' style={{ marginTop: '20px' }}>
                        <Form
                            name="sortByForm"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Form.Item label={<strong>SORT BY</strong>} style={{ margin: 0 }}>
                                <Form.Item name="sortBy" initialValue="bestSeller" noStyle>
                                    <Checkbox.Group>
                                        <Checkbox value="bestSeller">Bath & Body</Checkbox>
                                        <Checkbox value="winningProduct">Outdoor Recreation</Checkbox>
                                        <Checkbox value="winningProduct">Loungewear & Lingerie</Checkbox>
                                        <Checkbox value="winningProduct">Kids Toys & Accessories</Checkbox>
                                        <Checkbox value="winningProduct">Hair & Beauty</Checkbox>
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

                    <div className='product_status' style={{ marginTop: '20px' }}>
                        <Form
                            name="additionalInfoForm"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Form.Item label={<strong>ORGANIZATION</strong>} name="organization">

                            </Form.Item>
                            <Form.Item label={<strong>Product Type</strong>} name="productType">
                                <Input placeholder='eg. Shirts' />
                            </Form.Item>
                            <Form.Item label={<strong>Vendor</strong>} name="vendor">
                                <Input placeholder='eg. Nike' />
                            </Form.Item>
                            <Form.Item label={<strong>Tags</strong>} name="tags" style={{ margin: 0 }}>
                                <Select mode="tags" placeholder="Select or enter tags">
                                    {/* Tags options go here */}
                                    <Option key="Tag1">Tag1</Option>
                                    <Option key="Tag2">Tag2</Option>
                                    <Option key="Tag3">Tag3</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row gutter={[18, 8]}>
                <Col span={18}>
                    <div className='product_title' style={{ marginTop: '20px' }}>
                        <Row gutter={[18, 8]}>
                            {/* <Form.Item label={<strong>PRICING / SHIPPING / INVENTORY</strong>} ></Form.Item> */}

                            <Col span={8}>
                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Cost Price</strong>}
                                        name="costPrice"

                                    >
                                        <Input placeholder='$ 0.00' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={8}>
                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>COG</strong>}
                                        name="cog"

                                    >
                                        <Input placeholder='$ 0.00' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={8}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Recommended Price</strong>}
                                        name="cog"

                                    >
                                        <Input placeholder='$ 0.00' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={12}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Quantity </strong>}
                                        name="cog"
                                        type="number"

                                    >
                                        <Input placeholder='0' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={12}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Weight </strong>}
                                        name="cog"
                                        type="number"

                                    >
                                        <Input placeholder='0.0Kg' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={12}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>SKU </strong>}
                                        name="sku"
                                        type="number"

                                    >
                                        <Input placeholder='SKU' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={12}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Barcode </strong>}
                                        name="barcode"


                                    >
                                        <Input placeholder='Barcode' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                            <Col span={8}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Length(cm) </strong>}
                                        name="barcode"


                                    >
                                        <Input placeholder='Length' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>

                            <Col span={8}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>Width(cm)</strong>}
                                        name="Width"


                                    >
                                        <Input placeholder='Width' />
                                    </Form.Item>




                                </Form>
                            </Col>
                            <Col span={8}>

                                <Form
                                    name="addNewProductForm"
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >

                                    <Form.Item
                                        label={<strong>
                                            Height(cm)</strong>}
                                        name="Height"


                                    >
                                        <Input placeholder='Height' />
                                    </Form.Item>



                                    {/* Add other product fields as needed */}
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default AddNewProductPage;
