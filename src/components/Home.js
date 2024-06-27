// Home.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" onClick={() => navigate('/home')}>Eşya Ara</Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/add-delete')}>Eşya Ekle/Sil</Menu.Item>
          <Menu.Item key="3" onClick={() => navigate('/cart')}>Sepet</Menu.Item>
          <Menu.Item key="4" onClick={() => navigate('/profile')}>Profil</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        <h1>Welcome to the Eşya Kiralama Platform</h1>
      </Content>
    </Layout>
  );
};

export default Home;