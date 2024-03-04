import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  DesktopOutlined,
  ProductOutlined,
  UnorderedListOutlined,
  MergeOutlined,
  TagOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FileSyncOutlined,
  MenuOutlined,
  TruckOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import shewin from '../../images/vlogo.png';
import { Layout, Menu, Drawer, Button, Select, Modal } from 'antd';
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
import ShippingZones from '../ShippingZones/ShippingZones';
import CourierService from '../CourierService/CourierService';
import AddStaff from '../AddStaff/AddStaff';
import StaffList from '../StaffList/StaffList';
import './SideNav.css';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const SideNav = () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [siderVisible, setSiderVisible] = useState(window.innerWidth > 768);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
    if (key === '13') {
      setModalVisible(true);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setSiderVisible(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Mobile Header */}
      {!siderVisible && <Header className="top_header"></Header>}
      {/* PC Sidebar */}
      {siderVisible && (
        <Sider
          style={{
            height: '100vh',
            minWidth: '240px',
            position: 'fixed',
            overflowY: 'hidden',
            overflowX: 'auto',
            height: '100vh',
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
            <Menu.SubMenu
              key="products"
              icon={<ProductOutlined />}
              title="Products"
            >
              <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                <Link to="/product-list">All Products</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<ProductOutlined />}>
                <Link to="/create-product">Create Product</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<FileSyncOutlined />}>
                <Link to="/import-csv">Import CSV</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<TagOutlined />}>
                <Link to="/tags">Add Tags</Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<MergeOutlined />}>
                <Link to="/categories">Categories</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="8" icon={<TeamOutlined />}>
              <Link to="/order-list">Order List</Link>
            </Menu.Item>

            <Menu.SubMenu
              key="shiping"
              icon={<ShoppingCartOutlined />}
              title="Shipping"
            >
              <Menu.Item key="9" icon={<ShoppingCartOutlined />}>
                <Link to="/shipping-zones">Shipping Zones</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<TruckOutlined />}>
                <Link to="/courier-service-providers">Courier Service</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item
              style={{ marginTop: '40%' }}
              key="11"
              icon={<FileOutlined />}
            >
              <Link to="/store-settings">Store Settings</Link>
            </Menu.Item>
            {/* User Staff start */}

            <Menu.SubMenu
              key="user-staff"
              icon={<TeamOutlined />}
              title="Staff"
            >
              <Menu.Item key="12" icon={<TeamOutlined />}>
                <Link to="/">Create Staff</Link>
              </Menu.Item>
              <Menu.Item key="13" icon={<TeamOutlined />}>
                <Link to="/">Staff List</Link>
              </Menu.Item>
            </Menu.SubMenu>

            {/* User staff End  */}

            <Menu.Item key="14" icon={<DesktopOutlined />}>
              <Link>Shopify Admin</Link>
            </Menu.Item>
            <Menu.Item key="15" icon={<UserOutlined />}>
              <Link to="/user-info">Umair500</Link>
            </Menu.Item>
            <Menu.Item key="16" icon={<LoginOutlined />}>
              <Link to="/login">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerVisible}
      >
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
          <Menu.SubMenu
            key="products"
            icon={<ProductOutlined />}
            title="Products"
          >
            <Menu.Item key="3" icon={<UnorderedListOutlined />}>
              <Link to="/product-list">All Products</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ProductOutlined />}>
              <Link to="/create-product">Create Product</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileSyncOutlined />}>
              <Link to="/import-csv">Import CSV</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<TagOutlined />}>
              <Link to="/tags">Add Tags</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<MergeOutlined />}>
              <Link to="/categories">Categories</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="8" icon={<TeamOutlined />}>
            <Link to="/order-list">Order List</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="shiping"
            icon={<ShoppingCartOutlined />}
            title="Shipping"
          >
            <Menu.Item key="9" icon={<ShoppingCartOutlined />}>
              <Link to="/shipping-zones">Shipping Zones</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<TruckOutlined />}>
              <Link to="/courier-service-providers">Courier Service</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="11" icon={<FileOutlined />}>
            <Link to="/store-settings">Store Settings</Link>
          </Menu.Item>
          {/* User Staff for mobile view start */}

          <Menu.SubMenu key="user-staff" icon={<TeamOutlined />} title="Staff">
            <Menu.Item key="12" icon={<TeamOutlined />}>
              <Link to="/">Create Staff</Link>
            </Menu.Item>
            <Menu.Item key="13" icon={<TeamOutlined />}>
              <Link to="/">Staff List</Link>
            </Menu.Item>
          </Menu.SubMenu>

          {/* User staff End  */}
          <Menu.Item key="14" icon={<DesktopOutlined />}>
            <Link>Shopify Admin</Link>
          </Menu.Item>
          <Menu.Item key="15" icon={<UserOutlined />}>
            <Link to="/user-info">Umair500</Link>
          </Menu.Item>
          <Menu.Item key="16" icon={<LoginOutlined />}>
            <Link to="/login">Logout</Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Mobile Menu Button */}
      <Button
        onClick={showDrawer}
        style={{
          display: window.innerWidth <= 768 ? 'block' : 'none',
          margin: '10px',
          position: 'fixed',
          left: 0,
          background: 'none',
          borderColor: 'Background',
          zIndex: '7777',
        }}
        icon={<MenuOutlined />}
      />

      {/* Content */}
      <Layout className="site-layout">
        <Content
          style={{
            margin: '10px 10px',
            marginLeft: siderVisible ? '200px' : '0',
            padding: '10px',
          }}
        >
          <div className="side_nav_wrapper">
            <Routes>
              <Route path="/find-product" element={<FindProduct />} />
              <Route path="/import-list" element={<ImportList />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/store-settings" element={<StoreSettings />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/product-detail" element={<ProductDetailPage />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/import-csv" element={<ImportCSV />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/shipping-zones" element={<ShippingZones />} />
              <Route path="/add-staff" element={<AddStaff />} />
              <Route path="/staff-list" element={<StaffList />} />
              <Route
                path="/courier-service-providers"
                element={<CourierService />}
              />
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
  );
};

export default SideNav;
