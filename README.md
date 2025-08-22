# Portfolio Pessoal - Sistema de Adoção de Pets

Sistema completo de adoção de pets com frontend e backend separados em duas pastas principais.

## 📁 Estrutura do Projeto

```
Portfolio-Pessoal/
├── backend/                 # API Backend (Node.js + Express)
│   ├── server.js           # Servidor principal
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares de autenticação
│   ├── data/               # Dados mockados
│   ├── scripts/            # Scripts de inicialização
│   ├── tests/              # Testes Jest
│   ├── coverage/           # Relatórios de cobertura
│   └── package.json        # Dependências do backend
├── frontend/               # Aplicação Web (HTML + CSS + JS)
│   ├── index.html          # Página principal
│   ├── css/                # Estilos CSS
│   ├── js/                 # JavaScript da aplicação
│   ├── cypress/            # Testes E2E
│   ├── server.js           # Servidor do frontend
│   └── package.json        # Dependências do frontend
├── package.json            # Workspace principal
└── README.md               # Este arquivo
├──testperformance/
|   ├── scripts/
│     └── api-test.js       # Script principal de teste
|   ├── results/
│     └── summary.json      # Relatório de execução

```

## 🚀 Como Executar

### **1. Instalação Completa**
```bash
npm run install:all
```

### **2. Instalação Separada**

#### **Backend:**
```bash
npm run backend:install
```

#### **Frontend:**
```bash
npm run frontend:install
```

### **3. Execução**

#### **Backend (API):**
```bash
npm run backend:start      # Produção
npm run backend:dev        # Desenvolvimento
```

#### **Frontend (Web):**
```bash
npm run frontend:start     # Produção
npm run frontend:dev       # Desenvolvimento
```

#### **Ambos Simultaneamente:**
```bash
npm run dev
```

### **4. Testes**

#### **Backend (Jest):**
```bash
npm run backend:test
```

#### **Frontend (Cypress):**
```bash
npm run frontend:cypress:open    # Interface gráfica
npm run frontend:cypress:run     # Modo headless
```

#### **Não Funcional (K6):**
```bash
k6 run testperformance/scripts/api-test.js # Opcional) Salve os resultados em JSON:
k6 run testperformance/scripts/api-test.js --out json=testperformance/results/summary.json # Modo headless
```
#### **Todos os Testes:**
```bash
npm test
```

## 🌐 Portas Utilizadas

- **Backend (API):** `http://localhost:3000`
- **Frontend (Web):** `http://localhost:3001`
- **Documentação API:** `http://localhost:3000/api-docs`

## 🛠️ Tecnologias Utilizadas

### **Backend:**
- Node.js + Express
- JWT para autenticação
- Swagger para documentação
- Jest para testes
- Supertest para testes de API

### **Frontend:**
- HTML5 + CSS3 + JavaScript
- Express para servidor estático
- Cypress para testes E2E

## 📋 Funcionalidades

### **Backend:**
- ✅ Autenticação JWT
- ✅ CRUD de usuários
- ✅ CRUD de pets
- ✅ Rate limiting
- ✅ Documentação Swagger
- ✅ Testes automatizados

### **Frontend:**
- ✅ Interface responsiva
- ✅ Sistema de login
- ✅ Gerenciamento de pets
- ✅ Testes E2E com Cypress


## 🔐 Credenciais de Teste

```
Usuário: brunna@example.com
Senha: 123456
```

## 📚 Documentação

- **Backend:** `cypress/README.md`
- **Frontend:** `frontend/README.md`
- **API:** `http://localhost:3000/api-docs`

## 🧪 Executando Testes Específicos

### **Cypress - Testes E2E:**
```bash
# Teste específico
npm run frontend:cypress:run:lembrarSenha
npm run frontend:cypress:run:login
npm run frontend:cypress:run:loginBloqueado
npm run frontend:cypress:run:loginInvalido

# Comando direto
npx cypress run --spec "cypress/e2e/lembrarSenha.cy.js"
```

### **Jest - Testes de API:**
```bash
# Todos os testes
npm run backend:test

# Com watch
npm run backend:test:watch

# Com cobertura
npm run backend:test:coverage
```



## 🔧 Desenvolvimento

### **Estrutura de Branches Recomendada:**
- `main` - Código estável
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades
- `bugfix/*` - Correções de bugs

### **Commits:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `test:` - Testes
- `refactor:` - Refatoração

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs do console
- Execute os testes para identificar falhas
- Consulte a documentação da API
- Verifique as configurações de porta

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
