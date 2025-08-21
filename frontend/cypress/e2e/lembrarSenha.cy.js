describe('Funcionalidade de Lembrar Senha', () => {
  it('deve carregar a página de login corretamente', () => {
    // Arrange & Act
    cy.visit('/')
    
    // Assert - Verificar se a página de login está visível
    cy.get('#login-section').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.contains('Entrar').should('be.visible')
  })

  it('deve mostrar link para esqueci minha senha', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar se o link existe
    cy.contains('Esqueci minha senha').should('be.visible')
  })

  it('deve ter todos os elementos da tela de troca de senha', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar se os elementos da tela de troca de senha existem
    cy.get('#forgot-password-section').should('exist')
    cy.get('#reset-email').should('exist')
    cy.get('#new-password').should('exist')
    cy.contains('Trocar Senha').should('exist')
    cy.contains('Voltar ao Login').should('exist')
  })

  it('deve ter estrutura HTML correta', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar estrutura básica
    cy.get('body').should('exist')
    cy.get('main').should('exist')
    cy.get('nav').should('exist')
    cy.get('.card').should('exist')
  })
})