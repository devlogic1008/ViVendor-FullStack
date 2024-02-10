import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  DesktopOutlined,
  ProductOutlined ,
  UnorderedListOutlined
 ,MergeOutlined,
 TagOutlined ,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
  ,FileSyncOutlined,
} from '@ant-design/icons';
import shewin from '../../images/shewin.png';
import { Layout, Menu, theme, Modal, Button, Select } from 'antd';
import FindProduct from '../FindProduct/FindProduct';
import ImportList from '../ImportList/ImportList';
import ProductList from '../ProductList/ProductList';
import OrderList from '../OrderList/OrderList';
import StoreSettings from '../StoreSettings/StoreSettings';
import UserInfo from '../UserInfo/UserInfo';
import ProductDetailPage from '../ProductDetail/ProductDetail';
import CreateProduct from '../CreateProduct/CreateProduct';
import ImportCSV from '../ImportCSV/ImportCSV';
import Categories from '../Categories/Categories';
import Tags from '../Tags/Tags';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
    if (key === '8') {
      setModalVisible(true);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            // overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            minWidth:'240px',
            left: 0,
          }}
        >
          <div className="demo-logo-vertical">
            <img
              src={shewin}
              alt="Logo"
              style={{ width: '100%', height: 'auto', padding: '15px' }}
            />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={selectedKeys}
            mode="inline"
            onClick={handleMenuClick}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/find-product">Find Product</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/import-list">Import List</Link>
            </Menu.Item>
            <Menu.SubMenu key="products" icon={<ProductOutlined />} title="Products">
            <Menu.Item key="3"  icon={<UnorderedListOutlined />} >  <Link to="/product-list">All Products</Link></Menu.Item>

              <Menu.Item key="11"  icon=  {<ProductOutlined />}  >  <Link to="/create-product">Create Product</Link></Menu.Item>
              <Menu.Item key="14" icon={<FileSyncOutlined />}> <Link to="/import-csv">Import CSV</Link></Menu.Item>
              <Menu.Item key="12"  icon={<MergeOutlined />}  >  <Link to="/tags">Add Tags</Link></Menu.Item>
              <Menu.Item key="13"  icon={<TagOutlined />}  >  <Link to="/categories">Categories</Link></Menu.Item>
        
            </Menu.SubMenu>
           
            <Menu.Item key="4" icon={<TeamOutlined />}>
              <Link to="/order-list">Order List</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<DesktopOutlined />}>
              <Link to="/create-product">Create Product</Link>
            </Menu.Item>
            <Menu.Item style={{ marginTop: '95%' }} key="5" icon={<FileOutlined />}>
              <Link to="/store-settings">Store Settings</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              <Link to="/files">Help Center</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<DesktopOutlined />}>
              <Link>Shopify Admin</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<UserOutlined />}>
              <Link to="/user-info">Umair500</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Content style={{ margin: '10px 10px', marginLeft: collapsed ? 80 : 212 }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/find-product" element={<FindProduct />} />
                <Route path="/import-list" element={<ImportList />} />
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/order-list" element={<OrderList />} />
                <Route path="/store-settings" element={<StoreSettings />} />
                <Route path="/user-info" element={<UserInfo />} />
                <Route path="/product-detail" element={<ProductDetailPage />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/import-csv" element={<ImportCSV/>} />
                <Route path="/categories" element={<Categories/>} />
                <Route path="/tags" element={<Tags/>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Shewin ©{new Date().getFullYear()} Created by Logic Everest
          </Footer>
        </Layout>

        {/* Shopify Admin Modal */}
        <Modal
          title="Shopify Admin"
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={handleModalCancel}>
              OK
            </Button>,
          ]}
        >
          <h3>Choose your Store</h3>
          <Select
            showSearch
            style={{ width: '50%' }}
            placeholder="Select your store"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="store1">Store 1</Option>
            <Option value="store2">Store 2</Option>
            <Option value="store2">Store 2</Option>
            {/* Add more stores as needed */}
          </Select>
          <p>
            <Button
              type="primary"
              icon={<UserOutlined />}
              style={{ width: '50%', marginTop: '5px' }}
            >
              Add Account
            </Button>
          </p>
        </Modal>
      </Layout>
    </Router>
  );
};

export default SideNav;
