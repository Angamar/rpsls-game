import { Result } from '@rpsls-game/shared';

export const resultMessageMap: Record<Result, string> = {
  [Result.Win]: 'Round won!',
  [Result.Lose]: 'Round lost!',
  [Result.Tie]: "It's a tie!",
};

export const resultMessageVariantMap: Record<Result, string> = {
  [Result.Win]: 'winResultHero',
  [Result.Lose]: 'loseResultHero',
  [Result.Tie]: 'tieResultHero',
};
