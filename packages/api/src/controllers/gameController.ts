import { Request, Response } from 'express';

import { ChoiceListSchema } from '@shared/schemas';
import { choices, getRandomChoice, getRoundOutcome } from './gameController.helpers';



export const getChoices = (req: Request, res: Response) => {
    const parsed = ChoiceListSchema.safeParse(choices);
    if (!parsed.success) {
        console.error(parsed.error);
    } else {
        console.log(parsed.data);
    }

    if (!parsed.success) {
        res.status(500).json({ error: 'Invalid data format' });
        return;
    }

    res.json(choices);
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

export const playRound = async (req: Request, res: Response) => {
    try {
        console.log('Received request body:', req.body);
        const { player: playerChoiceId } = req.body;
        console.log('Player choice ID:', playerChoiceId);


        if (!playerChoiceId) {
            res.status(400).json({ error: 'Player choice is required' });
            return;
        }
        const playerChoice = choices.find(choice => choice.id === playerChoiceId);

        if (!playerChoice) {
            res.status(400).json({ error: 'Invalid choice' });
            return;
        }

        const computerChoice = await getRandomChoice();

        const roundOutcome = getRoundOutcome(playerChoiceId, computerChoice.id);

        res.json(roundOutcome);

    } catch (error) {
        console.error('Error in playRound:', error);
    }
};

