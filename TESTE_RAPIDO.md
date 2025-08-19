# 🚀 Teste Rápido da API Adopet

Este guia permite testar rapidamente se a API está funcionando corretamente.

## 📋 Pré-requisitos

1. ✅ Node.js instalado (versão 14 ou superior)
2. ✅ Dependências instaladas (`npm install`)
3. ✅ Servidor rodando (`npm start`)

## 🔧 Configuração Inicial

```bash
# 1. Instalar dependências
npm install

# 2. Inicializar dados mockados
node scripts/initData.js

# 3. Iniciar servidor
npm start
```

## 🧪 Testes Manuais

### 1. Testar Rota Principal
```bash
curl http://localhost:3000/
```
**Resultado esperado**: Mensagem de boas-vindas da API

### 2. Testar Listagem de Pets
```bash
curl http://localhost:3000/api/pets
```
**Resultado esperado**: Lista de 3 pets disponíveis

### 3. Testar Criação de Usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"123456","name":"Usuário Teste"}'
```
**Resultado esperado**: Usuário criado com sucesso

### 4. Testar Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"brunna@example.com","password":"123456"}'
```
**Resultado esperado**: Login bem-sucedido com token JWT

### 5. Testar Home de Adoção (com token)
```bash
# Substitua SEU_TOKEN_AQUI pelo token recebido no login
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:3000/api/pets/home
```
**Resultado esperado**: Home de adoção carregada com pets disponíveis

### 6. Testar Adoção de Pet
```bash
# Substitua SEU_TOKEN_AQUI pelo token recebido no login
curl -X POST http://localhost:3000/api/pets/adopt \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"petId":1}'
```
**Resultado esperado**: Pet escolhido com mensagem de sucesso personalizada

## 🔍 Verificações Importantes

### ✅ Cenário 01: Autenticação
- [ ] Criação de usuário funciona
- [ ] Login com credenciais válidas retorna token
- [ ] Login com credenciais inválidas retorna erro
- [ ] Troca de senha funciona

### ✅ Cenário 02: Adoção de Pets
- [ ] Listagem de pets funciona
- [ ] Home de adoção requer autenticação
- [ ] Seleção de pet para adoção funciona
- [ ] Mensagem de sucesso personalizada é exibida

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port already in use"
```bash
# Mude a porta no server.js ou mate o processo
lsof -ti:3000 | xargs kill -9
```

### Erro: "Token não fornecido"
- Verifique se está enviando o header `Authorization: Bearer TOKEN`
- Certifique-se de que o token não expirou

### Erro: "Usuário bloqueado"
- Aguarde 15 minutos ou reinicie o servidor
- O bloqueio é temporário e automático

## 📱 Testando com Postman/Insomnia

1. **Importe as seguintes requisições:**

### POST /api/auth/login
```json
{
  "email": "brunna@example.com",
  "password": "123456"
}
```

### GET /api/pets/home
**Headers**: `Authorization: Bearer {{token}}`

### POST /api/pets/adopt
**Headers**: `Authorization: Bearer {{token}}`
**Body**:
```json
{
  "petId": 1
}
```

## 🌐 Acessando a Documentação

Abra no navegador: **http://localhost:3000/api-docs**

A documentação Swagger permite testar todos os endpoints diretamente no navegador.

## 📊 Verificando Status

```bash
# Verificar se o servidor está rodando
curl http://localhost:3000/health

# Verificar logs do servidor
# Os logs aparecem no terminal onde o servidor foi iniciado
```

## 🎯 Resultado Esperado

Se tudo estiver funcionando, você deve conseguir:
1. ✅ Criar usuários
2. ✅ Fazer login
3. ✅ Visualizar pets disponíveis
4. ✅ Acessar home de adoção
5. ✅ Escolher pet para adoção
6. ✅ Receber mensagem de sucesso personalizada

## 🚨 Casos de Erro

### Teste de Bloqueio por Tentativas
```bash
# Tente fazer login 3 vezes com senha errada
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"brunna@example.com","password":"senha-errada"}'
```

Na 3ª tentativa, você deve receber: "Usuário bloqueado por múltiplas tentativas de login"

---

**🎉 Se todos os testes passarem, sua API está funcionando perfeitamente!**
