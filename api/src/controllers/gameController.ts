import { Request, Response } from 'express';
import { ChoiceListSchema } from '../schemas/choice.schema';



const choices = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Paper' },
    { id: 3, name: 'Scissors' },
    { id: 4, name: 'Lizard' },
    { id: 5, name: 'Spock' },
];

export const getChoices = (req: Request, res: Response) => {
    const parsed = ChoiceListSchema.safeParse(choices);
    if (!parsed.success) {
        res.status(500).json({ error: 'Invalid data format' });
    }

    res.json(parsed.data);
};


export const getRandomChoice = async (req: Request, res: Response) => {
    try {
        const response = await fetch('https://codechallenge.boohma.com/random');
        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
