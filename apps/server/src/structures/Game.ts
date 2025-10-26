import { PrefixTree } from "./PrefixTree";
import { VALID_WORD_DICTIONARY } from "../data/dictionary";
import { DICE } from "@shared/constants";
import { Tile, Word } from "@shared/types";

export class Game {
    board: Tile[];
    validWords: Word[];
    tree: PrefixTree;

    constructor() {
        this.board = this.rollDice();
        this.tree = new PrefixTree();
        for (let i = 0; i < 10; i += 1) {
            console.log(VALID_WORD_DICTIONARY[i]);
            this.tree.insertString(VALID_WORD_DICTIONARY[i]);
        };
        this.validWords = this.tree.findValidWords(this.board);
    }

    private rollDice(): Tile[] {
        // TODO: Add dice rolling logic
        const rolledDice = DICE;
        const selected = [];
    
        // TODO: Add dice rolling logic
        for (let i = 0; i < 16; i += 1) {
            selected[i] = rolledDice[i][0]
        };
    
        return selected;
    };
};
// Write logic to list all valid words on the given board

const chealte = new Game();

console.log(chealte.validWords);