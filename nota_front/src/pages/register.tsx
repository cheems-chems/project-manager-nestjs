// src/pages/register.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
