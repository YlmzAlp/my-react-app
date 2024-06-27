import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, notification } from 'antd';

const ItemListPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8');
      setItems(response.data.sheetName);
    } catch (error) {
      notification.error({ message: 'Error fetching items' });
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8${id}`);
      notification.success({ message: 'Item deleted successfully!' });
      fetchItems(); // Yeniden yüklemek için
    } catch (error) {
      notification.error({ message: 'Error deleting item' });
      console.error('Error deleting item:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Borrowed Until',
      dataIndex: 'borrowedUntil',
      key: 'borrowedUntil',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Item List</h1>
      <Table columns={columns} dataSource={items} rowKey="id" />
    </div>
  );
};

export default ItemListPage;