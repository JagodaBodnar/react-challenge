context('Form content - on "Zdefiniuj budżet" button click', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/budget');
    cy.contains('Zdefiniuj budżet').click();
  });

  it('should save data and add new row to the table', () => {
    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(0)
      .find('input')
      .type('1000000')
      .should('have.value', '1000000');

    cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();
    cy.get('li[data-value="5"]').click();
    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(1)
      .find('input')
      .should('have.value', '5');

    cy.get('.MuiModal-root').contains('Zapisz').click();
    cy.get('.MuiModal-root').should('not.be.visible');
    cy.wait(200);
    cy.get('tbody').children('.MuiTableRow-root').contains('Ubezpieczenia');
  });

  it('should display text instead of form when there are no free categories available', () => {
    // TODO fill it up
  });
});
