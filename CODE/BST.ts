class SearchTree<T>{
    data:T
    left:SearchTree<T>|null 
    right:SearchTree<T>|null
    constructor(data:T){
        this.data=data
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
            if(this.compare(newnode.data,node.data)<0){
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
    search(data:T):boolean{
    const searchNode=(node:SearchTree<T>|null,data:T):boolean=>{
      if(node==null){
        return false
      }
      const compares=this.compare(data,node.data)
      if(compares==0) return true 
      if(compares<0) return searchNode(node.left,data)
      return searchNode(node.right,data)
      }
       return searchNode(this.root,data)

    }
   remove(data: T): void {
        const findMin = (node: SearchTree<T>): SearchTree<T> => {
            let current = node;
            while (current.left !== null) {
                current = current.left;
            }
            return current;
        };

        const removeNode = (node: SearchTree<T> | null, data: T): SearchTree<T> | null => {
            if (node === null) {
                return null;
            }

            const comparison = this.compare(data, node.data);
            if (comparison < 0) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (comparison > 0) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                // Node to delete found

                // Case 1: Leaf node
                if (node.left === null && node.right === null) {
                    return null;
                }

                // Case 2: Node with one child
                if (node.left === null) {
                    return node.right;
                }
                if (node.right === null) {
                    return node.left;
                }

                // Case 3: Node with two children
                const minNode = findMin(node.right);
                node.data = minNode.data;
                node.right = removeNode(node.right, minNode.data);
                return node;
            }
        };

        this.root = removeNode(this.root, data);
    }

    printInOrder(node: SearchTree<T> | null = this.root): void {
        if (node) {
            this.printInOrder(node.left);  // Traverse left
            console.log(node.data   );         // Print node data
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