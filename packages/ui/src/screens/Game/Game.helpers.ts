import { Result } from '@rpsls-game/shared';

export function calculateSetWinner(roundResults: Result[]): Result {
  const winCount = roundResults.filter((result) => result === Result.Win).length;
  const loseCount = roundResults.filter((result) => result === Result.Lose).length;

  if (winCount > loseCount) {
    return Result.Win;
  } else if (loseCount > winCount) {
    return Result.Lose;
  } else {
    // In case of a tie, winner is the one who won the last round
    const lastWinner = roundResults.find(
      (result) => result === Result.Win || result === Result.Lose,
    );
    // Fallback: if all rounds are ties, default to player lose
    return lastWinner ?? Result.Lose;
  }
}
