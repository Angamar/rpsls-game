import { z } from 'zod';

export const ChoiceSchema = z.object({
    id: z.number().min(1).max(5),
    name: z.string().max(12),
});

export const ChoiceListSchema = z.array(ChoiceSchema);

export const schemas = {
    Choice: ChoiceSchema,
    ChoiceList: ChoiceListSchema,
};

export type Move = z.infer<typeof ChoiceSchema>;
export type MoveList = z.infer<typeof ChoiceListSchema>;