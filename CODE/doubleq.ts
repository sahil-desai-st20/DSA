class Deque<T> {
    private items: T[] = [];

    // Add element to the front
    addFront(item: T): void {
        this.items.unshift(item);
    }

    // Add element to the rear
    addRear(item: T): void {
        this.items.push(item);
    }

    // Remove element from the front
    removeFront(): T | undefined {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return undefined;
        }
        return this.items.shift();
    }

    // Remove element from the rear
    removeRear(): T | undefined {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return undefined;
        }
        return this.items.pop();
    }

    // Peek at the front element
    peekFront(): T | undefined {
        return this.items[0];
    }

    // Peek at the rear element
    peekRear(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // Check if deque is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get current size
    size(): number {
        return this.items.length;
    }
}

// Example usage
const dq = new Deque<number>();
dq.addRear(10);
dq.addRear(20);
dq.addFront(5);

console.log(dq.peekFront()); // 5
console.log(dq.peekRear());  // 20

console.log(dq.removeFront()); // 5
console.log(dq.removeRear());  // 20
console.log(dq.size());        // 1
