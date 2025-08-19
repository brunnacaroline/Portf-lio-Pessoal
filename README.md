# 🐾 Adopet API - Sistema de Adoção de Pets

API REST completa para sistema de adoção de pets com autenticação, desenvolvida em JavaScript/Node.js com Express.

## 🎯 Objetivo

Esta API foi desenvolvida para estudos de testes de software, implementando todas as regras de negócio especificadas para autenticação e adoção de pets.

## 🚀 Funcionalidades

### 🔐 Autenticação (Cenário 01)
- ✅ Criação de usuários
- ✅ Login com email e senha
- ✅ Geração de token JWT
- ✅ Validação de credenciais
- ✅ Bloqueio após 3 tentativas de login
- ✅ Troca de senha (esqueci minha senha)

### 🐾 Adoção de Pets (Cenário 02)
- ✅ Listagem de pets disponíveis
- ✅ Visualização da home de adoção
- ✅ Escolha de pet para adoção
- ✅ Validações de seleção
- ✅ Mensagens personalizadas de sucesso

## 📋 Regras de Negócio Implementadas

### RN01: Criação de Usuário
- API permite criar usuário com email, senha e nome

### RN02: Login com Sucesso
- Usuário fornece email e senha válidos
- API retorna token de autenticação

### RN03: Validação de Credenciais
- Mensagem de erro para usuário/senha inválidos
- Validação de campos obrigatórios

### RN04: Bloqueio por Tentativas
- Usuário bloqueado após 3 tentativas de login
- Bloqueio por 15 minutos

### RN05: Troca de Senha
- Serviço para troca de senha
- Requer email válido

### RN06: Escolha de Pet
- API permite escolher pet para adoção

### RN07: Adoção com Sucesso
- Retorna nome, espécie e idade do pet escolhido

### RN08: Validação de Seleção
- Mensagem de erro se pet não for escolhido

### RN09: Mensagem de Sucesso
- Mensagem personalizada: "A Adopet Brunna fica feliz em telo junto nessa jornada Não compre, Adote"

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas
- **Swagger** - Documentação da API
- **CORS** - Cross-origin resource sharing
- **Helmet** - Segurança
- **Rate Limiting** - Proteção contra ataques

## 📁 Estrutura do Projeto

```
Portfolio-pessoal/
├── data/
│   └── mockData.js          # Dados mockados de usuários e pets
├── middleware/
│   └── auth.js              # Middleware de autenticação
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   └── pets.js              # Rotas de pets
├── scripts/
│   └── initData.js          # Script de inicialização
├── tests/
│   └── api.test.js          # Testes automatizados da API
├── web/                     # 🆕 Aplicação Web Frontend
│   ├── index.html           # Página principal
│   ├── css/
│   │   └── style.css        # Estilos personalizados
│   ├── js/
│   │   └── app.js           # Lógica da aplicação
│   ├── server.js            # Servidor web simples
│   ├── package.json         # Dependências da web
│   └── README.md            # Documentação da web
├── server.js                # Servidor principal da API
├── package.json             # Dependências da API
├── jest.config.js           # Configuração dos testes
├── config.env.example       # Exemplo de configuração
└── README.md                # Documentação principal
```

## 🚀 Como Executar

### 1. **API Backend**
```bash
# Instalar dependências da API
npm install

# Inicializar dados mockados
node scripts/initData.js

# Executar servidor da API
npm start
```

**Acessar API:**
- **Servidor**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api-docs
- **API de Autenticação**: http://localhost:3000/api/auth
- **API de Pets**: http://localhost:3000/api/pets

### 2. **Aplicação Web** 🆕
```bash
# Navegar para pasta web
cd web

# Instalar dependências da web
npm install

# Executar aplicação web
npm start
```

**Acessar Web:**
- **Aplicação Web**: http://localhost:8080
- **Interface completa**: Login, pets, adoção

## 🔑 Credenciais de Teste

### Usuários Pré-cadastrados
| Nome | Email | Senha |
|------|-------|-------|
| Brunna Silva | brunna@example.com | 123456 |
| Maria Santos | maria@example.com | 123456 |
| João Oliveira | joao@example.com | 123456 |

### Pets Disponíveis
| Nome | Espécie | Raça | Idade |
|------|---------|------|-------|
| Rex | Cachorro | Labrador | 3 anos |
| Mimi | Gato | Persa | 2 anos |
| Thor | Cachorro | Husky Siberiano | 1 ano |

## 📚 Endpoints da API

### 🔐 Autenticação

#### POST `/api/auth/register`
Criar novo usuário
```json
{
  "email": "usuario@example.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

#### POST `/api/auth/login`
Realizar login
```json
{
  "email": "brunna@example.com",
  "password": "123456"
}
```

#### POST `/api/auth/reset-password`
Trocar senha
```json
{
  "email": "brunna@example.com",
  "newPassword": "novaSenha123"
}
```

### 🐾 Pets

#### GET `/api/pets`
Listar todos os pets disponíveis

#### GET `/api/pets/{id}`
Obter detalhes de um pet específico

#### GET `/api/pets/home`
Acessar home de adoção (requer autenticação)

#### POST `/api/pets/adopt`
Escolher pet para adoção (requer autenticação)
```json
{
  "petId": 1
}
```

#### GET `/api/pets/search?species=Cachorro&breed=Labrador`
Buscar pets por filtros

## 🧪 Testando a Aplicação

### **1. Testar API Backend**
```bash
# Criar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"123456","name":"Usuário Teste"}'

# Fazer login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"brunna@example.com","password":"123456"}'

# Listar pets
curl http://localhost:3000/api/pets

# Adotar pet (com token)
curl -X POST http://localhost:3000/api/pets/adopt \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"petId":1}'
```

### **2. Testar Aplicação Web** 🆕
```bash
# Acessar interface web
# http://localhost:8080

# Usar credenciais:
# Email: brunna@example.com
# Senha: 123456

# Testar fluxo completo:
# 1. Login → 2. Ver pets → 3. Selecionar pet → 4. Adotar
```

## 🔒 Segurança

- **Rate Limiting**: Máximo 3 tentativas de login por 15 minutos
- **JWT**: Tokens com expiração de 24 horas
- **bcrypt**: Senhas criptografadas com salt
- **Helmet**: Headers de segurança
- **CORS**: Configuração segura de cross-origin

## 📖 Documentação Swagger

A API possui documentação completa em Swagger disponível em:
- **URL**: http://localhost:3000/api-docs
- **Especificação**: OpenAPI 3.0.0
- **Autenticação**: Bearer Token (JWT)

## 🎯 Casos de Teste

### **Cenário 01: Autenticação**
1. ✅ Criar usuário com dados válidos
2. ✅ Fazer login com credenciais corretas
3. ✅ Tentar login com credenciais inválidas
4. ✅ Verificar bloqueio após 3 tentativas
5. ✅ Trocar senha com email válido

### **Cenário 02: Adoção de Pets**
1. ✅ Visualizar lista de pets disponíveis
2. ✅ Acessar home de adoção (autenticado)
3. ✅ Escolher pet para adoção
4. ✅ Validar seleção obrigatória
5. ✅ Receber mensagem de sucesso personalizada

### **Cenário 03: Interface Web** 🆕
1. ✅ Acessar aplicação web
2. ✅ Fazer login pela interface
3. ✅ Navegar entre seções
4. ✅ Selecionar pet visualmente
5. ✅ Adotar pet pela interface
6. ✅ Receber feedback visual
7. ✅ Fazer logout

## 🚧 Limitações

- **Dados em Memória**: Não persiste entre reinicializações
- **Desenvolvimento**: Não recomendado para produção
- **Autenticação Simples**: JWT básico sem refresh tokens

## 🤝 Contribuição

Este projeto foi desenvolvido para fins educacionais e de estudo de testes de software.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

**Desenvolvido por Brunna** 🚀
*"Não compre, Adote!"* 🐾
