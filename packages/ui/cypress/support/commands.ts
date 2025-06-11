/// <reference types="cypress" />
import { Choice, Result } from '@rpsls-game/shared';
import { createRoundBody, getChoiceName } from './game-utils';
import { resultMessageMap } from '../../src/components/RoundOutcomeMessage/RoundOutcomeMessage.helpers';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByTestIdLike(partialTestId: string): Chainable<JQuery<HTMLElement>>;
      selectCard(choice: Choice): Chainable<void>;
      playRound(playerChoice: Choice, computerChoice: Choice): Chainable<void>;
      startGame(): Chainable<void>;
      waitForDuelComplete(): Chainable<void>;
      checkRoundOutcome(result: Result, verb?: string | null): Chainable<void>;
      checkHandSizes(playerCards: number, computerCards: number): Chainable<void>;
      playFullSet(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByTestIdLike', (partialTestId: string) => {
  return cy.get(`[data-testid*="${partialTestId}"]`);
});

Cypress.Commands.add('selectCard', (choice: Choice) => {
  const choiceName = getChoiceName(choice);
  cy.getByTestId(`button_player_card_${choiceName}`).click();
});

Cypress.Commands.add('playRound', (playerChoice: Choice, computerChoice: Choice) => {
  const body = createRoundBody(playerChoice, computerChoice);
  const playerChoiceName = getChoiceName(playerChoice);
  const computerChoiceName = getChoiceName(computerChoice);

  cy.intercept('POST', '/api/play', body).as('playRound');
  cy.selectCard(playerChoice);
  cy.getByTestId('button_play').should('be.visible').click();

  // Verify duel screen
  cy.getByTestId('section_dueling_field').should('be.visible');
  cy.getByTestId('text_vs').should('be.visible');
  cy.getByTestId(`card_duel_player_${playerChoiceName}`).should('be.visible');
  cy.getByTestId(`card_duel_computer_${computerChoiceName}`).should('be.visible');
  cy.checkRoundOutcome(body.result, body.verb);
});

Cypress.Commands.add('startGame', () => {
  cy.getByTestId('button_game_start').click();
  cy.getByTestId('section_game').should('be.visible');
  cy.checkHandSizes(5, 5);
});

Cypress.Commands.add('waitForDuelComplete', () => {
  cy.getByTestId('section_dueling_field').should('be.visible');
  cy.getByTestId('section_round_outcome').should('be.visible');
});

Cypress.Commands.add('checkRoundOutcome', (result: Result, verb?: string | null) => {
  cy.getByTestId('section_round_outcome').should('be.visible');

  cy.getByTestId('text_round_outcome').should('contain.text', resultMessageMap[result]);
  cy.getByTestId('text_outcome_sentence').should('be.visible');

  if (verb) {
    cy.getByTestId('text_outcome_sentence').should('contain.text', verb);
  }
});

Cypress.Commands.add('checkHandSizes', (playerCards: number, computerCards: number) => {
  cy.getByTestId('section_player_hand').find('button').should('have.length', playerCards);

  cy.getByTestId('section_computer_hand').find('button').should('have.length', computerCards);
});

Cypress.Commands.add('playFullSet', () => {
  cy.playRound(Choice.Paper, Choice.Rock); // Win
  cy.playRound(Choice.Rock, Choice.Paper); // Lose
  cy.playRound(Choice.Scissors, Choice.Scissors); // Tie
  cy.playRound(Choice.Lizard, Choice.Spock); // Win
  cy.playRound(Choice.Spock, Choice.Rock); // Win

  cy.getByTestId('wrapper_modal').should('be.visible');
});
