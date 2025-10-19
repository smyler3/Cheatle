import { NUMBER_OF_DICE } from "../constants/constants.ts";
import { VALID_WORD_DICTIONARY } from "../data/dictionary.ts";

class PrefixTreeNode {
    terminal: boolean;
    children: (PrefixTreeNode | null)[];

    constructor() {
        this.terminal = false;
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

        parent.terminal = true;
    };

    findValidWords(boggleBoard) {
        const visited = new Array(NUMBER_OF_DICE).fill(false);
        let parent = this.root;
        let string = "";

        for (let i = 0; i < NUMBER_OF_DICE; i += 1) {
            if (parent.children[(boggleBoard[i]).charCodeAt(0) - 'A'.charCodeAt(0)] !== null) {
                string += boggleBoard[i];
                // searchWord(pChild.Child[(boggle[i][j]).charCodeAt(0) - 'A'.charCodeAt(0)],
                //             boggle, i, j, visited, str);
                // str = "";
            }
        }
    }
};

const tree = new PrefixTree();

for (let i = 0; i < 10; i += 1) {
    tree.insertString(VALID_WORD_DICTIONARY[i]);
};

// console.log(tree.root.children[0]?.children);
// console.log(tree.root.children[0]?.children[0]?.children);
// console.log(tree.root.children[0].children[0].children[7]);