const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const speed = 0.065

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gearImage = new Image();
gearImage.src = 'gear-icon.png'; // Path to your gear icon image

const fontSize = 47; // Increase the size to match the gear icon size
const columns = canvas.width / fontSize;

// Initialize drops array
let drops = Array(Math.floor(columns)).fill(1);

// Draw matrix effect with gears
function drawMatrix() {
    // Clear the canvas and set a pure black background
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Pure black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Loop through each column to draw gear icons
    drops.forEach((dropPositionY, x) => {
        // Draw the gear icon
        ctx.drawImage(gearImage, x * fontSize, dropPositionY * fontSize, fontSize, fontSize);

        // Reset drop position to the top randomly
        if (dropPositionY * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }
        // Increment drop position
        drops[x] += speed;
    });
}

// Resize canvas dynamically on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalculate number of columns based on the new width
    const newColumns = Math.floor(canvas.width / fontSize);
    drops = Array(newColumns).fill(1);
});

// Start the animation
function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
}

// Wait for the image to load before starting the animation
gearImage.onload = () => {
    animateMatrix();
};
