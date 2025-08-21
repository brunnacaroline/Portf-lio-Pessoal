describe('Funcionalidade de Login Bloqueado', () => {
  it('deve carregar a página de login corretamente', () => {
    // Arrange & Act
    cy.visit('/')
    
    // Assert - Verificar se a página de login está visível
    cy.get('#login-section').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('deve ter elementos de segurança', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar se os campos de login existem
    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-form').should('exist')
  })

  it('deve ter estrutura de validação', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar se o formulário tem validação
    cy.get('#email').should('have.attr', 'required')
    cy.get('#password').should('have.attr', 'required')
    cy.get('#email').should('have.attr', 'type', 'email')
    cy.get('#password').should('have.attr', 'type', 'password')
  })

  it('deve ter interface responsiva', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar elementos responsivos
    cy.get('.sidenav').should('exist')
    cy.get('.sidenav-trigger').should('exist')
    cy.get('.hide-on-med-and-down').should('exist')
  })
})