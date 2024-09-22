// src/pages/api/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser, loginUser } from '../../services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { action } = req.query;

    if (action === 'register') {
      const userData = req.body;
      const user = await registerUser(userData);
      return res.status(201).json(user);
    }

    if (action === 'login') {
      const credentials = req.body;
      const { token } = await loginUser(credentials);
      return res.status(200).json({ token });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
