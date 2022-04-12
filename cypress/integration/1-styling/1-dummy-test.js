context('Dummy test', () => {
  it('should always pass', () => {
    cy.visit('/budget');

    cy.get('div').should('exist');

    // Prawdziwy test dla tego zadania jest wykonywany przy pomocy komendy npm run test
  });
});
