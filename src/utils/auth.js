// utils/auth.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sheet.best/api/sheets/c2db6ed3-5cd2-4dd5-ba8d-66233e009ca8',
});

export const loginUser = async (kullanıcı) => {
  try {
    const response = await api.get();
    console.log('API Response:', response.data); // API yanıtını konsola yazdırın
    const users = response.data;
    console.log('Users:', users); // Kullanıcıları konsola yazdırın
    const user = users.find(u => {
      console.log('User Check:', u); // Her kullanıcıyı kontrol edin
      return u.email === kullanıcı.email && u.password === kullanıcı.password;
    });
    console.log('User:', user); // Kullanıcıyı konsola yazdırın
    if (user) {
      console.log('ghj',)
      return user;
    } else {
      throw new Error('Invalid credentials');
      
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signupUser = async (name, surname, email, password) => {
  try {
    const response = await api.get();
    console.log('API Response:', response.data); // API yanıtını konsola yazdırın
    const users = response.data;
    console.log('Users:', users); // Kullanıcıları konsola yazdırın
    const existingUser = users.find(u => {
      console.log('Existing User Check:', u); // Her kullanıcıyı kontrol edin
      return u.email === email;
    });

    if (existingUser) {
      throw new Error('User already exists');
    } else {
      await api.post('/', { name, surname, email, password });
      return { name, surname, email };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

