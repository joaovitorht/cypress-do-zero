(Cypress._.times(3 , () =>{
    it('Testa a pagina politica privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')  // visita a pagina privacy.html
        cy.contains('h1', 'CAC TAT').should('be.visible')
        cy.contains('p', 'Talking About Testing').should('be.visible')
    })
}))