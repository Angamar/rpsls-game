
import { Choice, ChoiceItem, Result, RoundOutcome } from "@shared/types";

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
    { id: Choice.Rock, name: 'Rock' },
    { id: Choice.Paper, name: 'Paper' },
    { id: Choice.Scissors, name: 'Scissors' },
    { id: Choice.Lizard, name: 'Lizard' },
    { id: Choice.Spock, name: 'Spock' },
];

export function getRoundOutcome(playerChoice: Choice, computerChoice: Choice): RoundOutcome {

    const winCombo = `${playerChoice}->${computerChoice}`;
    const loseCombo = `${computerChoice}->${playerChoice}`;

    if (playerChoice === computerChoice) {
        return {
            result: Result.Tie,
            verb: null,
            player: playerChoice,
            computer: computerChoice,
        };
    }
    if (winningCombinations[winCombo]) {
        return {
            result: Result.Win,
            player: playerChoice,
            verb: winningCombinations[winCombo],
            computer: computerChoice,
        };
    }
    if (winningCombinations[loseCombo]) {
        return {
            result: Result.Lose,
            computer: computerChoice,
            verb: winningCombinations[loseCombo],
            player: playerChoice,
        };
    }
    return {
        result: Result.Tie,
        verb: null,
        player: playerChoice,
        computer: computerChoice,
    };
}

export async function getRandomChoice() {
    const randomNumber = await fetchRandomNumber();
    const index = Math.floor((randomNumber - 1) / 20);
    const choice = choices[index];
    if (!choice) throw new Error("Invalid random number for choice selection");
    return choice;
}

