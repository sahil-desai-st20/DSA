class queue<T>{
 private item:T[]=[];
 // fist chekc it emmpety or not 
 isEmpty():boolean{
    return this.item.length===0;
 }
 enqueue(elm:T):void{
    this.item.push(elm);
 }
dequeue():T|undefined {
  return  this.item.shift();
}
front():T|undefined{
    return this.item[0];
}
rear():T|undefined{
    return this.item[this.item.length-1];
}
size():number{
    return this.item.length;
}
}
const qu = new queue<string>();
qu.enqueue("sahil");
qu.enqueue("som");
console.log(qu.rear());
console.log(qu.front());
console.log(qu.isEmpty());
console.log(qu.dequeue());
console.log(qu.size());