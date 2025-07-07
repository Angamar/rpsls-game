const isCypressTest = (window as any).Cypress || (window as any).cy;
const multiplier = isCypressTest ? 0.25 : 1;
type GameSpeed = 'normal' | 'faster' | 'fastest';

const getSpeedMultiplier = (speed: GameSpeed): number => {
  switch (speed) {
    case 'normal':
      return 1;
    case 'faster':
      return 0.75;
    case 'fastest':
      return 0.5;
    default:
      return 1;
  }
};

const currentSpeed: GameSpeed = 'fastest';
const gameSpeedMultiplier = isCypressTest ? 0.25 : getSpeedMultiplier(currentSpeed);

export const GAME_SPEED = {
  DUEL_DURATION: 2000 * gameSpeedMultiplier,
  ROUND_COMPLETE_DELAY: 2000 * gameSpeedMultiplier,
};

export const ANIMATION_DURATIONS = {
  // Modal animations
  MODAL_BACKDROP_SHOW: 0.3 * multiplier,
  MODAL_BACKDROP_HIDE: 0.2 * multiplier,
  MODAL_CONTENT_HIDE: 0.2 * multiplier,

  // Player card animations
  CARD_SCALE_TRANSITION: 0.3 * multiplier,
  CARD_SCALE_TRANSITION_DUELING: 0.4 * multiplier,
  CARD_Y_TRANSITION: 0.3 * multiplier,
  CARD_Y_TRANSITION_DUELING: 0.4 * multiplier,
  CARD_ROTATION_Y: 3 * multiplier,
  CARD_ROTATION_X: 2.5 * multiplier,
  CARD_SCALE_GLOW: 2 * multiplier,
  CARD_HOVER: 0.2 * multiplier,
  CARD_PULSING_BORDER: 2 * multiplier,

  // Computer card animations
  COMPUTER_CARD_Y_BASE: 3 * multiplier,
  COMPUTER_CARD_Y_DELAY_MULTIPLIER: 0.3 * multiplier,

  // Player hand animations
  PLAYER_HAND_DELAY: 0.4 * gameSpeedMultiplier,
  PLAYER_HAND_ANIMATION: 0.4 * gameSpeedMultiplier,
  PLAYER_HAND_EXIT: 0.2 * gameSpeedMultiplier,

  // Computer hand animations
  COMPUTER_HAND_DELAY: 0.4 * gameSpeedMultiplier,
  COMPUTER_HAND_ANIMATION: 0.4 * gameSpeedMultiplier,
  COMPUTER_HAND_EXIT: 0.2 * gameSpeedMultiplier,

  // Play button animations
  PLAY_BUTTON: 1.5 * multiplier,
  HERO_BUTTON: 0.3 * multiplier,

  // Score tracker animations
  ASIDE_TRANSITION: 0.8 * gameSpeedMultiplier,
  ASIDE_HEIGHT_TRANSITION: 0.6 * gameSpeedMultiplier,
  VICTORY_COUNT: 0.3 * gameSpeedMultiplier,
  HISTORY_ITEM_EXIT: 0.2 * gameSpeedMultiplier,
  HISTORY_ITEM_HOVER: 0.2 * gameSpeedMultiplier,
  NEW_HISTORY_ITEM: 0.6 * gameSpeedMultiplier,
  ICON_SPIN: 0.5 * gameSpeedMultiplier,
  CENTER_SCORE: 2.5 * gameSpeedMultiplier,
  CENTER_SCORE_EXIT: 0.5 * gameSpeedMultiplier,
  CENTER_SCORE_OVERLAY: 0.5 * gameSpeedMultiplier,

  // Dueling field animations
  PLAYER_CARD: 0.4 * gameSpeedMultiplier,
  VS_TEXT: 0.5 * gameSpeedMultiplier,
  COMPUTER_CARD: 0.5 * gameSpeedMultiplier,

  // Round outcome animations
  HERO_POP: 1 * gameSpeedMultiplier,
  ROUND_OUTCOME_SUBTEXT: 0.5 * gameSpeedMultiplier,

  // Game title animations
  GAME_TITLE_WORD: 4 * multiplier,
  GAME_TITLE_WORD_DELAY: 0.8 * multiplier,
  GAME_START_BUTTON_FLOAT: 2 * multiplier,

  // Banner animations
  LOOPING_TEXT_BANNER: 15 * multiplier,
} as const;
