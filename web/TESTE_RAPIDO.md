# 🚀 Teste Rápido da Aplicação Web Adopet

Este guia permite testar rapidamente se a aplicação web está funcionando corretamente.

## 📋 Pré-requisitos

1. ✅ API Backend rodando na porta 3000
2. ✅ Node.js instalado (versão 14 ou superior)
3. ✅ Dependências da web instaladas (`npm install`)

## 🔧 Configuração Inicial

```bash
# 1. Navegar para pasta web
cd web

# 2. Instalar dependências
npm install

# 3. Executar aplicação web
npm start
```

## 🌐 URLs de Acesso

- **Aplicação Web**: http://localhost:8080
- **API Backend**: http://localhost:3000
- **Documentação API**: http://localhost:3000/api-docs

## 🧪 Testes Manuais

### 1. **Testar Acesso à Aplicação**
- Abra http://localhost:8080 no navegador
- **Resultado esperado**: Tela de login carregada com logo Adopet

### 2. **Testar Login Válido**
- Email: `brunna@example.com`
- Senha: `123456`
- Clique em "Entrar"
- **Resultado esperado**: Redirecionamento para home com mensagem de boas-vindas

### 3. **Testar Login Inválido**
- Email: `brunna@example.com`
- Senha: `senha-errada`
- Clique em "Entrar"
- **Resultado esperado**: Toast vermelho com mensagem de erro

### 4. **Testar Bloqueio por Tentativas**
- Tente login inválido 3 vezes seguidas
- **Resultado esperado**: Usuário bloqueado por 15 minutos

### 5. **Testar Troca de Senha**
- Clique em "Esqueci minha senha"
- Email: `brunna@example.com`
- Nova senha: `novaSenha123`
- Clique em "Trocar Senha"
- **Resultado esperado**: Senha alterada com sucesso

### 6. **Testar Visualização de Pets**
- Faça login válido
- Clique em "Ver Pets Disponíveis"
- **Resultado esperado**: Grid com 3 pets carregados da API

### 7. **Testar Seleção de Pet**
- Clique na foto de um pet
- **Resultado esperado**: Pet selecionado com borda verde e checkmark

### 8. **Testar Adoção de Pet**
- Com pet selecionado, clique em "Adotar Pet Selecionado"
- **Resultado esperado**: Mensagem de sucesso personalizada da Brunna

### 9. **Testar Cancelar Adoção**
- Clique em "Cancelar"
- **Resultado esperado**: Seleção desfeita

### 10. **Testar Logout**
- Clique em "Sair" no menu
- **Resultado esperado**: Retorna à tela de login

## 🔍 Verificações Importantes

### ✅ **Cenário 01: Autenticação**
- [ ] Tela de login carrega corretamente
- [ ] Login válido redireciona para home
- [ ] Login inválido mostra toast vermelho
- [ ] 3 tentativas inválidas bloqueiam usuário
- [ ] Troca de senha funciona

### ✅ **Cenário 02: Adoção de Pets**
- [ ] Lista de pets carrega da API
- [ ] Seleção visual de pets funciona
- [ ] Adoção retorna mensagem personalizada
- [ ] Cancelar adoção funciona
- [ ] Logout retorna ao login

## 🐛 Solução de Problemas

### **Erro: "Cannot connect to API"**
```bash
# Verificar se API está rodando
curl http://localhost:3000/

# Verificar porta da API
netstat -an | grep 3000
```

### **Erro: "Port 8080 already in use"**
```bash
# Mudar porta no server.js ou matar processo
lsof -ti:8080 | xargs kill -9
```

### **Erro: "MaterializeCSS not loading"**
- Verifique conexão com internet
- Confirme se CDN está acessível
- Verifique console do navegador

### **Erro: "CORS error"**
- Verifique se API tem CORS habilitado
- Confirme se URLs estão corretas

## 📱 Testando Responsividade

### **Desktop (1920x1080)**
- ✅ Layout completo
- ✅ Navegação horizontal
- ✅ Grid de pets em 3 colunas

### **Tablet (768x1024)**
- ✅ Layout adaptativo
- ✅ Menu lateral
- ✅ Grid de pets em 2 colunas

### **Mobile (375x667)**
- ✅ Layout mobile-first
- ✅ Menu hambúrguer
- ✅ Grid de pets em 1 coluna

## 🌐 Testando em Diferentes Browsers

### **Chrome**
- ✅ Funcionalidades completas
- ✅ MaterializeCSS funcionando
- ✅ JavaScript ES6+ suportado

### **Firefox**
- ✅ Funcionalidades completas
- ✅ MaterializeCSS funcionando
- ✅ JavaScript ES6+ suportado

### **Safari**
- ✅ Funcionalidades completas
- ✅ MaterializeCSS funcionando
- ✅ JavaScript ES6+ suportado

### **Edge**
- ✅ Funcionalidades completas
- ✅ MaterializeCSS funcionando
- ✅ JavaScript ES6+ suportado

## 📊 Verificando Console

### **Console do Navegador**
- ✅ Sem erros JavaScript
- ✅ Requisições para API funcionando
- ✅ Tokens JWT sendo gerados

### **Network Tab**
- ✅ Requisições para localhost:3000
- ✅ Respostas da API recebidas
- ✅ Status codes corretos

### **Application Tab**
- ✅ LocalStorage com tokens
- ✅ SessionStorage limpo
- ✅ Cookies configurados

## 🎯 Resultado Esperado

Se tudo estiver funcionando, você deve conseguir:

1. ✅ Acessar a aplicação web
2. ✅ Fazer login com credenciais válidas
3. ✅ Ver tela de boas-vindas personalizada
4. ✅ Visualizar lista de pets da API
5. ✅ Selecionar pet para adoção
6. ✅ Adotar pet com sucesso
7. ✅ Receber mensagem personalizada da Brunna
8. ✅ Fazer logout e retornar ao login

## 🚨 Casos de Erro

### **Teste de Bloqueio**
```bash
# Tente login inválido 3 vezes
# Deve bloquear usuário por 15 minutos
# Toast deve mostrar mensagem de bloqueio
```

### **Teste de Validação**
```bash
# Deixe campos vazios
# Deve mostrar toast vermelho
# Deve impedir envio do formulário
```

### **Teste de API Offline**
```bash
# Pare a API backend
# Tente fazer login
# Deve mostrar erro de conexão
```

---

**🎉 Se todos os testes passarem, sua aplicação web está funcionando perfeitamente!**

**Próximo passo**: Testar integração completa entre web e API! 🚀
