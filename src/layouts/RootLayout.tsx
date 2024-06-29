import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import Footer from "../components/Footer";
const { Header, Content, Sider } = Layout;
export default function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Link to="/">All Products List</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content className="inter-font" style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}
