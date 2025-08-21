describe('Funcionalidade de Login Inválido', () => {
  it('deve carregar a página de login corretamente', () => {
    // Arrange & Act
    cy.visit('/')
    
    // Assert - Verificar se a página de login está visível
    cy.get('#login-section').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('deve ter validação de campos', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar validação dos campos
    cy.get('#email').should('have.attr', 'required')
    cy.get('#password').should('have.attr', 'required')
    cy.get('#email').should('have.class', 'validate')
    cy.get('#password').should('have.class', 'validate')
  })

  it('deve ter estrutura de formulário', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar estrutura do formulário
    cy.get('#login-form').should('exist')
    cy.get('.input-field').should('exist')
    cy.get('.material-icons').should('exist')
  })

  it('deve ter elementos de acessibilidade', () => {
    // Arrange
    cy.visit('/')
    
    // Assert - Verificar elementos de acessibilidade
    cy.get('label[for="email"]').should('exist')
    cy.get('label[for="password"]').should('exist')
    cy.get('.prefix').should('exist')
  })
})