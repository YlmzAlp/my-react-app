// Profile.js
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ onLogout, user }) => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.get('https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8');
      const users = response.data;
      const userToDelete = users.find(u => u.email === user.email);

      if (userToDelete) {
        await axios.delete(`https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8${userToDelete.id}`);
        notification.success({ message: 'Account deleted successfully!' });
        onLogout();
        navigate('/login');
      } else {
        notification.error({ message: 'Account not found' });
      }
    } catch (error) {
      notification.error({ message: 'Error deleting account' });
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div>
      <h1>Profil</h1>
      <Form layout="vertical">
        <Form.Item label="Ad">
          <Input value={user.name} disabled />
        </Form.Item>
        <Form.Item label="Soyad">
          <Input value={user.surname} disabled />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={user.email} disabled />
        </Form.Item>
        <Form.Item label="Şifre">
          <Input value={user.password} disabled />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onLogout}>Oturumu Kapat</Button>
        </Form.Item>
        <Form.Item>
          <Button type="danger" onClick={handleDeleteAccount}></Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
