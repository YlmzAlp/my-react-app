
//components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Form, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8', {
        name,
        surname,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json' // JSON formatında veri gönder
        }
      });
      notification.success({ message: 'Signup successful!' });
      navigate('/login');
    } catch (error) {
      notification.error({ message: 'Error signing up' });
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form layout="vertical" onFinish={handleSignup}>
        <Form.Item label="ad" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="soyad" required>
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} />
        </Form.Item>
        <Form.Item label="email" required>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="şifre" required>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">kayıt ol</Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => navigate('/login')}>geri dön</Button>
    </div>
  );
};

export default Signup;
