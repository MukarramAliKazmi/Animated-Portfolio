function Mountains() {
    let temp_verticesA = [
        ...[...Array(500)].map((_, i) => ({
            x: i * 200,
            y: Math.floor(Math.random() * 200),
        })),
    ];

    return temp_verticesA;
}