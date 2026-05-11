import type { TileType } from "../schema/CheatleSchema";
import type { TileColourType } from "../types/types";

export const TILES: Record<string, TileType> = {
    "A": { text: "A", value: 1 },
    "B": { text: "B", value: 4 },
    "C": { text: "C", value: 4 },
    "D": { text: "D", value: 3 },
    "E": { text: "E", value: 1 },
    "F": { text: "F", value: 4 },
    "G": { text: "G", value: 4 },
    "H": { text: "H", value: 2 },
    "I": { text: "I", value: 1 },
    "J": { text: "J", value: 5 },
    "K": { text: "K", value: 5 },
    "L": { text: "L", value: 2 },
    "M": { text: "M", value: 4 },
    "N": { text: "N", value: 1 },
    "O": { text: "O", value: 1 },
    "P": { text: "P", value: 4 },
    "Q": { text: "QU", value: 5 },
    "R": { text: "R", value: 2 },
    "S": { text: "S", value: 1 },
    "T": { text: "T", value: 1 },
    "U": { text: "U", value: 3 },
    "V": { text: "V", value: 4 },
    "W": { text: "W", value: 3 },
    "X": { text: "X", value: 5 },
    "Y": { text: "Y", value: 3 },
    "Z": { text: "Z", value: 5 },
};

export const NUMBER_OF_UNIQUE_TILES: number = 26;

export const TILE_VALUE_COLOURS: Record<number, TileColourType> = {
    1: 
    {
        default: "var(--grey-700)",
        selected: "var(--grey-850)",
    },
    2: 
    {
        default: "var(--green-100)",
        selected: "var(--green-200)",
    },
    3:
    {
        default: "var(--blue-100)",
        selected: "var(--blue-200)",
    }, 
    4:
    {
        default: "var(--purple-100)",
        selected: "var(--purple-200)",
    }, 
    5:
    {
        default: "var(--red-100)",
        selected: "var(--red-200)",
    },
};