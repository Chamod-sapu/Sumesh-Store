import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, DashboardOutlined } from '@ant-design/icons';
import { Layout as AntLayout, Layout, Menu, theme } from 'antd';
import { MemoryRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Sales from './Pages/Sales';
import Inventory from './Pages/Inventory';
import Reviews from './Pages/Reviews';
import Users from './Pages/Users';
import Wallet from './Pages/Wallet';

const { Header, Content, Footer, Sider } = AntLayout;

// Menu items with proper routes and labels
const menuItems = [
    {
        key: '/',
        icon: React.createElement(DashboardOutlined),
        label: 'Dashboard',
        path: '/'
    },
    {
        key: '/orders',
        icon: React.createElement(VideoCameraOutlined),
        label: 'Orders',
        path: '/orders'
    },
    {
        key: '/inventory',
        icon: React.createElement(UploadOutlined),
        label: 'Inventory',
        path: '/inventory'
    },
    {
        key: '/sales',
        icon: React.createElement(UploadOutlined),
        label: 'Sales',
        path: '/sales'
    },
    {
        key: '/wallet',
        icon: React.createElement(UploadOutlined),
        label: 'Wallet',
        path: '/wallet'
    },
    {
        key: '/reviews',
        icon: React.createElement(UploadOutlined),
        label: 'Reviews',
        path: '/reviews'
    },
    {
        key: '/users',
        icon: React.createElement(UserOutlined),
        label: 'Users',
        path: '/users'
    }
];

const CustomLayoutContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Handle menu item clicks
    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    // Get current selected key based on current route
    const selectedKeys = [location.pathname];

    return (
        <Layout className='min-h-screen'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => console.log(broken)}
                onCollapse={(collapsed, type) => console.log(collapsed, type)}
            >
                <div className="demo-logo-vertical" >
                    <img src="/logo.png" alt="Logo" className='w-16 h-16' />
                </div>
                <Menu 
                    className='mt-16' 
                    theme="dark" 
                    mode="inline" 
                    selectedKeys={selectedKeys}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header className='font-bold text-2xl m-4' style={{ padding: 0, background: colorBgContainer }}>
                    <p className='pl-6 pt-3 text-blue-950'>Wewala Stores Admin Panel</p>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 820,

                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/sales" element={<Sales/>} />
                            <Route path="/inventory" element={<Inventory/>} />
                            <Route path="/reviews" element={<Reviews/>} />
                            <Route path="/users" element={<Users/>} />
                            <Route path="/wallet" element={<Wallet/>} />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Wewala Stores Admin ©{new Date().getFullYear()} Created by Sapumal Illangasinghe
                </Footer>
            </Layout>
        </Layout>
    );
};

const CustomLayout = () => {
    return (
        <MemoryRouter>
            <CustomLayoutContent />
        </MemoryRouter>
    );
};

export default CustomLayout;