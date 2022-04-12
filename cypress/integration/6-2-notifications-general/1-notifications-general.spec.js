context('General notification requirements  ', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('notification should hide after 5000', () => {
    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.wait(150);
    cy.contains('Element został usunięty').should('exist');
    cy.wait(3000);

    cy.contains('Element został usunięty').should('exist');
    cy.wait(2000);

    cy.contains('Element został usunięty').should('not.exist');
  });
});
