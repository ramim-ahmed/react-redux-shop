import { Outlet } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import Footer from "../components/Footer";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem("All Product Lists", "1")];
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
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
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
