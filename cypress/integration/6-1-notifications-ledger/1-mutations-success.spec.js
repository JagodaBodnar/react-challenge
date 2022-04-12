context('Succeeded mutations', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('should show notification when add ledger income record succeeds', () => {
    cy.contains('Wpłać').click();
    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .first()
      .find('input')
      .type('Test')
      .should('have.value', 'Test');

    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(1)
      .find('input')
      .type('1000000')
      .should('have.value', '1000000');

    cy.get('.MuiModal-root').contains('Zapisz').click();

    cy.wait(150);

    cy.contains('Wpływ został dodany').should('be.visible');
  });

  it('should show notification when add ledger expense record succeeds', () => {
    cy.contains('Wypłać').click();

    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .first()
      .find('input')
      .type('Test')
      .should('have.value', 'Test');

    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(1)
      .find('input')
      .type('1000000')
      .should('have.value', '1000000');

    cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(2).click();
    cy.get('li[data-value="8"]').click();
    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(2)
      .find('input')
      .should('have.value', '8');

    cy.get('.MuiModal-root').contains('Zapisz').click();

    cy.wait(150);

    cy.contains('Wydatek został zapisany').should('be.visible');
  });

  it('should show notification when remove ledger record succeeds', () => {
    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('[data-testid="DeleteIcon"]').click();

    cy.wait(150);

    cy.contains('Element został usunięty').should('be.visible');
  });
});
