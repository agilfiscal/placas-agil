const express = require('express');
const cors = require('cors');
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = 'sua_chave_secreta_aqui'; // Em produção, use variáveis de ambiente

// Middleware
app.use(cors());
app.use(express.json());

// Teste de conexão com o banco de dados
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as test');
    res.json({ message: 'Conexão com o banco de dados estabelecida com sucesso!', data: rows[0] });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    res.status(500).json({ error: 'Erro ao conectar com o banco de dados' });
  }
});

// Rotas de usuários
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o email já existe
    const [existingUsers] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Este email já está cadastrado' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Inserir usuário
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    res.status(201).json({ 
      message: 'Usuário criado com sucesso',
      id: result.insertId, 
      nome, 
      email 
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário. Por favor, tente novamente.' });
  }
});

// Rota de login
app.post('/api/usuarios/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário
    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const user = users[0];

    // Verificar senha
    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login. Por favor, tente novamente.' });
  }
});

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Rotas de placas (protegidas)
app.post('/api/placas', authMiddleware, async (req, res) => {
  try {
    const { numero, estado, preco, descricao } = req.body;
    const [result] = await db.query(
      'INSERT INTO placas (numero, estado, preco, descricao, usuario_id) VALUES (?, ?, ?, ?, ?)',
      [numero, estado, preco, descricao, req.user.id]
    );
    res.status(201).json({ 
      message: 'Placa criada com sucesso',
      id: result.insertId, 
      numero, 
      estado,
      preco,
      descricao
    });
  } catch (error) {
    console.error('Erro ao criar placa:', error);
    res.status(500).json({ error: 'Erro ao criar placa. Por favor, tente novamente.' });
  }
});

app.get('/api/placas', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM placas WHERE usuario_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar placas:', error);
    res.status(500).json({ error: 'Erro ao buscar placas. Por favor, tente novamente.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 