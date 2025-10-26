import { TILES, NUMBER_OF_DICE, ADJACENT_LIST } from "@shared/constants";
import { Tile, Word } from "@shared/types";

class PrefixTreeNode {
    isTerminal: boolean;
    children: (PrefixTreeNode | null)[];

    constructor() {
        this.isTerminal = false;
        this.children = new Array(26).fill(null); 
    }
}

export class PrefixTree {
    root: PrefixTreeNode;

    constructor() {
        this.root = new PrefixTreeNode();
    };

    insertString(newString: string): void {
        const newStringLength = newString.includes("Q") ? newString.length - 1 : newString.length;
        let parent = this.root;

        for (let i = 0; i < newStringLength; i += 1) {
            const childrenIndex = newString[i].charCodeAt(0) - 'A'.charCodeAt(0);

            if (parent.children[childrenIndex] === null) {
                parent.children[childrenIndex] = new PrefixTreeNode();
            }

            parent = parent.children[childrenIndex];
        };

        parent.isTerminal = true;
    };

    getCharacterIndex(character: string): number {
        return character.charCodeAt(0) - 'A'.charCodeAt(0);
    };

    depthFirstSearch(
        node: PrefixTreeNode, 
        board: Tile[], 
        visited: boolean[], 
        tileIndex: number, 
        runningWord: Word,
        wordsList: Set<Word>,
    ) {
        visited[tileIndex] = true;

        const { text, value } = board[tileIndex];
        const charIndex = this.getCharacterIndex(text);
        const nextNode = node.children[charIndex];

        if (!nextNode) return;

        // Add text and value to running word
        const newWord = { text: runningWord.text + text, value: runningWord.value + value };

        if (nextNode.isTerminal) {
            wordsList.add(newWord);
        }

        for (const neighbour of ADJACENT_LIST[tileIndex]) {
            if (!visited[neighbour]) {
                this.depthFirstSearch(nextNode, board, [...visited], neighbour, newWord, wordsList);
            }
        }
    }

    findValidWords(board: Tile[]): Word[] {
        const wordsList = new Set<Word>();

        for (let i = 0; i < NUMBER_OF_DICE; i++) {
            const char = board[i];
            const charIndex = this.getCharacterIndex(char.text);
            const childNode = this.root.children[charIndex];
            if (childNode) {
                const runningWord = { text: "", value: 0 };
                const visited = new Array(NUMBER_OF_DICE).fill(false);
                this.depthFirstSearch(this.root, board, visited, i, runningWord, wordsList);
            }
        }

        return [...wordsList];
    }

    
    // depthFirstSearch(node, visited, tileIndex, characterIndex, runningWord, wordsList) {
    //     // Add current node to visited array
    //     visited[tileIndex] = true;

    //     // Add char to string and score value
    //     const tileLetter = 'A'.charCodeAt(0) + characterIndex;
    //     const { text, value } = TILES[tileLetter];

    //     runningWord.text += text;
    //     runningWord.value += value;

    //     // if isTerminal, binary insert into Set/Dict etc
    //     if (node.isTerminal) {
    //         wordsList.insert(runningWord);
    //     }

    //     // get all neighbours
    //     const neighbourTiles = ADJACENT_LIST[tileIndex];

    //     // for each neighbour, recurrsively call dfs on neighbours
    //     neighbourTiles.forEach(tile => {
    //         if (visited[tile] === false) {
    //             return;
    //         }
    //         const neighbourTileIndex = this.getCharacterIndex(board[tile]);
    //         this.depthFirstSearch(node[])
    //     })
    // }

    // findValidWords(board) {
    //     const wordsList  = new Set();
    //     const visited = new Array(NUMBER_OF_DICE).fill(false);
    //     let parent = this.root;
    //     let string = "";

    //     for (let i = 0; i < NUMBER_OF_DICE; i += 1) {
    //         const chararacterIndex = this.getCharacterIndex(board[i]);

    //         if (parent.children[chararacterIndex] !== null) {
    //             string += board[i];
    //             // searchWord(pChild.Child[(boggle[i][j]).charCodeAt(0) - 'A'.charCodeAt(0)],
    //             //             boggle, i, j, visited, str);
    //             // str = "";
    //         }
    //     }
    // }
};