class TreeNode<T> {
    data:T
    left: TreeNode<T>|null
    right:TreeNode<T>|null
    constructor(data:T){
        this.data=data
        this.left=null
        this.right=null

    }
}
class BinaryTree<T>{
    constructor(private root:TreeNode<T>|null=null){}
    inst(data:T):void{
        const newnode =new TreeNode(data)
        if(this.root==null){
        this.root=newnode
        return 
        }
        const queue:TreeNode<T>[]=[this.root]
        while(queue.length>0){
            const cur=queue.shift()!
            if (!cur.left){
                cur.left=newnode
                return
            }
            else{
               queue.push(cur.left)
            }
            if(!cur.right){
                cur.right=newnode
                return
            }
            else{
                queue.push(cur.right)
            }
        }

    }
}
