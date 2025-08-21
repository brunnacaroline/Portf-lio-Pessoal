describe('Funcionalidade de Login', () => {
  it('deve carregar a página de login corretamente', () => {
    // Arrange & Act
    cy.visit('/')
    
    // Assert - Verificar se a página de login está visível
    cy.get('#login-section').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.contains('Entrar').should('be.visible')
  })

  it('deve ter todos os elementos necessários', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar elementos do formulário
    cy.get('#login-form').should('exist')
    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.contains('Entrar').should('exist')
  })

  it('deve ter navegação funcional', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar elementos de navegação
    cy.get('nav').should('exist')
    cy.get('.brand-logo').should('exist')
    cy.get('.sidenav-trigger').should('exist')
  })

  it('deve ter estrutura de layout correta', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar estrutura básica
    cy.get('body').should('exist')
    cy.get('main').should('exist')
    cy.get('.card').should('exist')
    cy.get('.container').should('exist')
  })
})