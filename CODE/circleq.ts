class CircularQueue<T> {
    private queue: (T | null)[];
    private front: number;
    private rear: number;
    private size: number;
    private capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.queue = new Array<T | null>(capacity).fill(null);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    // Add element to the queue
    enqueue(item: T): boolean {
        if (this.isFull()) {
            console.log("Queue is full");
            return false;
        }
        if (this.front === -1) {
            this.front = 0;
        }
        this.rear = (this.rear + 1) % this.capacity;
        this.queue[this.rear] = item;
        this.size++;
        return true;
    }

    // Remove element from the queue
    dequeue(): T | null {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }
        const item = this.queue[this.front];
        this.queue[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        if (this.size === 0) {
            this.front = -1;
            this.rear = -1;
        }
        return item;
    }

    // Peek at the front element
    peek(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[this.front];
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }

    getSize(): number {
        return this.size;
    }
}

// Example usage
const cq = new CircularQueue<number>(5);
cq.enqueue(10);
cq.enqueue(20);
cq.enqueue(30);
console.log(cq.dequeue()); // 10
console.log(cq.peek());    // 20
cq.enqueue(40);
cq.enqueue(50);
cq.enqueue(60); // works because of circular wrap-around
console.log(cq.isFull());  // true
