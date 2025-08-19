const express = require('express');
const { pets } = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do pet
 *         name:
 *           type: string
 *           description: Nome do pet
 *         species:
 *           type: string
 *           description: Espécie do pet (Cachorro, Gato, etc.)
 *         breed:
 *           type: string
 *           description: Raça do pet
 *         age:
 *           type: integer
 *           description: Idade do pet em anos
 *         description:
 *           type: string
 *           description: Descrição do pet
 *         image:
 *           type: string
 *           description: URL da imagem do pet
 *         isAvailable:
 *           type: boolean
 *           description: Indica se o pet está disponível para adoção
 *     PetAdoptionRequest:
 *       type: object
 *       required:
 *         - petId
 *       properties:
 *         petId:
 *           type: integer
 *           description: ID do pet escolhido para adoção
 *     PetAdoptionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica se a adoção foi bem-sucedida
 *         message:
 *           type: string
 *           description: Mensagem de resposta
 *         pet:
 *           $ref: '#/components/schemas/Pet'
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Listar todos os pets disponíveis para adoção
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 */
router.get('/', (req, res) => {
  try {
    const availablePets = pets.filter(pet => pet.isAvailable);
    
    res.json({
      success: true,
      message: 'Pets disponíveis para adoção',
      pets: availablePets
    });
  } catch (error) {
    console.error('Erro ao listar pets:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao listar pets'
    });
  }
});

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Obter detalhes de um pet específico
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Detalhes do pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 pet:
 *                   $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet não encontrado
 */
router.get('/:id', (req, res) => {
  try {
    const petId = parseInt(req.params.id);
    const pet = pets.find(p => p.id === petId);

    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet não encontrado',
        message: 'Pet com o ID especificado não foi encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Pet encontrado com sucesso',
      pet
    });
  } catch (error) {
    console.error('Erro ao buscar pet:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao buscar pet'
    });
  }
});

/**
 * @swagger
 * /api/pets/adopt:
 *   post:
 *     summary: Escolher um pet para adoção
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetAdoptionRequest'
 *     responses:
 *       200:
 *         description: Pet escolhido para adoção com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PetAdoptionResponse'
 *       400:
 *         description: Dados inválidos ou pet não escolhido
 *       404:
 *         description: Pet não encontrado
 *       401:
 *         description: Não autorizado
 */
router.post('/adopt', authenticateToken, (req, res) => {
  try {
    const { petId } = req.body;

    // Validação: pet deve ser escolhido
    if (!petId) {
      return res.status(400).json({
        success: false,
        error: 'Pet não escolhido',
        message: 'Pet não escolhido, deseja continuar essa ação'
      });
    }

    // Buscar o pet escolhido
    const pet = pets.find(p => p.id === parseInt(petId));
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet não encontrado',
        message: 'Pet com o ID especificado não foi encontrado'
      });
    }

    // Verificar se o pet está disponível
    if (!pet.isAvailable) {
      return res.status(400).json({
        success: false,
        error: 'Pet não disponível',
        message: 'Este pet não está mais disponível para adoção'
      });
    }

    // Retornar sucesso com mensagem personalizada
    res.json({
      success: true,
      message: 'A Adopet Brunna fica feliz em telo junto nessa jornada Não compre, Adote',
      pet: {
        id: pet.id,
        name: pet.name,
        species: pet.species,
        age: pet.age,
        breed: pet.breed,
        description: pet.description,
        image: pet.image
      }
    });
  } catch (error) {
    console.error('Erro na adoção:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao processar adoção'
    });
  }
});

/**
 * @swagger
 * /api/pets/home:
 *   get:
 *     summary: Acessar a home de adoção de pets (requer autenticação)
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home de adoção carregada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 welcomeMessage:
 *                   type: string
 *                 availablePets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *       401:
 *         description: Não autorizado
 */
router.get('/home', authenticateToken, (req, res) => {
  try {
    const availablePets = pets.filter(pet => pet.isAvailable);
    
    res.json({
      success: true,
      message: 'Bem-vindo à home de adoção de pets!',
      welcomeMessage: 'A Adopet Brunna fica feliz em telo junto nessa jornada. Não compre, Adote!',
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      },
      availablePets: availablePets.map(pet => ({
        id: pet.id,
        name: pet.name,
        species: pet.species,
        age: pet.age,
        breed: pet.breed,
        description: pet.description,
        image: pet.image
      }))
    });
  } catch (error) {
    console.error('Erro ao carregar home:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao carregar home de adoção'
    });
  }
});

/**
 * @swagger
 * /api/pets/search:
 *   get:
 *     summary: Buscar pets por espécie ou raça
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Espécie do pet (ex: Cachorro, Gato)
 *       - in: query
 *         name: breed
 *         schema:
 *           type: string
 *         description: Raça do pet
 *     responses:
 *       200:
 *         description: Pets encontrados na busca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 */
router.get('/search', (req, res) => {
  try {
    const { species, breed } = req.query;
    let filteredPets = pets.filter(pet => pet.isAvailable);

    // Filtrar por espécie
    if (species) {
      filteredPets = filteredPets.filter(pet => 
        pet.species.toLowerCase().includes(species.toLowerCase())
      );
    }

    // Filtrar por raça
    if (breed) {
      filteredPets = filteredPets.filter(pet => 
        pet.breed.toLowerCase().includes(breed.toLowerCase())
      );
    }

    res.json({
      success: true,
      message: `Pets encontrados: ${filteredPets.length}`,
      filters: { species, breed },
      pets: filteredPets
    });
  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao realizar busca'
    });
  }
});

module.exports = router;
