import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto por la URL de tu API si es necesario

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: unknown) {
    // Manejo de errores mejorado
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || 'Error al registrar el usuario';
      throw new Error(errorMessage);
    }
    throw new Error('Error al registrar el usuario'); // Fallback para otros errores
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: unknown) {
    // Manejo de errores mejorado
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || 'Error al iniciar sesión';
      throw new Error(errorMessage);
    }
    throw new Error('Error al iniciar sesión'); // Fallback para otros errores
  }
};
