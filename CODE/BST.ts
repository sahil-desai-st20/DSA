class SearchTree<T>{
    date:T
    left:SearchTree<T>|null 
    right:SearchTree<T>|null
    constructor(date:T){
        this.date=date
        this.left=null
        this.right=null                                                    
    }
}
class BinaryTreeSearch<T>{
    private root:SearchTree<T>|null;
    private compare:(a:T,b:T)=>number
    constructor(comparef:(a:T,b:T)=>number=(a,b)=> {
        if(a<b) return -1
        if(a>b) return 1
        return 0
    }) {
        this.root=null
        this.compare=comparef
    }
    insert(data:T):void{
        const newnode =new SearchTree(data)
        if(!this.root){
            this.root=newnode   
            return
        }
        const insertNode=(node:SearchTree<T>,newnode:SearchTree<T>):void=>{
            if(this.compare(newnode.date,node.date)<0){
                if(node.left===null){
                    node.left=newnode
                }else{
                    insertNode(node.left,newnode)
                }
            }else{
                if(node.right===null){
                    node.right=newnode
                }else{
                    insertNode(node.right,newnode)
                }
            }
        }
      insertNode(this.root,newnode)
    }
    printInOrder(node: SearchTree<T> | null = this.root): void {
        if (node) {
            this.printInOrder(node.left);  // Traverse left
            console.log(node.date);         // Print node data
            this.printInOrder(node.right); // Traverse right
        }
    }
    }

// Create an instance of BinaryTreeSearch
const tre = new BinaryTreeSearch<number>(); // Tree for numbers

// Insert values into the tree
tre.insert(15)
tre.insert(30)
tre.insert(2)
tre.insert(3)
tre.insert(4)
tre.printInOrder()