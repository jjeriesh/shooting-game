const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 400,
    y: 250,
    size: 20,
    speed: 5
};

let bullets = [];
let enemies = [];
let score = 0;

// Controls
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Shoot
document.addEventListener("keydown", e => {
    if (e.code === "Space") {
        bullets.push({ x: player.x, y: player.y, r: 5 });
    }
});

// Spawn enemies
setInterval(() => {
    enemies.push({
        x: Math.random() * canvas.width,
        y: 0,
        size: 20
    });
}, 1000);

function update() {
    // Move player
    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;

    // Move bullets
    bullets.forEach(b => b.y -= 8);

    // Move enemies
    enemies.forEach(e => e.y += 2);

    // Collision detection
    bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
            let dx = b.x - e.x;
            let dy = b.y - e.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < e.size) {
                bullets.splice(bi, 1);
                enemies.splice(ei, 1);
                score++;
            }
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Bullets
    ctx.fillStyle = "yellow";
    bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
    });

    // Enemies
    ctx.fillStyle = "red";
    enemies.forEach(e => {
        ctx.fillRect(e.x, e.y, e.size, e.size);
    });

    // Score
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
