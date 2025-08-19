const bcrypt = require('bcryptjs');
const { users, pets } = require('../data/mockData');

// Função para inicializar dados com senhas criptografadas
async function initializeData() {
  try {
    console.log('🔐 Inicializando dados mockados...');
    
    // Senha padrão para todos os usuários
    const defaultPassword = '123456';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    // Atualizar senhas dos usuários existentes
    users.forEach(user => {
      user.password = hashedPassword;
      user.updatedAt = new Date();
    });
    
    console.log('✅ Dados mockados inicializados com sucesso!');
    console.log('📋 Usuários disponíveis:');
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Senha: ${defaultPassword}`);
    });
    
    console.log('\n🐾 Pets disponíveis:');
    pets.forEach(pet => {
      console.log(`   - ${pet.name} (${pet.species} - ${pet.breed}) - ${pet.age} anos`);
    });
    
    console.log('\n🚀 Para testar a API:');
    console.log('   1. Instale as dependências: npm install');
    console.log('   2. Execute o servidor: npm start');
    console.log('   3. Acesse a documentação: http://localhost:3000/api-docs');
    console.log('   4. Use as credenciais acima para fazer login');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar dados:', error);
  }
}

// Executar se o arquivo for chamado diretamente
if (require.main === module) {
  initializeData();
}

module.exports = { initializeData };
