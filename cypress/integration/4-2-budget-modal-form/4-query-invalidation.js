context('Form content - on "Zdefiniuj budżet" button click', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/budget');
  });
  it('should add new categories option when deleting budget record', () => {
    // delete a row
    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.wait(200);

    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 6);

    // open budget modal
    cy.contains('Zdefiniuj budżet').click();

    // open select
    cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();

    // removed row visible
    cy.get('li[data-value="8"]').should('be.visible');
  });

  it('should add new categories option when deleting multiple budget record', () => {
    // delete all rows
    const row = cy.get('thead').children('.MuiTableRow-root').first();
    row.find('input[type="checkbox"]').click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.wait(200);
    // open budget modal
    cy.contains('Zdefiniuj budżet').click();

    // open select
    cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();

    // removed row visible
    cy.get('li[data-value="8"]').should('be.visible');
    cy.get('li[data-value="7"]').should('be.visible');
    cy.get('li[data-value="6"]').should('be.visible');
    cy.get('li[data-value="5"]').should('be.visible');
    cy.get('li[data-value="4"]').should('be.visible');
    cy.get('li[data-value="3"]').should('be.visible');
    cy.get('li[data-value="2"]').should('be.visible');
    cy.get('li[data-value="1"]').should('be.visible');
  });

  it('should remove category option when adding budget record', () => {
    // delete a row
    cy.get('tbody').find('input[type="checkbox"]').first().click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.wait(200);
    cy.get('tbody').children('.MuiTableRow-root').should('have.length', 6);

    // open budget modal
    cy.contains('Zdefiniuj budżet').click();

    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(0)
      .find('input')
      .type('1000000');

    // open select
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

    cy.contains('Zdefiniuj budżet').click();

    cy.get('.MuiModal-root')
      .find('.MuiFormControl-root')
      .eq(0)
      .find('input')
      .type('1000000');

    // open select
    cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();

    cy.get('li[data-value="5"]').should('not.exist');
    cy.get('li[data-value="8"]').should('be.visible');
  });
});
