import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Button,
  Checkbox,
  Select,
  Divider,
  notification,
  Table,
  message,
  Modal,
} from "antd";
import { Upload } from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import "./CreateProduct.css";
import { TagsInput } from "react-tag-input-component";
import { fetchCategories } from "../../Redux/Slices/CategorySlice";
import { fetchTags } from "../../Redux/Slices/TagSlice";
import { createProductAsync,
} from "../../Redux/Slices/ProductSlice";
import { useSelector, useDispatch } from "react-redux";

const { Dragger } = Upload;
const { Option } = Select;

const AddNewProductPage = () => {
  const [form] = Form.useForm();
  const [showVariantOptions, setShowVariantOptions] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [variantOptions, setVariantOptions] = useState([
    { attributeName: "", tags: [] },
  ]);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const tags = useSelector((state) => state.tag.tags);
  const data = tags.map((tag) => tag.title);

  useEffect(() => {
    dispatch(fetchCategories()); // Dispatch the action to fetch categories
    dispatch(fetchTags()); // Dispatch the action to fetch tags
  }, [dispatch]);

  useEffect(() => {
    // Generate table data whenever variantOptions change
    generateTableData();
  }, [variantOptions]);

  const onFinish = async () => {
    try {
      // Validate the form fields
      const values = await form.validateFields();
      if (values.costPrice ) {
        values.costPrice = parseInt(values.costPrice);
      }

      // Dispatch the createProductAsync thunk with the product data
      await dispatch(createProductAsync(values));

      // Handle success, e.g., show a success message or redirect
      notification.success({
        message: 'Product Saved',
        description: 'Product has been successfully saved.',
      });
    } catch (error) {
      // Handle validation error or other errors
      notification.error('Failed to create product');
    }
  };

  const handleVariantCheckboxChange = (e) => {
    setShowVariantOptions(e.target.checked);
  };

  const addAnotherOption = () => {
    const emptyFields = variantOptions.some(
      (option) => !option.attributeName || option.tags.length === 0
    );

    if (emptyFields) {
      notification.warning({
        message: "Empty Fields",
        description:
          "Please fill in all variant fields before adding another option.",
        duration: 2,
        placement: "bottomRight",
        style: {
          backgroundColor: "#ff4d4f",
          color: "white",
        },
      });
    } else {
      setVariantOptions([...variantOptions, { attributeName: "", tags: [] }]);

      // Preserve the existing table data and update it with the new combinations
      const existingData = [...tableData];
      const newData = generateCombinations([
        ...variantOptions,
        { attributeName: "", tags: [] },
      ]);
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
    handleOptionChange(index, "tags", tags);
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
        combinations.push({
          key: combinations.length,
          title: currentCombination,
        });
        return;
      }
      for (const tag of options[index].tags) {
        generate(
          index + 1,
          currentCombination ? `${currentCombination} / ${tag}` : tag
        );
      }
    };

    generate(0, "");
    return combinations;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <Input placeholder="$0.00" />,
    },
    {
      title: "COG",
      dataIndex: "cog",
      key: "cog",
      render: (_, record) => <Input placeholder="$0.00" />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => <Input placeholder="0" />,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (_, record) => <Input placeholder="SKU" />,
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render: (_, record) => <Input placeholder="Barcode" />,
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
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  const customRequest = ({ onSuccess, file }) => {
    // Simulating file upload success
    setTimeout(() => {
      onSuccess();
      message.success("Image uploaded successfully.");

      // Log the image information to the console
      console.log("Uploaded Image:", file);
    }, 1000);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="add_new_product">
        <div className="product_head">
          <h2 className="Product_heading">Add New Product</h2>
          <div>
            <Button type="primary" className="discard_btn" ghost>
              Discard
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Save
            </Button>
          </div>
        </div>
        <Row gutter={[18, 8]}>
          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="product_title">
              <label>Title</label>
              <Form.Item
                name="title"
                type="text"
                rules={[{ message: "Please enter the product title!" }]}
              >
                <Input placeholder="Please enter the product title!" />
              </Form.Item>
              <label>Description</label>
              <Form.Item name="body_html">
                <JoditEditor
                  tabIndex={1}
                  onBlur={(content) => console.log("onBlur event", content)}
                  onChange={(content) => console.log("onChange event", content)}
                />
              </Form.Item>
            </div>
            <div className="product_images">
              <Form.Item name='image'>
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
                  <img
                    alt="Preview"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
            </div>

            <h4 className="pricing">PRICING / SHIPPING / INVENTORY</h4>
            <div className="product_title">
              <Row gutter={[18, 8]}>
                <Col span={8}>
                  <label>Cost Price</label>
                  <Form.Item name="costPrice" >
                    <Input className="cost_input" placeholder="$ 0.00" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>COG</label>
                  <Form.Item name='cog' type='number'>
                    <Input className="cost_input" placeholder="$ 0.00" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <label>Recommended Price</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="$ 0.00" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>Quantity</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="0" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>Weight</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="0.0kg" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>SKU</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="SKU" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>Barcode</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="Barcode" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>Length(cm)</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="Length" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>Width(cm)</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="Width" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>Height(cm)</label>
                  <Form.Item>
                    <Input className="cost_input" placeholder="Height" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="product_status">
              <label>
                <strong>Status</strong>
              </label>

              <div className="status">
                {" "}
                <Form.Item name="status" initialValue="published" noStyle>
                  <Radio.Group>
                    <Radio style={{ display: "block" }} value="published">
                      Published
                    </Radio>
                    <Radio style={{ display: "block" }} value="draft">
                      Draft
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="product_status">
              <label>
                <strong>Sort By</strong>
              </label>
              <div className="status">
                <Form.Item name="sortBy" initialValue="published" noStyle>
                  <Radio.Group>
                    <Radio style={{ display: "block" }} value="bestSeller">
                      Best Seller
                    </Radio>
                    <Radio style={{ display: "block" }} value="WinningProduct">
                      Winning Product
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="product_status">
              <label>
                <strong>PRODUCT CATEGORY</strong>
              </label>
              <div className="status">
                <Form.Item name="categories" initialValue={[]} noStyle>
                  <div className="new-line-checkbox ">
                    <Checkbox.Group>
                      {categories
                        .filter((category) => !category.parentCategoryId)
                        .map((parentCategory) => (
                          <Checkbox
                            key={parentCategory.id}
                            value={parentCategory.id}
                          >
                            {parentCategory.title}
                          </Checkbox>
                        ))}
                    </Checkbox.Group>
                  </div>
                </Form.Item>
              </div>
            </div>
            <div className="product_status">
              <label>
                <strong>ORGANIZATION</strong>
              </label>

              <div className="status">
                <label>Product Type</label>
                <Form.Item name="product_type">
                  <Input placeholder="eg. Shirts" />
                </Form.Item>
                <label>Vendor</label>
                <Form.Item name="vendor">
                  <Input placeholder="eg. Nike" />
                </Form.Item>
                <label>Add Tags</label>
                <Form.Item  name="tags" initialValue={[]}>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select filters"
                  >
                    {data.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="product_status">
             
               <label><strong>VARIANT</strong></label>
               <div className="status">
               <Form.Item name="variants" initialValue={[]} valuePropName="" >
                    <Checkbox onChange={handleVariantCheckboxChange}>
                      This product has multiple options, like different sizes or
                      colors
                    </Checkbox>
                  </Form.Item>
               </div>
                
               
            
              <Divider />
              {showVariantOptions && (
                <div className="variant_options">
                <div className="status">

               
                    {variantOptions.map((option, index) => (
                      <Form.Item
                      name='attribute'
                        key={index}
                        label={<strong>{`Option${index + 1}`}</strong>}
                      >
                        <div className="attribtes">
                          <Input
                            placeholder="Attribute name"
                            name="attributeName"
                            className="attribute_name"
                            size="small"
                            value={option.attributeName}
                            onChange={(e) =>
                              handleOptionChange(
                                index,
                                "attributeName",
                                e.target.value
                              )
                            }
                          />

                          <TagsInput
                            className="add_tags"
                            placeHolder="Add Tags here"
                            value={option.tags}
                            onChange={(tags) => handleTagChange(index, tags)}
                            handleOptionChange={(field, value) =>
                              handleOptionChange(index, field, value)
                            }
                            style={{ borderColor: "#1677ff" }}
                          />
                        </div>
                      </Form.Item>
                    ))}
                  </div>
                  <Button type="primary" ghost onClick={addAnotherOption}>
                    Add another option
                  </Button>
                  <Divider />
                  <div className="preview">
                    <h3 className="preview_head">Preview</h3>
                    <Row gutter={[18, 8]}>
                      <Col span={24}>
                        <Table
                          className="variant_table"
                          columns={columns}
                          dataSource={tableData}
                          pagination={false}
                        />
                      </Col>
                      <Divider />
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row gutter={[18, 8]}></Row>
        <Divider />
        <div className="submit_btn">
          <Button
            type="primary"
            className="discard_btn"
            ghost
            style={{ marginRight: "2px" }}
          >
            Discard
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AddNewProductPage;
