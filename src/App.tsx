import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Sider, Content } = Layout;

// 使用 React.lazy 进行懒加载
const Behaviour = React.lazy(() => import('./pages/Behaviour'));
const Exception = React.lazy(() => import('./pages/Exception'));
const Performance = React.lazy(() => import('./pages/Performance'));
const Error = React.lazy(() => import('./pages/Error'));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/performance">性能监控</Link>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="/Error">错误监控</Link>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <Link to="/Exception">异常监控</Link>,
              },
              {
                key: '4',
                icon: <MenuFoldOutlined />,
                label: <Link to="/Behaviour">行为监控</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* 使用 Navigate 组件进行重定向 */}
                <Route path="/" element={<Navigate to="/performance" replace />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/Error" element={<Error />} />
                <Route path="/Exception" element={<Exception />} />
                <Route path="/Behaviour" element={<Behaviour />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;