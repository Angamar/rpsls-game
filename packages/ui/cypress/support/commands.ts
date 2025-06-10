/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByTestIdLike(partialTestId: string): Chainable<JQuery<HTMLElement>>;
      selectCard(cardName: string): Chainable<void>;
      playCard(cardName: string): Chainable<void>;
      waitForDuelComplete(): Chainable<void>;
      checkGameState(expectedState: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByTestIdLike', (partialTestId: string) => {
  return cy.get(`[data-testid*="${partialTestId}"]`);
});

export {};
