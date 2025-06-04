import { Choice } from "../schemas/choice.schema";
import { fetchRandomNumber } from "../services/randomNumberService";

export const choices = [
    { id: Choice.Rock, name: 'Rock' },
    { id: Choice.Paper, name: 'Paper' },
    { id: Choice.Scissors, name: 'Scissors' },
    { id: Choice.Lizard, name: 'Lizard' },
    { id: Choice.Spock, name: 'Spock' },
];


const winningCombinations = new Map<[Choice, Choice], string>([
    [[Choice.Scissors, Choice.Paper], "cuts"],
    [[Choice.Paper, Choice.Rock], "covers"],
    [[Choice.Rock, Choice.Lizard], "crushes"],
    [[Choice.Lizard, Choice.Spock], "poisons"],
    [[Choice.Spock, Choice.Scissors], "smashes"],
    [[Choice.Scissors, Choice.Lizard], "decapitates"],
    [[Choice.Lizard, Choice.Paper], "eats"],
    [[Choice.Paper, Choice.Spock], "disproves"],
    [[Choice.Spock, Choice.Rock], "vaporizes"],
    [[Choice.Rock, Choice.Scissors], "crushes"],
]);


export async function getRandomChoice() {
    const randomNumber = await fetchRandomNumber();
    const index = Math.floor((randomNumber - 1) / 20);
    return choices[index];
}

