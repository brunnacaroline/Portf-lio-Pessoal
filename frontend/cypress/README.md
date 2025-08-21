# Cypress - Testes E2E

Este diretório contém os testes end-to-end (E2E) usando Cypress para o projeto Portfolio-Pessoal.

## 📁 Estrutura de Diretórios

```
cypress/
├── e2e/                    # Testes E2E
│   ├── lembrarSenha.cy.js
│   ├── login.cy.js
│   ├── loginBloqueado.cy.js
│   └── loginInvalido.cy.js
├── fixtures/               # Dados de teste
│   └── example.json
├── support/                # Arquivos de suporte
│   ├── commands.js         # Comandos personalizados
│   └── e2e.js             # Configurações globais
└── README.md               # Este arquivo
```

## 🚀 Como Executar Testes

### **1. Abrir Interface Gráfica do Cypress**
```bash
npm run cypress:open
```

### **2. Executar Todos os Testes (Modo Headless)**
```bash
npm run cypress:run
```

### **3. Executar Teste Específico**

#### **Teste de Lembrar Senha:**
```bash
npm run cypress:run:lembrarSenha
```

#### **Teste de Login:**
```bash
npm run cypress:run:login
```

#### **Teste de Login Bloqueado:**
```bash
npm run cypress:run:loginBloqueado
```

#### **Teste de Login Inválido:**
```bash
npm run cypress:run:loginInvalido
```

### **4. Executar Teste Específico com Comando Direto**
```bash
npx cypress run --spec "cypress/e2e/lembrarSenha.cy.js"
```

### **5. Executar Teste com Nome Específico**
```bash
npx cypress run --spec "cypress/e2e/lembrarSenha.cy.js" --grep "nome do teste"
```

## ⚙️ Configurações

### **Base URL:** `http://localhost:3000`
### **Viewport:** 1280x720
### **Timeout Padrão:** 10 segundos
### **Screenshots:** Habilitados em caso de falha
### **Vídeos:** Desabilitados para melhor performance

## 🛠️ Comandos Personalizados

### **Login:**
```javascript
cy.login('email@exemplo.com', 'senha123')
```

### **Logout:**
```javascript
cy.logout()
```

### **Verificar Login:**
```javascript
cy.shouldBeLoggedIn()
```

## 📝 Escrevendo Testes

### **Estrutura Básica:**
```javascript
describe('Nome do Teste', () => {
  it('deve fazer algo específico', () => {
    // Arrange
    cy.visit('/pagina')
    
    // Act
    cy.get('[data-cy=botao]').click()
    
    // Assert
    cy.url().should('include', '/nova-pagina')
  })
})
```

### **Boas Práticas:**
1. **Use data-cy attributes** para seletores estáveis
2. **Organize testes** em Arrange-Act-Assert
3. **Use comandos personalizados** para ações repetitivas
4. **Mantenha testes independentes** uns dos outros
5. **Use fixtures** para dados de teste

## 🔧 Troubleshooting

### **Problema:** Teste falha por timeout
**Solução:** Aumentar timeout ou verificar se a aplicação está rodando

### **Problema:** Elemento não encontrado
**Solução:** Verificar se o data-cy attribute está correto

### **Problema:** CORS errors
**Solução:** Verificar configurações do servidor

## 📚 Recursos Úteis

- [Documentação Oficial do Cypress](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/api/table-of-contents)
