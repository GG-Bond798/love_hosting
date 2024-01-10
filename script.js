document.addEventListener("DOMContentLoaded", function() {
    const balloonContainer = document.getElementById('balloon-container');

    function randomColorClass() {
        const colorClasses = ['pink', 'blue', 'green', 'yellow', 'purple', 'orange'];
        return colorClasses[Math.floor(Math.random() * colorClasses.length)];
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon', randomColorClass());

        let xPos = Math.floor(Math.random() * window.innerWidth);
        balloon.style.left = xPos + 'px';
        balloon.style.bottom = '-200px';
        balloonContainer.appendChild(balloon);

        // Reduced movement characteristics for each balloon
        let amplitude = Math.random() * 1.3; // Reduced max horizontal movement range
        let frequency = Math.random() * 0.001; // Slightly adjusted oscillation frequency
        let verticalSpeed = 0.1 + Math.random() * 0.005; // Slightly slower vertical speed

        let lastTime;
        function updatePosition(time) {
            if (!lastTime) lastTime = time;
            const deltaTime = time - lastTime;

            let verticalMovement = deltaTime * verticalSpeed;
            let horizontalMovement = Math.sin(time * frequency) * amplitude;

            let yPos = parseFloat(balloon.style.bottom) + verticalMovement;
            xPos += horizontalMovement;

            if (yPos < window.innerHeight + 100) {
                balloon.style.bottom = yPos + 'px';
                balloon.style.left = xPos + 'px';
                requestAnimationFrame(updatePosition);
            } else {
                balloonContainer.removeChild(balloon);
            }

            lastTime = time;
        }

        requestAnimationFrame(updatePosition);
    }

    setInterval(createBalloon, 400);
});
