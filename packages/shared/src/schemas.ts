import { z } from "zod";

export const ChoiceSchema = z.object({
  id: z.number().min(1).max(5),
  name: z.string().max(12),
});

export const PlayRoundSchema = z.object({
  player: z.number().min(1).max(5),
});

export const ChoiceListSchema = z.array(ChoiceSchema);
