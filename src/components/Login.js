// /components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Form, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(`https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8`);
      const users = response.data;

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        onLogin(user);
        navigate('/home');
      } else {
        notification.error({ message: 'Email or Password is incorrect' });
      }
    } catch (error) {
      notification.error({ message: 'Error logging in' });
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item label="email" required>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="şifre" required>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">giriş yap</Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => navigate('/signup')}>kayıt ol</Button>
    </div>
  );
};

export default Login;

