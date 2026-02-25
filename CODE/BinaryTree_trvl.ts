class TNode<T>{
data:T
left:TNode<T>|null
right:TNode<T>|null
constructor(data:T){
    this.data=data
    this.left=null
    this.right=null
}
}
class BT<T>{
    constructor(private root:TNode<T>|null) {   }
    inorder():T[]{
        const result:T[]=[]
        const ino=(Node:TNode<T>|null)=>{
            if(Node){
                ino(Node.left)
                result.push(Node.data)
                ino(Node.right)

            }
        }
        ino(this.root)
        return result
    }
      preorder():T[]{
        const result:T[]=[]
        const pre=(Node:TNode<T>|null)=>{
            if(Node){
                result.push(Node.data)
                pre(Node.left)
                pre(Node.right)

            }
        }
        pre(this.root)
        return result
    }
      postorder():T[]{
        const result:T[]=[]
        const pos=(Node:TNode<T>|null)=>{
            if(Node){
                pos(Node.left)
                pos(Node.right)
                result.push(Node.data)

            }
        }
        pos(this.root)
        return result
    }        
}

const root = new TNode(5);
root.left = new TNode(3);
root.right = new TNode(7);
root.left.left = new TNode(2);
root.left.right = new TNode(4);
root.right.left = new TNode(6);
root.right.right = new TNode(8);

const tree = new BT(root);

// Show the output of all three traversals
console.log("Inorder Traversal:", tree.inorder()); // [2, 3, 4, 5, 6, 7, 8]
console.log("Preorder Traversal:", tree.preorder()); // [5, 3, 2, 4, 7, 6, 8]
console.log("Postorder Traversal:", tree.postorder()); // [2, 4, 3, 6, 8, 7, 5]