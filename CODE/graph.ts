class Graph<T> {
    private vertices: Map<T, Map<T, number>>;
    private isDirected: boolean;

    constructor(isDirected: boolean = false) {
        this.vertices = new Map();
        this.isDirected = isDirected;
    }

    // Add a vertex to the graph
    addVertex(vertex: T): void {
        if (!this.vertices.has(vertex)) {
            this.vertices.set(vertex, new Map());
        }
    }

    // Add a weighted edge between two vertices
    addEdge(source: T, destination: T, weight: number = 1): void {
        // Add vertices if they don't exist
        this.addVertex(source);
        this.addVertex(destination);

        // Add edges with weight
        this.vertices.get(source)!.set(destination, weight);
        if (!this.isDirected) {
            this.vertices.get(destination)!.set(source, weight);
        }
    }

    // Remove a vertex and all its edges
    removeVertex(vertex: T): void {
        if (!this.vertices.has(vertex)) {
            return;
        }

        // Remove all edges pointing to this vertex
        for (const [v, edges] of this.vertices) {
            edges.delete(vertex);
        }

        // Remove the vertex and its edges
        this.vertices.delete(vertex);
    }

    // Remove an edge between two vertices
    removeEdge(source: T, destination: T): void {
        if (!this.vertices.has(source) || !this.vertices.has(destination)) {
            return;
        }

        this.vertices.get(source)!.delete(destination);
        if (!this.isDirected) {
            this.vertices.get(destination)!.delete(source);
        }
    }

    // Get all vertices
    getVertices(): T[] {
        return Array.from(this.vertices.keys());
    }

    // Get all edges with weights
    getEdges(): [T, T, number][] {
        const edges: [T, T, number][] = [];
        for (const [vertex, neighbors] of this.vertices) {
            for (const [neighbor, weight] of neighbors) {
                if (this.isDirected || vertex < neighbor) {
                    edges.push([vertex, neighbor, weight]);
                }
            }
        }
        return edges;
    }

    // Get neighbors of a vertex with weights
    getNeighbors(vertex: T): [T, number][] {
        return this.vertices.has(vertex) 
            ? Array.from(this.vertices.get(vertex)!.entries())
            : [];
    }

    // Check if the graph has a vertex
    hasVertex(vertex: T): boolean {
        return this.vertices.has(vertex);
    }

    // Check if the graph has an edge
    hasEdge(source: T, destination: T): boolean {
        return this.vertices.has(source) && 
               this.vertices.get(source)!.has(destination);
    }

    // Get the weight of an edge
    getEdgeWeight(source: T, destination: T): number | undefined {
        return this.vertices.get(source)?.get(destination);
    }

    // Breadth-First Search
    bfs(startVertex: T): T[] {
        if (!this.vertices.has(startVertex)) {
            return [];
        }

        const visited = new Set<T>();
        const result: T[] = [];
        const queue: T[] = [startVertex];

        visited.add(startVertex);

        while (queue.length > 0) {
            const vertex = queue.shift()!;
            result.push(vertex);

            for (const [neighbor] of this.vertices.get(vertex)!) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    // Depth-First Search
    dfs(startVertex: T): T[] {
        if (!this.vertices.has(startVertex)) {
            return [];
        }

        const visited = new Set<T>();
        const result: T[] = [];

        const dfsHelper = (vertex: T) => {
            visited.add(vertex);
            result.push(vertex);

            for (const [neighbor] of this.vertices.get(vertex)!) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };

        dfsHelper(startVertex);
        return result;
    }

    // Dijkstra's algorithm to find shortest paths from a source vertex
    dijkstra(startVertex: T): Map<T, { distance: number; path: T[] }> {
        if (!this.vertices.has(startVertex)) {
            return new Map();
        }

        // Initialize distances and paths
        const distances = new Map<T, { distance: number; path: T[] }>();
        const visited = new Set<T>();
        const unvisited = new Set<T>();

        // Set initial distances to infinity and empty paths
        for (const vertex of this.vertices.keys()) {
            distances.set(vertex, { distance: Infinity, path: [] });
            unvisited.add(vertex);
        }

        // Set distance to start vertex to 0
        distances.set(startVertex, { distance: 0, path: [startVertex] });

        while (unvisited.size > 0) {
            // Find the unvisited vertex with the smallest distance
            let currentVertex: T | null = null;
            let smallestDistance = Infinity;

            for (const vertex of unvisited) {
                const { distance } = distances.get(vertex)!;
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    currentVertex = vertex;
                }
            }

            if (currentVertex === null) {
                break; // No more reachable vertices
            }

            // Mark current vertex as visited
            unvisited.delete(currentVertex);
            visited.add(currentVertex);

            // Update distances to neighbors
            for (const [neighbor, weight] of this.vertices.get(currentVertex)!) {
                if (!visited.has(neighbor)) {
                    const currentDistance = distances.get(currentVertex)!.distance;
                    const newDistance = currentDistance + weight;

                    if (newDistance < distances.get(neighbor)!.distance) {
                        const newPath = [...distances.get(currentVertex)!.path, neighbor];
                        distances.set(neighbor, { distance: newDistance, path: newPath });
                    }
                }
            }
        }

        return distances;
    }

    // Get the number of vertices
    getVertexCount(): number {
        return this.vertices.size;
    }

    // Get the number of edges
    getEdgeCount(): number {
        let count = 0;
        for (const edges of this.vertices.values()) {
            count += edges.size;
        }
        return this.isDirected ? count : count / 2;
    }

    // Clear the graph
    clear(): void {
        this.vertices.clear();
    }
}
