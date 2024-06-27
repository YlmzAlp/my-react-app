// ItemAddDelete.js
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Form, notification ,DatePicker } from 'antd';

const ItemAddDelete = () => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [availableFrom, setAvailableFrom] = useState(null);
  const [availableUntil, setAvailableUntil] = useState(null);
  const [ratePerHour, setRatePerHour] = useState('');
  const [deleteItemName, setDeleteItemName] = useState('');

  const handleAddItem = async () => {
    try {
      await axios.post('https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8', {
        itemName,
        itemType,
        availableFrom,
        availableUntil,
        ratePerHour
      });
      notification.success({ message: 'Item added successfully!' });
    } catch (error) {
      notification.error({ message: 'Error adding item' });
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const response = await axios.get('https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8');
      const items = response.data;
      const itemToDelete = items.find(item => item.name === deleteItemName);

      if (itemToDelete) {
        await axios.delete(`https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8${itemToDelete.id}`);
        notification.success({ message: 'Item deleted successfully!' });
      } else {
        notification.error({ message: 'Item not found' });
      }
    } catch (error) {
      notification.error({ message: 'Error deleting item' });
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>Eşya Ekle/Sil</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <h2>Ekle</h2>
          <Form layout="vertical" onFinish={handleAddItem}>
            <Form.Item label="Eşya Adı" required>
              <Input value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Türü" required>
              <Input value={itemType} onChange={(e) => setItemType(e.target.value)} />
            </Form.Item>
            <Form.Item label="Başlangıç Tarihi" required>
              <DatePicker
                value={availableFrom}
                onChange={(date, dateString) => setAvailableFrom(date)}
                placeholder="Başlangıç Tarihi Seçin"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Bitiş Tarihi" required>
              <DatePicker
                value={availableUntil}
                onChange={(date, dateString) => setAvailableUntil(date)}
                placeholder="Bitiş Tarihi Seçin"
                style={{ width: '100%' }}
              /> 
            </Form.Item>
            <Form.Item label="Saatlik Ücret" required>
              <Input value={ratePerHour} onChange={(e) => setRatePerHour(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Ekle</Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ width: '45%' }}>
          <h2>Sil</h2>
          <Form layout="vertical" onFinish={handleDeleteItem}>
            <Form.Item label="Eşya Adı" required>
              <Input value={deleteItemName} onChange={(e) => setDeleteItemName(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Sil</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ItemAddDelete;
