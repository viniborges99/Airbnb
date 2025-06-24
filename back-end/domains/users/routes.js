import { Router } from 'express';
import 'dotenv/config';
import User from './model.js';
import { connectDb } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

connectDb();
router.get('/', async (req, res) => {
  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/profile', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
      if (error) throw error;
      res.json(userInfo);
    });
  } else {
    res.json(null);
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

    const { _id } = newUserDoc;

    const newUserObj = { name, email, _id };

    jwt.sign(newUserObj, JWT_SECRET_KEY, {}, (error, token) => {
      if (error) throw error;
      res.cookie('token', token).json(newUserObj);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Login do usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userdoc = await User.findOne({ email });

    if (userdoc) {
      const passwordCorrect = bcrypt.compareSync(password, userdoc.password);
      const { name, _id } = userdoc;

      if (passwordCorrect) {
        const newUserObj = { name, email, id: _id };
        const token = jwt.sign(newUserObj, JWT_SECRET_KEY);

        return res.cookie('token', token).json(newUserObj);
      } else {
        return res.status(400).json({ error: 'Senha inválida' });
      }
    } else {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//Deslogando
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Deslogado com sucesso!' });
});

export default router;
