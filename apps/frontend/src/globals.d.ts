import * as sharedTypes from "../shared/types";

export {};

declare global {
  type TileValue = sharedTypes.TileValue
  type Tile = sharedTypes.Tile;
  type Word = sharedTypes.Word;
};
