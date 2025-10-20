import ADJACENT_LIST from "../constants/adjacentList.ts";
import { NUMBER_OF_DICE } from "../constants/constants.ts";
import DICE from "../constants/dice.ts";
import { TILES } from "../constants/tiles.ts";
import { VALID_WORD_DICTIONARY } from "../data/dictionary.ts";

class PrefixTreeNode {
    isTerminal: boolean;
    children: (PrefixTreeNode | null)[];

    constructor() {
        this.isTerminal = false;
        this.children = new Array(26).fill(null); 
    }
}

class PrefixTree {
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

    getCharacterIndex(character: string) {
        return character.charCodeAt(0) - 'A'.charCodeAt(0);
    };

    depthFirstSearch(node, boggleBoard, visited, tileIndex, runningWord, wordsList) {
        visited[tileIndex] = true;
        const char = boggleBoard[tileIndex];
        const nextNode = node.children[this.getCharacterIndex(char)];
        if (!nextNode) return;

        const { text, value } = TILES[char];
        const newWord = { text: runningWord.text + text, value: runningWord.value + value };

        if (nextNode.isTerminal) {
            wordsList.add(newWord.text);
        }

        for (const neighbour of ADJACENT_LIST[tileIndex]) {
            if (!visited[neighbour]) {
                this.depthFirstSearch(nextNode, boggleBoard, [...visited], neighbour, newWord, wordsList);
            }
        }
    }

    findValidWords(boggleBoard) {
        const wordsList = new Set();

        for (let i = 0; i < NUMBER_OF_DICE; i++) {
            const char = boggleBoard[i];
            const childNode = this.root.children[this.getCharacterIndex(char)];
            if (childNode) {
                const runningWord = { text: "", value: 0 };
                const visited = new Array(NUMBER_OF_DICE).fill(false);
                this.depthFirstSearch(this.root, boggleBoard, visited, i, runningWord, wordsList);
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
    //         const neighbourTileIndex = this.getCharacterIndex(boggleBoard[tile]);
    //         this.depthFirstSearch(node[])
    //     })
    // }

    // findValidWords(boggleBoard) {
    //     const wordsList  = new Set();
    //     const visited = new Array(NUMBER_OF_DICE).fill(false);
    //     let parent = this.root;
    //     let string = "";

    //     for (let i = 0; i < NUMBER_OF_DICE; i += 1) {
    //         const chararacterIndex = this.getCharacterIndex(boggleBoard[i]);

    //         if (parent.children[chararacterIndex] !== null) {
    //             string += boggleBoard[i];
    //             // searchWord(pChild.Child[(boggle[i][j]).charCodeAt(0) - 'A'.charCodeAt(0)],
    //             //             boggle, i, j, visited, str);
    //             // str = "";
    //         }
    //     }
    // }
};

const extractTilesFromDice = (dice: Tile[][]) => {
    const selected = [];

    for (let i = 0; i < 16; i += 1) {
        selected[i] = dice[i][0]
    };

    return selected;
};

const boggleBoard = extractTilesFromDice(DICE);

const tree = new PrefixTree();

for (let i = 0; i < 10; i += 1) {
    tree.insertString(VALID_WORD_DICTIONARY[i]);
};

const validWords = tree.findValidWords(boggleBoard);

console.log(validWords)

// console.log(tree.root.children[0]?.children);
// console.log(tree.root.children[0]?.children[0]?.children);
// console.log(tree.root.children[0].children[0].children[7]);