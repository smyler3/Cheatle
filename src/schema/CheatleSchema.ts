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
  maxPossibleScore: z.number().int(),
  minTopWordValue: z.number().int(),
  puzzleCount: z.number().int(),
  puzzleDate: z.string(),
  apiVersion: z.number().int(),
});

export type TileValue = z.infer<typeof TileValueSchema>;
export type TileType = z.infer<typeof TileSchema>;
export type Word = z.infer<typeof WordSchema>;
export type CheatleResponse = z.infer<typeof CheatleResponseSchema>;