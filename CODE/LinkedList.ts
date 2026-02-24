class ListNode<T> {
  data:T;
  next:ListNode<T>|null;
  constructor (data:T){
    this.data=data;
    this.next=null;
  }
}
class LinkedList<T>{
    private head:ListNode<T>|null;
    private size:number;
    constructor(){
        this.head=null;
        this.size=0;
    }
    append(data:T):void{
        const newnode=new ListNode(data)
        if(!this.head){
            this.head=newnode
        }else{
            let curent=this.head;
            while(curent.next){
                curent=curent.next;
            }
            curent.next=newnode
        }
        this.size++
    }
    prepand(data:T):void{
      const newnode=new ListNode(data) 
      newnode.next=this.head
      this.head=newnode
      this.size++    
    
    }
    ins(data:T ,pos:number):boolean {
        if(pos===0){
            this.prepand(data)
            return true
        }
        if(pos<0||pos>this.size){
            return false
        }
        const newnode =new ListNode(data)
        let cu=this.head
        let prv=null
        let i=0
        while(i<pos){
           prv=cu
           cu=cu!.next
           i++
      }
        newnode.next=cu
        prv!.next =newnode
        this.size++
        return true
    }
   removeAt(pos:number): T|null{
    if(pos<0||pos>=this.size){
            return null
        }
        return null
        
   }
}
 console.log("run")
 