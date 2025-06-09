import { Choice, ChoiceItem, Result, RoundOutcome } from "@rpsls-game/shared";

import { fetchRandomNumber } from "../services/randomNumberService";

export const winningCombinations: Record<string, string> = {
  [`${Choice.Scissors}->${Choice.Paper}`]: "cuts",
  [`${Choice.Paper}->${Choice.Rock}`]: "covers",
  [`${Choice.Rock}->${Choice.Lizard}`]: "crushes",
  [`${Choice.Lizard}->${Choice.Spock}`]: "poisons",
  [`${Choice.Spock}->${Choice.Scissors}`]: "smashes",
  [`${Choice.Scissors}->${Choice.Lizard}`]: "decapitates",
  [`${Choice.Lizard}->${Choice.Paper}`]: "eats",
  [`${Choice.Paper}->${Choice.Spock}`]: "disproves",
  [`${Choice.Spock}->${Choice.Rock}`]: "vaporizes",
  [`${Choice.Rock}->${Choice.Scissors}`]: "crushes",
};

export const choices: ChoiceItem[] = [
  { id: Choice.Rock, name: "rock", icon: "🪨" },
  { id: Choice.Paper, name: "paper", icon: "📄" },
  { id: Choice.Scissors, name: "scissors", icon: "✂️" },
  { id: Choice.Lizard, name: "lizard", icon: "🦎" },
  { id: Choice.Spock, name: "spock", icon: "🖖" },
] as const;

const choiceNameMap = new Map(
  choices.map((choice) => [choice.id, choice.name]),
);

export function getRoundOutcome(
  playerChoiceId: Choice,
  computerChoiceId: Choice,
): RoundOutcome {
  const winCombo = `${playerChoiceId}->${computerChoiceId}`;
  const loseCombo = `${computerChoiceId}->${playerChoiceId}`;
  const playerChoice = choiceNameMap.get(playerChoiceId) ?? "Unknown";
  const computerChoice = choiceNameMap.get(computerChoiceId) ?? "Unknown";

  if (playerChoiceId === computerChoiceId) {
    return {
      result: Result.Tie,
      player: playerChoiceId,
      computer: computerChoiceId,
      winnerChoice: playerChoice,
      verb: null,
      loserChoice: computerChoice,
    };
  }
  if (winningCombinations[winCombo]) {
    return {
      result: Result.Win,
      player: playerChoiceId,
      computer: computerChoiceId,
      winnerChoice: playerChoice,
      verb: winningCombinations[winCombo],
      loserChoice: computerChoice,
    };
  }
  if (winningCombinations[loseCombo]) {
    return {
      result: Result.Lose,
      computer: computerChoiceId,
      player: playerChoiceId,
      winnerChoice: computerChoice,
      verb: winningCombinations[loseCombo],
      loserChoice: playerChoice,
    };
  }
  return {
    result: Result.Tie,
    player: playerChoiceId,
    computer: computerChoiceId,
    winnerChoice: playerChoice,
    verb: null,
    loserChoice: computerChoice,
  };
}

export async function getRandomChoice(
  availableChoices: ChoiceItem["id"][],
): Promise<ChoiceItem> {
  if (availableChoices.length === 0) {
    throw new Error("No available choices to select from");
  }
  const randomNumber = await fetchRandomNumber();

  //calculate the index based on the random number and the number of available choices
  const index = Math.floor(
    (randomNumber - 1) / (100 / availableChoices.length),
  );
  const choiceId = availableChoices[index];
  const choiceItem = choices.find((c) => c.id === choiceId);
  if (!choiceItem) {
    throw new Error("Invalid random number for choice selection");
  }
  return choiceItem;
}
