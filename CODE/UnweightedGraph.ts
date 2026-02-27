class UnweightedGraph<T>{
    private vertices:Map<T,Set<T>>;
    private isDirect:boolean;
   
     constructor(isDirect:boolean=false){
        this.vertices=new Map()
        this.isDirect=isDirect
     }
    addVertex(vertex:T):void{
        if(!this.vertices.has(vertex)){
            this.vertices.set(vertex, new Set())
        }else console.log("vertex already exists")
     }
     addEdge(source:T,destination:T):void{
      this.addVertex(source)
      this.addVertex(destination)
      this.vertices.get(source)?.add(destination);
      if(!this.isDirect){
         this.vertices.get(destination)?.add(source)
      }
   }
      bfs(start:T):T[]{
      if(!this.vertices.has(start)) return []  
      const visited =new Set<T>();
      const result:T[]=[];
      const queue:T[]=[start]
       visited.add(start);
      while (queue.length>0){
         const vertex=queue.shift()
        if (vertex === undefined) continue;  // Skip undefined values
         result.push(vertex)
         for (const neigh of this.vertices.get(vertex)!){
            if(!visited.has(neigh)){
               visited.add(neigh)
               queue.push(neigh)    
            }
         }
      }
      return result;
     }
      dfs(startVertex: T): T[] {
        if (!this.vertices.has(startVertex)) {
            return [];
        }

        const visited = new Set<T>();
        const result: T[] = [];

        const dfsHelper = (vertex: T) => {
            visited.add(vertex);
            result.push(vertex);

            for (const neighbor of this.vertices.get(vertex)!) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };

        dfsHelper(startVertex);
        return result;
    }
   //   


}