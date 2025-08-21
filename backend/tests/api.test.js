const request = require('supertest');
const app = require('../server');

describe('Adopet API', () => {
  let authToken;
  let userId;

  describe('🔐 Autenticação', () => {
    describe('POST /api/auth/register', () => {
      it('deve criar um novo usuário com dados válidos', async () => {
        const userData = {
          email: 'teste@example.com',
          password: '123456',
          name: 'Usuário Teste'
        };

        const response = await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuário criado com sucesso');
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.user.name).toBe(userData.name);
        expect(response.body.user.password).toBeUndefined();
      });

      it('deve retornar erro para email inválido', async () => {
        const userData = {
          email: 'email-invalido',
          password: '123456',
          name: 'Usuário Teste'
        };

        const response = await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Email inválido');
      });

      it('deve retornar erro para campos obrigatórios faltando', async () => {
        const userData = {
          email: 'teste@example.com'
          // password e name faltando
        };

        const response = await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Campos obrigatórios');
      });
    });

    describe('POST /api/auth/login', () => {
      it('deve fazer login com credenciais válidas', async () => {
        const loginData = {
          email: 'brunna@example.com',
          password: '123456'
        };

        const response = await request(app)
          .post('/api/auth/login')
          .send(loginData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Login realizado com sucesso');
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe(loginData.email);
        
        // Salvar token para testes posteriores
        authToken = response.body.token;
        userId = response.body.user.id;
      });

      it('deve retornar erro para credenciais inválidas', async () => {
        const loginData = {
          email: 'brunna@example.com',
          password: 'senha-errada'
        };

        const response = await request(app)
          .post('/api/auth/login')
          .send(loginData)
          .expect(401);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Credenciais inválidas');
        expect(response.body.message).toBe('Usuário ou senha inválidos, tente novamente');
      });

      it('deve retornar erro para campos obrigatórios faltando', async () => {
        const loginData = {
          email: 'brunna@example.com'
          // password faltando
        };

        const response = await request(app)
          .post('/api/auth/login')
          .send(loginData)
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Campos obrigatórios');
      });
    });

    describe('POST /api/auth/reset-password', () => {
      it('deve trocar senha com email válido', async () => {
        const resetData = {
          email: 'brunna@example.com',
          newPassword: 'novaSenha123'
        };

        const response = await request(app)
          .post('/api/auth/reset-password')
          .send(resetData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Senha alterada com sucesso');
      });

      it('deve retornar erro para email não encontrado', async () => {
        const resetData = {
          email: 'naoexiste@example.com',
          newPassword: 'novaSenha123'
        };

        const response = await request(app)
          .post('/api/auth/reset-password')
          .send(resetData)
          .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Usuário não encontrado');
      });
    });
  });

  describe('🐾 Pets', () => {
    describe('GET /api/pets', () => {
      it('deve listar todos os pets disponíveis', async () => {
        const response = await request(app)
          .get('/api/pets')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Pets disponíveis para adoção');
        expect(Array.isArray(response.body.pets)).toBe(true);
        expect(response.body.pets.length).toBeGreaterThan(0);
        
        // Verificar se todos os pets têm as propriedades necessárias
        response.body.pets.forEach(pet => {
          expect(pet).toHaveProperty('id');
          expect(pet).toHaveProperty('name');
          expect(pet).toHaveProperty('species');
          expect(pet).toHaveProperty('age');
          expect(pet).toHaveProperty('image');
        });
      });
    });

    describe('GET /api/pets/:id', () => {
      it('deve retornar detalhes de um pet específico', async () => {
        const petId = 1;
        const response = await request(app)
          .get(`/api/pets/${petId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Pet encontrado com sucesso');
        expect(response.body.pet.id).toBe(petId);
      });

      it('deve retornar erro para pet não encontrado', async () => {
        const petId = 999;
        const response = await request(app)
          .get(`/api/pets/${petId}`)
          .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Pet não encontrado');
      });
    });

    describe('GET /api/pets/home', () => {
      it('deve acessar home de adoção com token válido', async () => {
        const response = await request(app)
          .get('/api/pets/home')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Bem-vindo à home de adoção de pets!');
        expect(response.body.welcomeMessage).toContain('A Adopet Brunna fica feliz em telo junto nessa jornada');
        expect(response.body.user).toBeDefined();
        expect(Array.isArray(response.body.availablePets)).toBe(true);
      });

      it('deve retornar erro sem token de autenticação', async () => {
        const response = await request(app)
          .get('/api/pets/home')
          .expect(401);

        expect(response.body.error).toBe('Token não fornecido');
      });
    });

    describe('POST /api/pets/adopt', () => {
      it('deve escolher pet para adoção com sucesso', async () => {
        const adoptionData = {
          petId: 1
        };

        const response = await request(app)
          .post('/api/pets/adopt')
          .set('Authorization', `Bearer ${authToken}`)
          .send(adoptionData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('A Adopet Brunna fica feliz em telo junto nessa jornada');
        expect(response.body.pet).toBeDefined();
        expect(response.body.pet.id).toBe(adoptionData.petId);
        expect(response.body.pet.name).toBeDefined();
        expect(response.body.pet.species).toBeDefined();
        expect(response.body.pet.age).toBeDefined();
      });

      it('deve retornar erro se pet não for escolhido', async () => {
        const adoptionData = {};
        // petId faltando

        const response = await request(app)
          .post('/api/pets/adopt')
          .set('Authorization', `Bearer ${authToken}`)
          .send(adoptionData)
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Pet não escolhido');
        expect(response.body.message).toBe('Pet não escolhido, deseja continuar essa ação');
      });

      it('deve retornar erro sem token de autenticação', async () => {
        const adoptionData = {
          petId: 1
        };

        const response = await request(app)
          .post('/api/pets/adopt')
          .send(adoptionData)
          .expect(401);

        expect(response.body.error).toBe('Token não fornecido');
      });
    });

    describe('GET /api/pets/search', () => {
      it('deve buscar pets por espécie', async () => {
        const response = await request(app)
          .get('/api/pets/search?species=Cachorro')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.filters.species).toBe('Cachorro');
        expect(Array.isArray(response.body.pets)).toBe(true);
        
        // Verificar se todos os pets retornados são cachorros
        response.body.pets.forEach(pet => {
          expect(pet.species.toLowerCase()).toContain('cachorro');
        });
      });

      it('deve buscar pets por raça', async () => {
        const response = await request(app)
          .get('/api/pets/search?breed=Labrador')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.filters.breed).toBe('Labrador');
        expect(Array.isArray(response.body.pets)).toBe(true);
      });
    });
  });

  describe('🏠 Rota Principal', () => {
    it('deve retornar mensagem de boas-vindas', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toBe('Bem-vindo à API Adopet!');
      expect(response.body.docs).toBe('/api-docs');
      expect(response.body.auth).toBe('/api/auth');
      expect(response.body.pets).toBe('/api/pets');
    });
  });
});
