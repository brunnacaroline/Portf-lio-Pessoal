// Dados mockados para usuários e pets
// Em um ambiente real, isso viria de um banco de dados

const users = [
  {
    id: 1,
    email: 'brunna@example.com',
    password: '123456',
    name: 'Brunna Silva',
    isBlocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    email: 'maria@example.com',
    password: '123456',
    name: 'Maria Santos',
    isBlocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: 3,
    email: 'joao@example.com',
    password: '123456',
    name: 'João Oliveira',
    isBlocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];
const pets = [
  {
    id: 1,
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Labrador',
    age: 3,
    description: 'Cachorro muito carinhoso e brincalhão',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    isAvailable: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'Mimi',
    species: 'Gato',
    breed: 'Persa',
    age: 2,
    description: 'Gato tranquilo e independente',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    isAvailable: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: 3,
    name: 'Thor',
    species: 'Cachorro',
    breed: 'Husky Siberiano',
    age: 1,
    description: 'Filhote muito energético e inteligente',
    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400',
    isAvailable: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];

// Senhas padrão para todos os usuários (em produção seria diferente para cada um)
const DEFAULT_PASSWORD = '123456';

// Função para verificar se um usuário está bloqueado
const isUserBlocked = (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  if (user.isBlocked) {
    // Verifica se já passou o tempo de bloqueio (15 minutos)
    const now = new Date();
    const lastAttempt = new Date(user.lastLoginAttempt);
    const timeDiff = now - lastAttempt;
    const fifteenMinutes = 15 * 60 * 1000;
    
    if (timeDiff > fifteenMinutes) {
      // Desbloqueia o usuário
      user.isBlocked = false;
      user.loginAttempts = 0;
      user.lastLoginAttempt = null;
      return false;
    }
    return true;
  }
  return false;
};

// Função para incrementar tentativas de login
const incrementLoginAttempts = (userId) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.loginAttempts += 1;
    user.lastLoginAttempt = new Date();
    
    if (user.loginAttempts >= 3) {
      user.isBlocked = true;
    }
  }
};

// Função para resetar tentativas de login
const resetLoginAttempts = (userId) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.loginAttempts = 0;
    user.lastLoginAttempt = null;
    user.isBlocked = false;
  }
};

module.exports = {
  users,
  pets,
  DEFAULT_PASSWORD,
  isUserBlocked,
  incrementLoginAttempts,
  resetLoginAttempts
};
