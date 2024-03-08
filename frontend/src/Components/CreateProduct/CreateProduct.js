import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Button,
  Checkbox,

  Divider,
  notification,
  Table,
  message,
  Modal,

} from "antd";
import { Upload } from "antd";
import {PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import "./CreateProduct.css";
import { TagsInput } from "react-tag-input-component";
import { fetchCategories } from "../../Redux/Slices/CategorySlice";
import { createProductAsync } from "../../Redux/Slices/ProductSlice";
import { useSelector, useDispatch } from "react-redux";

const AddNewProductPage = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [showVariantOptions, setShowVariantOptions] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [variantOptions, setVariantOptions] = useState([
    { attributeName: "", tags: [] },
  ]);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);


  const [organizationTags, setOrganizationTags] = useState([]);
  useEffect(() => {
    dispatch(fetchCategories()); // Dispatch the action to fetch categories
  }, [dispatch]);

  useEffect(() => {
    // Generate table data whenever variantOptions change
    generateTableData();
  }, [variantOptions]);


  
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false; // Prevent default upload behavior
  };

  const onFinish = async () => {
    try {
      setSaving(true);
  
      const values = await form.validateFields();
  
      if (values.title.trim() === "") {
        notification.warning({
          message: "Validation Error",
          description: "Please enter a title",
        });
        return;
      }
  
      const formData = new FormData();
  
      if (showVariantOptions) {
        const variantCombinations = generateVariantCombinations();
        const variantsString = JSON.stringify(variantCombinations);
  
        formData.append("variants", variantsString);
        console.log("🚀 ~ onFinish ~ variantsString:", variantsString)
      }
  
      // Append regular form fields
      Object.entries(values).forEach(([key, value]) => {
        if (key === "categories") {
          value.forEach((category) => {
            formData.append("categories", category);
          });
        } else {
          formData.append(key, value);
        }
      });
  
      // Append organizationTags as a comma-separated string
      formData.append("tags", organizationTags.join(','));
  
      // Append images
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
  
      // Dispatch the createProductAsync thunk with the FormData
      const response = await dispatch(createProductAsync(formData));
  
      if (response && response.payload && response.payload.success) {
        notification.success({
          message: "Product Saved",
          description: "Product has been successfully saved.",
        });
      } else {
        notification.error({
          message: "Failed to create product",
          description: (response && response.payload && response.payload.message) || "An error occurred while saving the product.",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failed to create product",
        description: "An unexpected error occurred.",
      });
    } finally {
      setSaving(false);
    }
  };
  
  
  

  const handleVariantCheckboxChange = (e) => {
    setShowVariantOptions(e.target.checked);
  };
  const handleOrganizationTagsChange = (tags) => {
    setOrganizationTags(tags);
  };
  const addAnotherOption = () => {
    if (variantOptions.length >= 3) {
      notification.warning({
        message: "Limit Exceeded",
        description: "You can only add up to three variant options.",
        duration: 2,
        placement: "bottomRight",
        style: {
          backgroundColor: "#ff4d4f",
          color: "white",
        },
      });
    } else {
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
        setVariantOptions([
          ...variantOptions,
          { attributeName: "", tags: [] },
        ]);

        // Preserve the existing table data and update it with the new combinations
        const existingData = [...tableData];
        const newData = generateCombinations([
          ...variantOptions,
          { attributeName: "", tags: [] },
        ]);
        setTableData([...existingData, ...newData]);
      }
    }
  };


  const handleOptionChange = (index, field, value) => {
    setVariantOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index][field] = value;

      // Update table data when attributeName changes
      if (field === "attributeName") {
        const existingData = [...tableData];
        const newData = generateCombinations([
          ...updatedOptions,
          { attributeName: "", tags: [] },
        ]);
        setTableData([...existingData, ...newData]);
      }

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
        const combinationObj = {
          key: combinations.length,
          title: currentCombination,
        };
  
        // Initialize other properties with empty strings
        columns.forEach((column) => {
          if (column.dataIndex !== 'title') {
            combinationObj[column.dataIndex] = '';
          }
        });
  
        combinations.push(combinationObj);
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
  
  const generateVariantCombinations = () => {
    const variantCombinations = tableData.map((item) => {
      const combination = {
        title: item.title,
        price: item.price || "",
        cog: item.cog || "",
        quantity: item.quantity || "",
        sku: item.sku || "",
        cost: item.cost || "",
        barcode: item.barcode || "",
      };
  
      // Include attributeName options
      for (let i = 0; i < variantOptions.length; i++) {
        const attributeName = variantOptions[i].attributeName;
        const optionKey = `option${i + 1}`;
        combination[optionKey] = attributeName || null;
      }
  
      return combination;
    });
  
    return variantCombinations;
  };
  
  
  
  const handleInputChange = (key, field, value) => {
    setTableData((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          const updatedItem = { ...item, [field]: value };
          // console.log("Updated Item:", updatedItem);
          return updatedItem;
        } else {
          return item;
        }
      })
    );
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
      render: (_, record) => (
        <Input
        name="price"
          placeholder="$0.00"
        
          value={record.price}
          onKeyPress={handleAlphaKeyPress}
          onChange={(e) => handleInputChange(record.key, "price", e.target.value)}
        />
      ),
    },
    {
      title: "COG",
      dataIndex: "cog",
      key: "cog",
      
      render: (_, record) => (
        <Input
        name="cog"
          placeholder="$0.00"
          value={record.cog}
          onKeyPress={handleAlphaKeyPress}
          onChange={(e) => handleInputChange(record.key, "cog", e.target.value)}
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Input
          placeholder="0"
          value={record.quantity}
          onKeyPress={handleAlphaKeyPress}
          onChange={(e) => handleInputChange(record.key, "quantity", e.target.value)}
        />
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (_, record) => (
        <Input
          placeholder="SKU"
          value={record.sku}
      
          onChange={(e) => handleInputChange(record.key, "sku", e.target.value)}
        />
      ),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (_, record) => (
        <Input
          placeholder="$0.00"
          value={record.cost}
          onKeyPress={handleAlphaKeyPress}
          onChange={(e) => handleInputChange(record.key, "cost", e.target.value)}
        />
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render: (_, record) => (
        <Input
          placeholder="Barcode"
          value={record.barcode}
          onChange={(e) => handleInputChange(record.key, "barcode", e.target.value)}
        />
      ),
    },
  ];


  const handleKeyPress = (event) => {
    // Prevent user from typing numeric characters
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  };
  const handleAlphaKeyPress = (event) => {
    // Prevent user from typing alphabetic characters
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      event.preventDefault();
    }
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
            <Button type="primary" onClick={() => form.submit()} loading={saving}>
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
                <Input
                  onKeyPress={handleKeyPress}
                  placeholder="Please enter the product title!"
                />
              </Form.Item>
              <label>Description</label>
              <Form.Item name="body_html">
                <JoditEditor />
              </Form.Item>
            </div>
            <div className="product_images">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleFileChange}
                beforeUpload={beforeUpload}
              >
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
              <Modal
                visible={previewVisible}
                title="Preview"
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="Preview"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>

            <h4 className="pricing">PRICING / SHIPPING / INVENTORY</h4>
            <div className="product_title">
              <Row gutter={[18, 8]}>
                <Col span={8}>
                  <label>Cost Price</label>
                  <Form.Item name="costPrice">
                    <Input
                      type="number"
                      onKeyPress={handleAlphaKeyPress}
                      className="cost_input"
                      placeholder="$ 0.00"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>COG</label>
                  <Form.Item name="cog">
                    <Input
                      type="number"
                      onKeyPress={handleAlphaKeyPress}
                      className="cost_input"
                      placeholder="$ 0.00"
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <label>Recommended Price</label>
                  <Form.Item name="recommendedPrice">
                    <Input
                      type="number"
                      onKeyPress={handleAlphaKeyPress}
                      className="cost_input"
                      placeholder="$ 0.00"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>Quantity</label>
                  <Form.Item name="quantity">
                    <Input
                      className="cost_input"
                      onKeyPress={handleAlphaKeyPress}
                      placeholder="0"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>Weight</label>
                  <Form.Item name="weight">
                    <Input
                      className="cost_input"
                      onKeyPress={handleAlphaKeyPress}
                      placeholder="0.0kg"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>SKU</label>
                  <Form.Item name="sku">
                    <Input
                      className="cost_input "
                      onKeyPress={handleKeyPress}
                      placeholder="SKU"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <label>Barcode</label>
                  <Form.Item name="barcode">
                    <Input
                      className="cost_input"
                      onKeyPress={handleKeyPress}
                      placeholder="Barcode"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>Length(cm)</label>
                  <Form.Item name="length">
                    <Input
                      className="cost_input"
                      onKeyPress={handleAlphaKeyPress}
                      placeholder="Length"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>Width(cm)</label>
                  <Form.Item name="width">
                    <Input
                      className="cost_input"
                      onKeyPress={handleAlphaKeyPress}
                      placeholder="Width"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <label>Height(cm)</label>
                  <Form.Item name="height">
                    <Input
                      className="cost_input"
                      onKeyPress={handleAlphaKeyPress}
                      placeholder="Height"
                    />
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
            <div className="product_categories">
              <label>
                <strong>PRODUCT CATEGORY</strong>
              </label>
              <div className="category_status ">
                <Form.Item name="categories" initialValue={[]} noStyle>
                  <Checkbox.Group style={{ width: "100%" }}>
                    {categories
                      .filter((category) => !category.parentCategoryId)
                      .map((parentCategory) => (
                        <Checkbox
                          key={parentCategory.id}
                          value={parentCategory.title}
                        >
                          {parentCategory.title}
                        </Checkbox>
                      ))}
                  </Checkbox.Group>
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
                  <Input onKeyPress={handleKeyPress} placeholder="eg. Shirts" />
                </Form.Item>
                <label>Vendor</label>
                <Form.Item name="vendor">
                  <Input onKeyPress={handleKeyPress} placeholder="eg. Nike" />
                </Form.Item>
                <label>Add Tags</label>
                <Form.Item name="tags" initialValue={[]}>
                  <div>
                    <TagsInput
                      className="add_tags"
                      placeHolder="eg. tags"
                      value={organizationTags}
                      onChange={handleOrganizationTagsChange}
                    />
                  </div>
                </Form.Item>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={24} md={18} lg={18}>
            <div className="product_status">
              <label>
                <strong>VARIANT</strong>
              </label>
              <div className="status">
                <Form.Item name="variants" initialValue={[]} valuePropName="">
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
                        name="attribute"
                        key={index}
                        // label={<label>{`Option${index + 1}`}</label>}
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
          <Button type="primary" onClick={() => form.submit()} loading={saving}>
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AddNewProductPage;
