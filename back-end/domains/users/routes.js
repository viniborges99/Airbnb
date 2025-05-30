import { Router } from 'express';

import User from './model.js';
import { connectDb } from '../../config/db.js';
import bcrypt from 'bcryptjs';
const router = Router();
const bcryptSalt = bcrypt.genSaltSync();

connectDb();
router.get('/', async (req, res) => {
  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Criando o usuario
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);
  try {
    const newUserDoc = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.json(newUserDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
