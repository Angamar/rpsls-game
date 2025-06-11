import { Choice } from '@rpsls-game/shared';

describe('Menu screen', () => {
  it('should render landing page with start button', () => {
    cy.visit('/');
    cy.getByTestId('section_menu').should('be.visible');
    cy.getByTestId('section_game_title').should('be.visible');
    cy.getByTestId('button_game_start').should('be.visible').contains('PLAY!');
  });

  it('should navigate to game page on start', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/choices', { fixture: 'choices.json' }).as('getChoices');
    cy.getByTestId('section_game').should('not.exist');
    cy.startGame();
    cy.getByTestId('section_game').should('be.visible');
  });
});

describe.only('Game screen', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/choices', { fixture: 'choices.json' }).as('getChoices');
    cy.visit('/');
    cy.startGame();
  });

  it('should display 5 cards in each hand on game start', () => {
    cy.getByTestId('button_player_card_rock').should('be.visible');
    cy.getByTestId('button_player_card_paper').should('be.visible');
    cy.getByTestId('button_player_card_scissors').should('be.visible');
    cy.getByTestId('button_player_card_lizard').should('be.visible');
    cy.getByTestId('button_player_card_spock').should('be.visible');
  });

  it('should allow player to select and play a card', () => {
    cy.getByTestId('button_play').should('not.exist');
    cy.selectCard(Choice.Rock);
    cy.getByTestId('button_play').should('be.visible');
  });

  it('should win a round', () => {
    cy.playRound(Choice.Paper, Choice.Rock);
  });

  it('should lose a round', () => {
    cy.playRound(Choice.Rock, Choice.Paper);
  });

  it('should tie a round', () => {
    cy.playRound(Choice.Rock, Choice.Rock);
  });

  it.only('should render set end modal after full set was played', () => {
    cy.playRound(Choice.Paper, Choice.Rock); // Win
    cy.playRound(Choice.Rock, Choice.Paper); // Lose
    cy.playRound(Choice.Scissors, Choice.Scissors); // Tie
    cy.playRound(Choice.Lizard, Choice.Spock); // Win
    cy.playRound(Choice.Spock, Choice.Rock); // Win

    cy.getByTestId('wrapper_modal').should('be.visible');
    cy.getByTestId('wrapper_modal_content').should('be.visible');
    cy.getByTestId('wrapper_modal').should('be.visible');
    cy.getByTestId('button_play').should('be.visible');
  });
});
