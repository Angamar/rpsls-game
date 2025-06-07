
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
    { id: Choice.Rock, name: 'Rock', icon: '🪨' },
    { id: Choice.Paper, name: 'Paper', icon: '📄' },
    { id: Choice.Scissors, name: 'Scissors', icon: '✂️' },
    { id: Choice.Lizard, name: 'Lizard', icon: '🦎' },
    { id: Choice.Spock, name: 'Spock', icon: '🖖' },
];

const choiceNameMap = new Map(choices.map(choice => [choice.id, choice.name]));

export function getRoundOutcome(playerChoiceId: Choice, computerChoiceId: Choice): RoundOutcome {

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
            loserChoice: computerChoice
        };
    }
    if (winningCombinations[winCombo]) {
        return {
            result: Result.Win,
            player: playerChoiceId,
            computer: computerChoiceId,
            winnerChoice: playerChoice,
            verb: winningCombinations[winCombo],
            loserChoice: computerChoice
        };
    }
    if (winningCombinations[loseCombo]) {
        return {
            result: Result.Lose,
            computer: computerChoiceId,
            player: playerChoiceId,
            winnerChoice: computerChoice,
            verb: winningCombinations[loseCombo],
            loserChoice: playerChoice
        };
    }
    return {
        result: Result.Tie,
        player: playerChoiceId,
        computer: computerChoiceId,
        winnerChoice: playerChoice,
        verb: null,
        loserChoice: computerChoice
    };
}

export async function getRandomChoice() {
    const randomNumber = await fetchRandomNumber();
    const index = Math.floor((randomNumber - 1) / 20);
    const choice = choices[index];
    if (!choice) throw new Error("Invalid random number for choice selection");
    return choice;
}

