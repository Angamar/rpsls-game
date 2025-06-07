import { z } from "zod";

const RandomNumberResponseSchema = z.object({ random_number: z.number() });

export async function fetchRandomNumber() {
  const response = await fetch("https://codechallenge.boohma.com/random");
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }
  const data: unknown = await response.json();
  const parsed = RandomNumberResponseSchema.parse(data);
  return parsed.random_number;
}
