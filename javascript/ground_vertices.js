function Vertices() {
    let temp_verticesA = [
        { x: 0, y: 50 },
        ...[...Array(2)].map((_, i) => ({
            x: 250 + i * 250,
            y: 50 + Math.floor(Math.random() * 20),
        })),
        ...[...Array(9)].map((_, i) => ({
            x: 750 + i * 250,
            y: Math.floor(Math.random() * 150),
        })),
        { x: 3000, y: 50 },
        { x: 3000, y: 200 },
        { x: 0, y: 200 },
    ];

    var temp_verticesB = [];
    for (let j = 0; j < 6; j++) {
        if (j % 2 === 0) {
            temp_verticesB = []
            temp_verticesB.push(temp_verticesA[0])
            for (let i = 0; i < temp_verticesA.length - 3; i++) {
                temp_verticesB.push(temp_verticesA[i])

                x1 = (temp_verticesA[i].x + temp_verticesA[i + 1].x) / 2
                y1 = (temp_verticesA[i].y + temp_verticesA[i + 1].y) / 2

                temp_verticesB.push({ x: x1, y: y1 })
            }
            temp_verticesB.push(temp_verticesA[temp_verticesA.length - 3])
            temp_verticesB.push(temp_verticesA[temp_verticesA.length - 2])
            temp_verticesB.push(temp_verticesA[temp_verticesA.length - 1])
        } else {
            temp_verticesA = []
            for (let i = 0; i < temp_verticesB.length - 3; i++) {
                x1 = (temp_verticesB[i].x + temp_verticesB[i + 1].x) / 2
                y1 = (temp_verticesB[i].y + temp_verticesB[i + 1].y) / 2

                temp_verticesA.push({ x: x1, y: y1 })
            }
            temp_verticesA.push(temp_verticesB[temp_verticesB.length - 3])
            temp_verticesA.push(temp_verticesB[temp_verticesB.length - 2])
            temp_verticesA.push(temp_verticesB[temp_verticesB.length - 1])
        }
    }

    return temp_verticesA;
}