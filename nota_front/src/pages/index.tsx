// src/pages/index.tsx
import { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';
import Navbar from '../components/Navbar';

const Home = () => {
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert('Registro exitoso');
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      alert(`Inicio de sesión exitoso: ${data.token}`);
      // Aquí puedes guardar el token en localStorage o en el estado global
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>{formType === 'login' ? 'Iniciar Sesión' : 'Registro'}</h1>
      <form onSubmit={formType === 'login' ? handleLogin : handleRegister}>
        {formType === 'register' && (
          <div>
            <label>
              Nombre:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          </div>
        )}
        <div>
          <label>
            Correo Electrónico:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <button type="submit">{formType === 'login' ? 'Iniciar Sesión' : 'Registrar'}</button>
      </form>
      <button onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}>
        {formType === 'login' ? '¿No tienes cuenta? Regístrate aquí.' : '¿Ya tienes cuenta? Inicia sesión aquí.'}
      </button>
    </div>
  );
};

export default Home;
