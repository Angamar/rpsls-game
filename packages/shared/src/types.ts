export enum GameState {
  Selecting = "selecting",
  Dueling = "dueling",
  RoundComplete = "roundComplete",
  SetComplete = "setComplete",
}

export enum Choice {
  Rock = 1,
  Paper,
  Scissors,
  Lizard,
  Spock,
}

export type ChoiceItem = { id: Choice; name: string; icon: string };

export enum Result {
  Win = "win",
  Lose = "lose",
  Tie = "tie",
}

export type RoundOutcome = {
  result: Result;
  verb: string | null;
  player: Choice;
  computer: Choice;
  winnerChoice: string;
  loserChoice: string;
};

export type SetOutcome = {
  result: Result;
  set: number;
  playerSets: number;
  computerSets: number;
};
