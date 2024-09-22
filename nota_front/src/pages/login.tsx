// src/pages/login.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
