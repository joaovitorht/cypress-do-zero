/*
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('João')
  cy.get('#lastName').type('Takayama')
  cy.get('#email').type('joaoht123@gmail.com')
  cy.get('#open-text-area').type('Escrevendo dentro do textarea')
  cy.get('button[type="submit"]').click()
})
  */

//precisa ser em letra minúscula, senão não funciona primeiro o nome q vou usar la no meu CAC e depois a funçao q ele
//  realiza

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (testar = {
    firstName: 'DSefault',
    lastName: 'Taklayama',
    email: 'meuemail@asd.com',
    text: 'novo texto escrito'
}) => {
  cy.get('#firstName').type(testar.firstName)
  cy.get('#lastName').type(testar.lastName)
  cy.get('#email').type(testar.email)
  cy.get('#open-text-area').type(testar.text)
  cy.get('button[type="submit"]').click()
})

// pode colocar algo como valor padrao para sempre usar ele, caso queria posso usar data e colocar algo mais especifico