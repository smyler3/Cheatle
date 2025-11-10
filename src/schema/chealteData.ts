import { z } from "zod";

const TileValueSchema = z.number().int().min(1).max(5);

const TileSchema = z.object({
  text: z.string(),
  value: TileValueSchema,
});

const WordSchema = z.object({
  text: z.string(),
  value: z.number().int(),
});

export const CheatleResponseSchema = z.object({
  board: z.array(TileSchema),
  validWords: z.array(WordSchema),
  highestScoringWords: z.array(WordSchema),
});

export type TileValue = z.infer<typeof TileValueSchema>;
export type TileType = z.infer<typeof TileSchema>;
export type Word = z.infer<typeof WordSchema>;
export type CheatleResponse = z.infer<typeof CheatleResponseSchema>;