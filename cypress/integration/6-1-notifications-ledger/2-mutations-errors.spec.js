context('Failed mutations', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('should show notification when add ledger income record fails', () => {
    cy.contains('Wpłać').click();

    cy.intercept('POST', 'http://localhost:4320/ledger', { statusCode: 400 });

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

    cy.contains('Wystąpił nieoczekiwany błąd').should('be.visible');
  });
  it('should show notification when add ledger expense record succeeds', () => {
    cy.contains('Wypłać').click();

    cy.intercept('POST', 'http://localhost:4320/ledger', { statusCode: 400 });

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

    cy.contains('Wystąpił nieoczekiwany błąd').should('be.visible');
  });

  it('should show notification when remove ledger record fails', () => {
    cy.intercept('DELETE', 'http://localhost:4320/ledger/*', {
      statusCode: 400,
    });

    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('[data-testid="DeleteIcon"]').click();

    cy.contains('Wystąpił nieoczekiwany błąd').should('be.visible');
  });
});
