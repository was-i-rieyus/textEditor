export class TrieNode {
    children: { [key: string]: TrieNode } = {};
    isEndOfWord: boolean = false;
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(prefix: string): string[] {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this.getAllWordsWithPrefix(node, prefix);
    }

    getAllWordsWithPrefix(node: TrieNode, prefix: string): string[] {
        const result: string[] = [];
        if (node.isEndOfWord) {
            result.push(prefix);
        }

        for (const char in node.children) {
            result.push(...this.getAllWordsWithPrefix(node.children[char], prefix + char));
        }
        return result;
    }
}
