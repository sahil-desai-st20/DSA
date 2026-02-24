class Stack<T> {
    private item: T[] = [];

    // first chrck is arrayy is any elemt hhave or not 
    isEmpty(): boolean {
        return this.item.length === 0;
    }
    //   push
    add(elm: T): void {

        this.item.push(elm);
    }
    remove(): T | undefined {
        if (this.isEmpty()) {
            console.log("stack it eempty");
            return undefined;
        }
        return this.item.pop();
    }
    SeeTop():T|undefined{
        return this.item[this.item.length-1];
    }
    size():number{
        return this.item.length;
    }
    print(): void {
    console.log(this.item.join(" "));
  }
}
const stack =new Stack<number>();
stack.add(10);stack.add(30);
stack.remove();
stack.print();
