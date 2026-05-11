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

const HintSchema = z.object ({
  text: z.string(),
  value: z.number().int(),
  revealedText: z.string(),
  isGuessed: z.boolean(),
});

const TopWordsSchema = z.record(z.string(), z.array(HintSchema))
  .transform(obj => {
    return new Map<number, Hint[]>(
      Object.entries(obj).map(([k, v]) => [Number(k), v])
    )
});

export const CheatleResponseSchema = z.object({
  board: z.array(TileSchema),
  validWords: z.array(WordSchema),
  topWords: TopWordsSchema,
});

export type TileValue = z.infer<typeof TileValueSchema>;
export type TileType = z.infer<typeof TileSchema>;
export type Word = z.infer<typeof WordSchema>;
export type Hint = z.infer<typeof HintSchema>;
export type TopWords = z.infer<typeof TopWordsSchema>;
export type CheatleResponse = z.infer<typeof CheatleResponseSchema>;