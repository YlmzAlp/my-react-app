import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ItemAddDelete from './components/ItemAddDelete';
import Cart from './components/Cart';
import Profile from './components/Profile';
import EmailForm from './components/EmailForm';
import PrivateRoute from './components/PrivateRoute';
import HeaderMenu from './components/HeaderMenu';
import SearchItem from './components/Searchitem';  
import { loginUser } from './utils/auth';



const { Content } = Layout;

const App = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Layout>
        <HeaderMenu /> {/* HeaderMenu bileşeni eklendi */}
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute user={user}><Home /></PrivateRoute>} />
            <Route path="/item-add-delete" element={<PrivateRoute user={user}><ItemAddDelete /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute user={user}><Cart cartItems={cartItems} setCartItems={setCartItems} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute user={user}><Profile user={user} onLogout={handleLogout} /></PrivateRoute>} />
            <Route path="/contact" element={<PrivateRoute user={user}><EmailForm /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute user={user}><SearchItem cartItems={cartItems} setCartItems={setCartItems} /></PrivateRoute>} /> {/* SearchItem route eklendi */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

