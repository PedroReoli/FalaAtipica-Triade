// Rotas de autenticação
const express = require('express');
const router = express.Router();
const jsonService = require('../services/jsonService');
const { successResponse, errorResponse, isValidEmail } = require('../utils/helpers');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login de usuário
 *     description: Autentica usuário (Kids, Tutors ou Pro) e retorna token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *               - appType
 *             properties:
 *               email:
 *                 type: string
 *                 example: carlos@tutors.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               appType:
 *                 type: string
 *                 enum: [kids, tutors, pro]
 *                 example: tutors
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais incorretas
 */
router.post('/login', async (req, res) => {
  try {
    const { email, senha, appType } = req.body;
    
    // Validações
    if (!email || !senha) {
      return res.status(400).json(
        errorResponse('MISSING_FIELDS', 'Email e senha são obrigatórios')
      );
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json(
        errorResponse('INVALID_EMAIL', 'Email inválido')
      );
    }
    
    if (!appType || !['kids', 'tutors', 'pro'].includes(appType)) {
      return res.status(400).json(
        errorResponse('INVALID_APP_TYPE', 'Tipo de app inválido')
      );
    }
    
    // Buscar usuário baseado no tipo de app
    let user = null;
    let filePath = '';
    
    if (appType === 'kids') {
      filePath = 'KIDS/usuarios.json';
      const data = await jsonService.readJSON(filePath);
      user = data.usuarios?.find(u => u.email === email && u.senha === senha);
    } else if (appType === 'tutors') {
      filePath = 'TUTORS/usuarios.json';
      const data = await jsonService.readJSON(filePath);
      user = data.tutores?.find(u => u.email === email && u.senha === senha);
    } else if (appType === 'pro') {
      filePath = 'PRO/profissionais.json';
      const data = await jsonService.readJSON(filePath);
      user = data.profissionais?.find(u => u.email === email);
    }
    
    if (!user) {
      return res.status(401).json(
        errorResponse('INVALID_CREDENTIALS', 'Email ou senha incorretos')
      );
    }
    
    // Remover senha da resposta
    const { senha: _, ...userWithoutPassword } = user;
    
    // Gerar token mockado (em produção seria JWT)
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    console.log(`✅ Login bem-sucedido: ${user.nome || user.email} (${appType})`);
    
    res.json(successResponse({
      user: userWithoutPassword,
      token,
      appType
    }, 'Login realizado com sucesso'));
    
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json(
      errorResponse('LOGIN_ERROR', 'Erro ao fazer login', error.message)
    );
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    // Em produção, validaria o token aqui
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json(
        errorResponse('NO_TOKEN', 'Token não fornecido')
      );
    }
    
    // Mock: extrair ID do token
    const token = authHeader.replace('Bearer ', '');
    const userId = token.split('-')[2]; // mock-token-userId-timestamp
    
    // Buscar usuário (simplificado - em produção buscaria pelo token)
    res.json(successResponse({
      id: userId,
      message: 'Token válido'
    }));
    
  } catch (error) {
    console.error('❌ Erro ao verificar token:', error);
    res.status(401).json(
      errorResponse('INVALID_TOKEN', 'Token inválido')
    );
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // Em produção, invalidaria o token aqui
  console.log('👋 Logout realizado');
  res.json(successResponse(null, 'Logout realizado com sucesso'));
});

module.exports = router;

