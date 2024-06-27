// Cart.js
import React, { useState } from 'react';
import { List, Button, Input, Form, notification } from 'antd';
import emailjs from 'emailjs-com';

const Cart = ({ cartItems, setCartItems }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleRemoveFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handlePayment = () => {
    // Implement payment logic here
    notification.success({ message: 'ödeme başarılı' });
    setCartItems([]);
    sendEmail();
    alert('Onay maili gönderildi!');
  };

  const sendEmail = () => {
    const templateParams = {
      name,
      surname,
      totalAmount,
      items: cartItems.map(item => `${item.name}: ${item.totalPrice} TL`).join(', ')
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        notification.success({ message: 'Onay maili gönderildi!' });
      }, (error) => {
        console.error('FAILED...', error);
        notification.error({ message: 'Onay maili gönderilemedi' });
      });
  };



  function formatCreditCardNumber(number) {
    return number.replace(/(\d{4})(?=\d)/g, '$1-').slice(0,19);
  }

  return (
    <div>
      <h1>Sepet</h1>
      <List
        dataSource={cartItems}
        renderItem={(item, index) => (
          <List.Item>
            <div>
              <p>Eşya Adı: {item.name}</p>
              <p>Tutar: {item.totalPrice} TL</p>
              <Button type="primary" onClick={() => handleRemoveFromCart(index)}>Sepetten Kaldır</Button>
            </div>
          </List.Item>
        )}
      />
      <h2>Toplam Tutar: {totalAmount} TL</h2>
      <Form layout="vertical" onFinish={handlePayment}>
        <Form.Item label="Ad" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Soyad" required>
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} />
        </Form.Item>
        <Form.Item label="Kredi Kartı Numarası" required>
          <Input value={formatCreditCardNumber(creditCard)} onChange={(e) => setCreditCard(e.target.value)} placeholder="xxxx-xxxx-xxxx-xxxx" />
        </Form.Item>
        <Form.Item label="Son Geçerlilik Tarihi" required>
          <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="xx/xx" />
        </Form.Item>
        <Form.Item label="CVC2" required>
          <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="xxx" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Onayla</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Cart;