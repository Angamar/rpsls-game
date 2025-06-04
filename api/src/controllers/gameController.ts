import { Request, Response } from 'express';
import { ChoiceListSchema } from '../schemas/choice.schema';
import { choices, getRandomChoice } from '../controllers/gameController.helpers';


export const getChoices = (req: Request, res: Response) => {
    const parsed = ChoiceListSchema.safeParse(choices);
    if (!parsed.success) {
        res.status(500).json({ error: 'Invalid data format' });
    }

    res.json(parsed.data);
};


export const getComputerChoice = async (req: Request, res: Response) => {
    try {
        const computerChoice = await getRandomChoice();
        res.json(computerChoice);
    } catch (error) {
        console.error('Error fetching computer choice:', error);
        res.status(500).json({ error: 'Failed to fetch computer choice' });
    }
};
