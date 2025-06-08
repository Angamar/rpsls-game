import { Result } from '@rpsls-game/shared';

export const setResultsMessageMap: Record<Result, string> = {
  [Result.Win]: 'Set won!',
  [Result.Lose]: 'Set lost',
  [Result.Tie]: "It's a tie!",
};

export const setResultMessageVariantMap: Record<Result, string> = {
  [Result.Win]: 'winResultHero',
  [Result.Lose]: 'loseResultHero',
  [Result.Tie]: 'tieResultHero',
};
