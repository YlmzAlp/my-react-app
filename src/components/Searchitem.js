import React, { useState } from 'react';
import { Input, DatePicker, Button, Select } from 'antd';
import 'antd/dist/antd.js';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Searchitem = () => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState([]);

  const handleSearch = () => {
    // Burada arama işlemleri yapılabilir
    console.log('Arama yapılıyor:', itemName, itemType, rentalPeriod);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Eşya Ara</h2>
      <Input
        placeholder="Eşya Adı"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ width: 200, marginBottom: 10 }}
      />
      <Select
        placeholder="Eşya Türü"
        value={itemType}
        onChange={(value) => setItemType(value)}
        style={{ width: 200, marginBottom: 10 }}
      >
        <Option value="mobilya">Mobilya</Option>
        <Option value="elektronik">Elektronik</Option>
        <Option value="ev gereçleri">Ev Gereçleri</Option>
      </Select>
      <RangePicker
        placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
        value={rentalPeriod}
        onChange={(dates) => setRentalPeriod(dates)}
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
        Ara
      </Button>
    </div>
  );
};

export default Searchitem;
