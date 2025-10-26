import { PrefixTree } from "./PrefixTree";
import { VALID_WORD_DICTIONARY } from "../data/dictionary";
import { DICE, NUMBER_OF_DICE, REQUIRED_TOP_WORDS } from "@shared/constants";
import { Tile, Word } from "@shared/types";

export class Game {
    board: Tile[];
    tree: PrefixTree;
    validWords: Word[];
    bestWords: Word[];

    constructor() {
        this.board = this.rollDice();
        this.tree = new PrefixTree();
        VALID_WORD_DICTIONARY.forEach(word => this.tree.insertString(word));
        this.validWords = this.tree.findValidWords(this.board);
        this.bestWords = this.findBestWords();
    }

    private rollDice(): Tile[] {
        // TODO: Add dice rolling logic
        const rolledDice = DICE;
        const selected = [];
    
        // TODO: Add dice rolling logic
        for (let i = 0; i < NUMBER_OF_DICE; i += 1) {
            selected[i] = rolledDice[i][0]
        };
    
        return selected;
    };

    // TODO: write own quickSelect and compare to heap as potentially much better
    private findBestWords(): Word[] {
        function quickSelectByIndex(arr: Word[], k: number): number {
            let left = 0, right = arr.length - 1;
            while (true) {
                if (left === right) return arr[left].value;

                const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
                const pivot = arr[pivotIndex].value;

                [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

                let storeIndex = left;
                for (let i = left; i < right; i++) {
                if (arr[i].value > pivot) { // descending order
                    [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
                    storeIndex++;
                }
                }
                [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];

                if (storeIndex === k) return arr[storeIndex].value;
                else if (storeIndex > k) right = storeIndex - 1;
                else left = storeIndex + 1;
            }
        }

        // use quickselect to find equal 5th highest score
        const fifthLargestScore = quickSelectByIndex(this.validWords, REQUIRED_TOP_WORDS);

        // Then do a single pass to get all words 5th or highest
        const bestWords = this.validWords.filter((word) => word.value >= fifthLargestScore);

        // Then sort them
        const sortedBestWords = bestWords.sort((a, b) => {
            return b.value - a.value;
        });

        return sortedBestWords;
    }
};
// Write logic to list all valid words on the given board

const chealte = new Game();

console.log(chealte.validWords);
console.log("---------------------------------");
console.log(chealte.bestWords);