document.addEventListener("DOMContentLoaded", function() {
    const balloonContainer = document.getElementById('balloon-container');

    function randomColorClass() {
        const colorClasses = ['pink', 'blue', 'green', 'yellow', 'purple', 'orange'];
        return colorClasses[Math.floor(Math.random() * colorClasses.length)];
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon', randomColorClass());

        let xPos = Math.floor(Math.random() * (window.innerWidth - 120));
        balloon.style.left = xPos + 'px';
        balloon.style.bottom = '-200px';
        balloonContainer.appendChild(balloon);

        let verticalSpeed = 0.1 + Math.random() * 0.005;
        let swayAmount = Math.random() * 1.1; // Slight sway
        let swayFrequency = Math.random() * 0.0025; // Slow sway

        let lastTime;
        function updatePosition(time) {
            if (!lastTime) lastTime = time;
            const deltaTime = time - lastTime;

            let verticalMovement = deltaTime * verticalSpeed;
            let horizontalMovement = Math.sin(time * swayFrequency) * swayAmount;

            xPos += horizontalMovement;
            // Ensure xPos stays within the window bounds
            xPos = Math.max(0, Math.min(window.innerWidth - balloon.offsetWidth, xPos));

            let yPos = parseFloat(balloon.style.bottom) + verticalMovement;

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
