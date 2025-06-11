import { Choice, ChoiceItem, Result, GameRoundBody } from '@rpsls-game/shared';

const choices: ChoiceItem[] = [
  { id: Choice.Rock, name: 'rock', icon: '🪨' },
  { id: Choice.Paper, name: 'paper', icon: '📄' },
  { id: Choice.Scissors, name: 'scissors', icon: '✂️' },
  { id: Choice.Lizard, name: 'lizard', icon: '🦎' },
  { id: Choice.Spock, name: 'spock', icon: '🖖' },
];

const gameRules: Record<Choice, { beats: Choice[]; verb: string }> = {
  [Choice.Rock]: { beats: [Choice.Scissors, Choice.Lizard], verb: 'crushes' },
  [Choice.Paper]: { beats: [Choice.Rock, Choice.Spock], verb: 'covers' },
  [Choice.Scissors]: { beats: [Choice.Paper, Choice.Lizard], verb: 'cuts' },
  [Choice.Lizard]: { beats: [Choice.Spock, Choice.Paper], verb: 'poisons' },
  [Choice.Spock]: { beats: [Choice.Scissors, Choice.Rock], verb: 'smashes' },
};

export function createRoundBody(playerChoice: Choice, computerChoice: Choice): GameRoundBody {
  const playerChoiceItem = choices.find((c) => c.id === playerChoice);
  const computerChoiceItem = choices.find((c) => c.id === computerChoice);

  if (!playerChoiceItem || !computerChoiceItem) {
    throw new Error(`Invalid choice provided: player=${playerChoice}, computer=${computerChoice}`);
  }

  const playerName = playerChoiceItem.name;
  const computerName = computerChoiceItem.name;

  // Check for tie
  if (playerChoice === computerChoice) {
    return {
      player: playerChoice,
      computer: computerChoice,
      result: Result.Tie,
      winnerChoice: playerName,
      loserChoice: computerName,
      verb: null,
    };
  }

  // Check if player wins
  const playerBeats = gameRules[playerChoice].beats;

  if (playerBeats.includes(computerChoice)) {
    // Player wins
    return {
      player: playerChoice,
      computer: computerChoice,
      result: Result.Win,
      winnerChoice: playerName,
      loserChoice: computerName,
      verb: gameRules[playerChoice].verb,
    };
  } else {
    // Computer wins
    return {
      player: playerChoice,
      computer: computerChoice,
      result: Result.Lose,
      winnerChoice: computerName,
      loserChoice: playerName,
      verb: gameRules[computerChoice].verb,
    };
  }
}

export function getChoiceName(choice: Choice): string {
  const choiceItem = choices.find((c) => c.id === choice);
  if (!choiceItem) {
    throw new Error(`Invalid choice: ${choice}`);
  }
  return choiceItem.name;
}

export const testScenarios = {
  playerWins: () => createRoundBody(Choice.Paper, Choice.Rock),
  playerLoses: () => createRoundBody(Choice.Rock, Choice.Paper),
  tie: () => createRoundBody(Choice.Rock, Choice.Rock),
  rockCrushesScissors: () => createRoundBody(Choice.Rock, Choice.Scissors),
  paperCoversRock: () => createRoundBody(Choice.Paper, Choice.Rock),
  scissorsCutsPaper: () => createRoundBody(Choice.Scissors, Choice.Paper),
  lizardPoisonsSpock: () => createRoundBody(Choice.Lizard, Choice.Spock),
  spockSmashesScissors: () => createRoundBody(Choice.Spock, Choice.Scissors),
};
