const buttonSubmitElement = 'button[type="submit"]';
const buttonResetElement = 'button[aria-label="reset"]';
const inputElement = 'input[data-testid="input"]';
const selectElement = 'button[data-testid="select-trigger"]';
const sectionSearchedProducts = 'section[data-testid="searched-product-section"]';

describe('Product Search', () => {
  beforeEach(() => {
    cy.visit('/product-search');
  });

  it('Button should be disabled when no search params are provided', () => {
    cy.get(buttonSubmitElement).should('be.disabled');
  });

  it('Button should be enabled when some input is provided', () => {
    cy.get(inputElement).type('lorem ipsum');
    cy.get(buttonSubmitElement).should('not.be.disabled');
  });

  it('Button should be enabled when some category is selected', () => {
    cy.get(selectElement).first().click().should('have.data', 'state', 'open');
    cy.get('[data-testid="select-item-Baby"]').click();
    cy.get(buttonSubmitElement).should('not.be.disabled');
  });

  it('Button reset should appear when search params are provided', () => {
    cy.get(inputElement).type('lorem ipsum');
    cy.get(buttonResetElement).should('have.text', 'reset');
  });

  it('should trigger a search and find some products', () => {
    cy.get(selectElement).first().click().should('have.data', 'state', 'open');
    cy.get('[data-testid="select-item-Baby"]').click();
    cy.get(buttonSubmitElement).click();
    cy.get(sectionSearchedProducts);
  });

  it('should clean up search when triggers the reset button', () => {
    cy.get(inputElement).type('lorem ipsum');
    cy.get(buttonResetElement).click();
    cy.get(inputElement).should('have.value', '');
  });
});
