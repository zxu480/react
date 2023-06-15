import React, { useCallback } from "react";
import { SearchPage, WishListPage } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SearchOutlined, BarsOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { MenuItem } from "./store/interface";

const menuItems: MenuItem[] = [
  {
    key: "1",
    icon: <SearchOutlined />,
    label: `Search Book`,
    path: "/",
  },
  {
    key: "2",
    icon: <BarsOutlined />,
    label: `Wish List`,
    path: "wishlist",
  },
];

const App: React.FC = () => {
  const { Content, Footer, Sider } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const handelNav = useCallback((key: string) => {
    navigate(menuItems.find((item) => item.key === key)?.path ?? "/");
  }, []);

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            paddingTop: 24,
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            onClick={({ key }) => {
              handelNav(key);
            }}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 800,
                background: colorBgContainer,
                position: 'relative'
              }}
            >
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/wishlist" element={<WishListPage />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Book Search Application
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
