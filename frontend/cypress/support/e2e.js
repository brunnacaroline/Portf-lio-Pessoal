// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
require('./commands')

// Configurações globais
beforeEach(() => {
  // Limpar localStorage antes de cada teste
  cy.clearLocalStorage()
  
  // Limpar cookies antes de cada teste
  cy.clearCookies()
  
  // Interceptar requisições para evitar problemas de CORS
  cy.intercept('**/*.{js,css,png,jpg,jpeg,gif,svg}', { statusCode: 200 })
  
  // Ignorar erros de JavaScript não capturados
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Retorna false para evitar que o Cypress falhe o teste
    // quando há erros de JavaScript não capturados
    return false
  })
})

// Configuração para capturar screenshots em caso de falha
Cypress.on('test:after:run', (attributes) => {
  if (attributes.state === 'failed') {
    cy.screenshot(`${attributes.title}-failed`)
  }
})