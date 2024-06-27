import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Item } = Menu;

const HeaderMenu = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
      <Item key="1">
        <Link to="/item-add-delete">Eşya Ekle/Sil</Link>
      </Item>
      <Item key="2">
        <Link to="/cart">Sepet</Link>
      </Item>
      <Item key="3">
        <Link to="/profile">Profil</Link>
      </Item>
      <Item key="4">
        <Link to="/search">Eşya Ara</Link>
      </Item>
    </Menu>
  );
};

export default HeaderMenu;
