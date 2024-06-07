document.addEventListener('DOMContentLoaded', () => {
    const prizes = ["20k", "30k", "10k", "5k", "12k"];
    const colors = ["#FF5733", "#FFBD33", "#75FF33", "#33FFBD", "#3380FF"];
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');
    const prizeText = document.getElementById('prize');
    let isSpinning = false;
    let startAngle = 0;
    const arc = 2 * Math.PI / prizes.length;
    let spinTimeout = null;
    let spinVelocity = 0;
    const spinAcceleration = 0.1;  // Control the acceleration of the spin
    const spinDuration = 3000; // Spin duration in milliseconds

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < prizes.length; i++) {
            let angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 250, angle, angle + arc, false);
            ctx.lineTo(250, 250);
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "white";
            ctx.translate(250 + Math.cos(angle + arc / 2) * 150, 250 + Math.sin(angle + arc / 2) * 150);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            ctx.fillText(prizes[i], -ctx.measureText(prizes[i]).width / 2, 0);
            ctx.restore();
        }
    }

    function rotateWheel() {
        startAngle += spinVelocity * Math.PI / 180;
        drawWheel();
        if (spinVelocity > 0) {
            spinTimeout = setTimeout(rotateWheel, 30);
        } else {
            stopRotateWheel();
        }
    }

    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        let degrees = startAngle * 180 / Math.PI + 90;
        let arcd = arc * 180 / Math.PI;
        let index = Math.floor((360 - degrees % 360) / arcd) % prizes.length;
        prizeText.textContent = "You need to save: " + prizes[index];
        isSpinning = false;
    }

    spinButton.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            prizeText.textContent = "";
            spinVelocity = Math.random() * 10 + 30;  // Random initial velocity for more excitement
            rotateWheel();
            setTimeout(() => {
                spinVelocity = 0;  // Set velocity to 0 to stop the wheel after 3 seconds
            }, spinDuration);
        }
    });

    drawWheel();
});
