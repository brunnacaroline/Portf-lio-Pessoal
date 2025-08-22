// Dados mockados para usuários e pets
// Em produção, estes dados viriam de um banco de dados

const users = [
  {
    id: 1,
    email: 'maria@email.com',
    password: '$2a$10$rQZ9K8mN2pL1vX3cF5gH7iJ9kL2mN3pQ4rS5tU6vW7xY8zA9bC0dE1fG2hI3j',
    name: 'Maria Silva',
    isBlocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null
  },
  {
    id: 2,
    email: 'joao@email.com',
    password: '$2a$10$rQZ9K8mN2pL1vX3cF5gH7iJ9kL2mN3pQ4rS5tU6vW7xY8zA9bC0dE1fG2hI3j',
    name: 'João Santos',
    isBlocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null
  },
  {
    id: 3,
    email: 'ana@email.com',
    password: '$2a$10$rQZ9K8mN2pL1vX3cF5gH7iJ9kL2mN3pQ4rS5tU6vW7xY8zA9bC0dE1fG2hI3j',
    name: 'Ana Costa',
    isBlocked: false,
    loginAttempts: 0,
    lastLoginAttempt: null
  }
];

const pets = [
  {
    id: 1,
    name: 'Rex',
    species: 'Cachorro',
    age: 3,
    breed: 'Labrador',
    description: 'Cachorro muito carinhoso e brincalhão',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    isAvailable: true
  },
  {
    id: 2,
    name: 'Mia',
    species: 'Gato',
    age: 2,
    breed: 'Siamês',
    description: 'Gata tranquila e independente',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    isAvailable: true
  },
  {
    id: 3,
    name: 'Buddy',
    species: 'Cachorro',
    age: 1,
    breed: 'Golden Retriever',
    description: 'Filhote muito energético e amigável',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    isAvailable: true
  }
];

// Senhas em texto plano para facilitar testes (em produção seria hash)
const plainPasswords = {
  'maria@email.com': 'senha123',
  'joao@email.com': 'senha123',
  'ana@email.com': 'senha123'
};

module.exports = {
  users,
  pets,
  plainPasswords
};
