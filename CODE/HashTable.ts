class HashNode<K, V> {
    key: K;
    value: V;
    next: HashNode<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashTable<K, V> {
    private table: Array<HashNode<K, V> | null>;
    private size: number;
    private capacity: number;
    private loadFactor: number;

    constructor(initialCapacity: number = 16, loadFactor: number = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.table = Array.from({ length: this.capacity }, () => null);
    }

    // Hash function
    private hash(key: K): number {
        const stringKey = String(key);
        let hash = 0;
        for (let i = 0; i < stringKey.length; i++) {
            hash = ((hash << 5) - hash) + stringKey.charCodeAt(i);
            hash = hash | 0; // Convert to 32-bit integer
        }
        return Math.abs(hash) % this.capacity;
    }

    // Insert or update a key-value pair
    put(key: K, value: V): void {
        if (this.size >= this.capacity * this.loadFactor) {
            this.resize();
        }

        const index = this.hash(key);
        const newNode = new HashNode(key, value);

        if (!this.table[index]) {
            this.table[index] = newNode;
            this.size++;
            return;
        }

        let current = this.table[index];
        let prev = null;

        // Check if key already exists
        while (current) {
            if (current.key === key) {
                current.value = value; // Update value
                return;
            }
            prev = current;
            current = current.next;
        }

        // Add new node to chain
        if (prev) {
            prev.next = newNode;
        } else {
            this.table[index] = newNode;
        }
        this.size++;
    }

    // Get value by key
    get(key: K): V | null {
        const index = this.hash(key);
        let current = this.table[index];

        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }

        return null;
    }

    // Remove a key-value pair
    remove(key: K): boolean {
        const index = this.hash(key);
        let current = this.table[index];
        let prev = null;

        while (current) {
            if (current.key === key) {
                if (prev) {
                    prev.next = current.next;
                } else {
                    this.table[index] = current.next;
                }
                this.size--;
                return true;
            }
            prev = current;
            current = current.next;
        }

        return false;
    }

    // Check if key exists
    contains(key: K): boolean {
        return this.get(key) !== null;
    }

    // Get all keys
    keys(): K[] {
        const keys: K[] = [];
        for (const bucket of this.table) {
            let current = bucket;
            while (current) {
                keys.push(current.key);
                current = current.next;
            }
        }
        return keys;
    }

    // Get all values
    values(): V[] {
        const values: V[] = [];
        for (const bucket of this.table) {
            let current = bucket;
            while (current) {
                values.push(current.value);
                current = current.next;
            }
        }
        return values;
    }

    // Get size
    getSize(): number {
        return this.size;
    }

    // Check if empty
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Clear the hash table
    clear(): void {
        this.table = Array.from({ length: this.capacity }, () => null);
        this.size = 0;
    }

    // Resize the hash table
    private resize(): void {
        const oldTable = this.table;
        this.capacity *= 2;
        this.table = Array.from({ length: this.capacity }, () => null);
        this.size = 0;

        for (const bucket of oldTable) {
            let current = bucket;
            while (current) {
                this.put(current.key, current.value);
                current = current.next;
            }
        }
    }
}

// Example usage:
const hashTable = new HashTable<string, number>();
hashTable.put("one", 1);
hashTable.put("two", 2);
hashTable.put("three", 3);
console.log(hashTable.get("two")); // 2
console.log(hashTable.keys()); // ["one", "two", "three"]
console.log(hashTable.values()); // [1, 2, 3]
hashTable.remove("two");
console.log(hashTable.contains("two")); // false 