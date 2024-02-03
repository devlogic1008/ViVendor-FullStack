import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link , } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import shewin from '../../images/shewin.png';
import { Layout, Menu, theme ,Divider} from 'antd';
import FindProduct from '../FindProduct/FindProduct';
import ImportList from '../ImportList/ImportList';
import ProductList from '../ProductList/ProductList';
import OrderList from '../OrderList/OrderList';
import StoreSettings from '../StoreSettings/StoreSettings';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const itemsUpper = [
  getItem('Find Product', '1', <PieChartOutlined />, null, '/find-product'),
  getItem('Import list', '2', <DesktopOutlined />, null, '/import-list'),
  getItem('Product List', '3', <UserOutlined />, null, '/product-list'),
  getItem('Order List', 'sub2', <TeamOutlined />,null,'/order-list' ),
  // getItem('Product List', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3', null, null, '/user/tom'),
  //   getItem('Bill', '4', null, null, '/user/bill'),
  //   getItem('Alex', '5', null, null, '/user/alex'),
  // ]),
];

const itemsLower = [

  getItem('Store Settings', '9', <FileOutlined />, null, '/store-settings'),
  getItem('My Message', '10', <MessageOutlined />, null, '/files'),
  getItem('Help Center', '11', <TeamOutlined />, null, '/files'),
  getItem('Shopify Admin', '12', <DesktopOutlined />, null, '/files'),
  getItem('Umair500', '13', <UserOutlined />, null, '/files'),
];

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
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
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {itemsUpper.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ marginTop: '70%' }}>
            <Menu theme="dark" mode="inline">
              {itemsLower.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
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
                <Route path="/product-list" element={<ProductList/>} />
                <Route path="/order-list" element={<OrderList/>} />
                <Route path="/store-settings" element={<StoreSettings/>} />
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Shewin ©{new Date().getFullYear()} Created by Logic Everest
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default SideNav;
