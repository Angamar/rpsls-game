import { resultMessageMap } from '../../src/components/RoundOutcomeMessage/RoundOutcomeMessage.helpers';
import { Result } from '@rpsls-game/shared';

describe('RPSLS Game Flow', () => {
  const bodyWin = {
    player: 2,
    computer: 1,
    result: 'win',
    winnerChoice: 'paper',
    loserChoice: 'rock',
    verb: 'covers',
  };

  const bodyLose = {
    player: 1,
    computer: 2,
    result: 'lose',
    winnerChoice: 'paper',
    loserChoice: 'rock',
    verb: 'covers',
  };

  const bodyTie = {
    player: 1,
    computer: 1,
    result: 'tie',
    winnerChoice: 'rock',
    loserChoice: 'rock',
    verb: null,
  };

  function playRound(body: any) {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const playerChoice = choices[body.player - 1];
    const computerChoice = choices[body.computer - 1];

    cy.intercept('POST', '/api/play', body).as('playRound');
    cy.getByTestId('button_game_start').click();
    cy.getByTestId(`button_player_card_${playerChoice}`).click();
    cy.getByTestId('button_play').click();

    cy.getByTestId('section_dueling_field').should('be.visible');
    cy.getByTestId('text_vs').should('be.visible');
    cy.getByTestId(`card_duel_player_${playerChoice}`).should('be.visible');
    cy.getByTestId(`card_duel_computer_${computerChoice}`).should('be.visible');
    cy.getByTestId('section_round_outcome').should('be.visible');
    cy.getByTestId('text_round_outcome').should(
      'contain.text',
      resultMessageMap[body.result as Result],
    );
    cy.getByTestId('text_outcome_sentence').should('be.visible');

    // Check outcome sentence
    if (body.result === 'tie') {
      cy.getByTestId('text_outcome_sentence').should(
        'contain.text',
        `${playerChoice} ties with ${computerChoice}!`,
      );
    } else {
      cy.getByTestId('text_outcome_sentence').should(
        'contain.text',
        `${body.winnerChoice} ${body.verb} ${body.loserChoice}!`,
      );
    }

    cy.getByTestId('section_player_hand').find('button').should('have.length', 4);
    cy.getByTestId('section_computer_hand').find('button').should('have.length', 4);
  }

  beforeEach(() => {
    // Mock API responses
    cy.intercept('GET', '/api/choices', { fixture: 'choices.json' }).as('getChoices');
    cy.intercept('POST', '/api/play', bodyWin).as('playRound');

    cy.visit('/');
  });

  it('should render landing page with start button', () => {
    cy.getByTestId('section_menu').should('be.visible');
    cy.getByTestId('section_looping_text_banner_top').should('be.visible');
    cy.getByTestId('section_looping_text_banner_bottom').should('be.visible');
    cy.getByTestId('section_game_title').should('be.visible');
    cy.getByTestId('button_game_start').should('be.visible');
    cy.getByTestId('button_game_start').contains('PLAY!');
  });

  it('should navigate to game page on start', () => {
    cy.getByTestId('section_game').should('not.exist');

    cy.getByTestId('button_game_start').click();

    cy.getByTestId('section_game').should('be.visible');
  });

  it('should display 5 cards in each hand on game start', () => {
    cy.getByTestId('button_game_start').click();

    // Should have 5 cards in player hand
    cy.getByTestId('section_player_hand')
      .should('be.visible')
      .find('button')
      .should('have.length', 5);
    cy.getByTestId('section_player_hand').find('button').should('have.length', 5);
    cy.getByTestId('button_player_card_rock').should('be.visible');
    cy.getByTestId('button_player_card_paper').should('be.visible');
    cy.getByTestId('button_player_card_scissors').should('be.visible');
    cy.getByTestId('button_player_card_lizard').should('be.visible');
    cy.getByTestId('button_player_card_spock').should('be.visible');
    // Should have 5 cards in computer hand
    cy.getByTestId('section_computer_hand')
      .should('be.visible')
      .find('button')
      .should('have.length', 5);
    cy.getByTestId('button_computer_card').should('have.length', 5);
  });

  it('should allow player to play a card', () => {
    cy.getByTestId('button_game_start').click();

    cy.getByTestId('button_play').should('not.exist');
    cy.getByTestId('button_player_card_rock').click();
    cy.getByTestId('button_play').should('be.visible');
    //TODO: check why this is not working
    // cy.getByTestId('button_play').contains('play');

    cy.getByTestId('button_play').click();
    cy.getByTestId('section_player_hand').find('button').should('have.length', 4);
    cy.getByTestId('button_player_card_rock').should('not.exist');
  });

  it('should win the round', () => {
    playRound(bodyWin);
  });

  it('should lose the round', () => {
    playRound(bodyLose);
  });

  it('should tie the round', () => {
    playRound(bodyTie);
  });
});
