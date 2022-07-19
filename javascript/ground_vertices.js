function Vertices() {
    var vertices = [
        ...[...Array(3)].map((_, i) => ({
            x: i * 250,
            y: 50 + Math.floor(Math.random() * 20),
        })),
        ...[...Array(10)].map((_, i) => ({
            x: 750 + i * 250,
            y: Math.floor(Math.random() * 150),
        })),
        {x: 3000, y: 200},
        {x: 0, y: 200},
    ];
    
    var temp_vertices = [];
    for(let j = 0; j < 6; j++) {
        if (j % 2 === 0) {
            temp_vertices = []
            temp_vertices.push(vertices[0])
            for(let i = 0; i < vertices.length - 3; i++) {
                temp_vertices.push(vertices[i])
  
                x1 = ( vertices[i].x + vertices[i+1].x ) / 2
                y1 = ( vertices[i].y + vertices[i+1].y ) / 2
  
                temp_vertices.push({x: x1, y: y1})
            }
            temp_vertices.push(vertices[vertices.length - 3])
            temp_vertices.push(vertices[vertices.length - 2])
            temp_vertices.push(vertices[vertices.length - 1])
        } else {
            vertices = []
            for(let i = 0; i < temp_vertices.length - 3; i++) {
                x1 = ( temp_vertices[i].x + temp_vertices[i+1].x ) / 2
                y1 = ( temp_vertices[i].y + temp_vertices[i+1].y ) / 2
  
                vertices.push({x: x1, y: y1})
            }
            vertices.push(temp_vertices[temp_vertices.length - 3])
            vertices.push(temp_vertices[temp_vertices.length - 2])
            vertices.push(temp_vertices[temp_vertices.length - 1])
        }
    }
  
    return vertices;
  }