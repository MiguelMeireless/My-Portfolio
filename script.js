const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 16;
const columns = canvas.width / fontSize;

// Initialize drops
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    // Clear the canvas and set a pure black background
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Pure black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Alternating colors: green and light gray for the falling characters
    drops.forEach((y, x) => {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        // Alternate colors by column index (green or light gray)
        ctx.fillStyle = x % 2 === 0 ? '#00FF00' : '#D3D3D3'; // Green or Light Gray
        ctx.font = `${fontSize}px monospace`;

        // Apply text shadow for glow effect
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10; // Glow effect for text

        // Draw the character
        ctx.fillText(text, x * fontSize, y * fontSize);

        // Reset drop to the top randomly
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }
        drops[x]++;
    });
}

// Resize canvas dynamically on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
});

// Start the animation
function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
}

animateMatrix();
