// JavaScript for Quantitative and Abstract Visualizations

// Load data (example placeholder; replace with actual data fetching if needed)
const data = [
    { date: '2024-12-01', exercise: 30, screenTime: 4, socialInteractions: 3, sleep: 7.5, happiness: 8, stress: 3 },
    { date: '2024-12-02', exercise: 15, screenTime: 6, socialInteractions: 2, sleep: 6, happiness: 6, stress: 5 },
    { date: '2024-12-03', exercise: 20, screenTime: 5, socialInteractions: 4, sleep: 8, happiness: 7, stress: 4 },
    { date: '2024-12-04', exercise: 0, screenTime: 7, socialInteractions: 1, sleep: 5.5, happiness: 5, stress: 6 },
    { date: '2024-12-05', exercise: 40, screenTime: 3, socialInteractions: 5, sleep: 9, happiness: 9, stress: 2 }
];

// Quantitative Visualization with Chart.js
const quantitativeChartContext = document.getElementById('quantitativeChart').getContext('2d');
new Chart(quantitativeChartContext, {
    type: 'line',
    data: {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Happiness',
                data: data.map(item => item.happiness),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            },
            {
                label: 'Stress',
                data: data.map(item => item.stress),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Happiness and Stress Levels Over Time'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Level (1-10)'
                },
                suggestedMin: 0,
                suggestedMax: 10
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        }
    }
});

// Abstract Visualization with Enhanced Features
const abstractCanvas = document.getElementById('abstractChart');
const abstractContext = abstractCanvas.getContext('2d');
let tooltipOpacity = 0;

// Gradient background for clarity
const gradient = abstractContext.createLinearGradient(0, 0, abstractCanvas.width, abstractCanvas.height);
gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
gradient.addColorStop(1, 'rgba(200, 200, 255, 0.2)');

abstractCanvas.width = 800;
abstractCanvas.height = 400;

function drawAbstractVisualization() {
    abstractContext.clearRect(0, 0, abstractCanvas.width, abstractCanvas.height);

    // Draw gradient background
    abstractContext.fillStyle = gradient;
    abstractContext.fillRect(0, 0, abstractCanvas.width, abstractCanvas.height);

    data.forEach((item, index) => {
        const x = (index + 1) * (abstractCanvas.width / (data.length + 1));
        const y = abstractCanvas.height - item.happiness * 20;

        // Draw glowing circles for data points
        abstractContext.beginPath();
        abstractContext.arc(x, y, item.socialInteractions * 5, 0, Math.PI * 2);
        abstractContext.fillStyle = `rgba(${255 - item.stress * 20}, ${item.happiness * 20}, ${item.stress * 20}, 0.8)`;
        abstractContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
        abstractContext.shadowBlur = 10;
        abstractContext.fill();
        abstractContext.closePath();

        // Draw connecting lines
        if (index > 0) {
            const prevX = index * (abstractCanvas.width / (data.length + 1));
            const prevY = abstractCanvas.height - data[index - 1].happiness * 20;

            abstractContext.beginPath();
            abstractContext.moveTo(prevX, prevY);
            abstractContext.lineTo(x, y);
            abstractContext.strokeStyle = 'rgba(100, 100, 255, 0.5)';
            abstractContext.lineWidth = 2;
            abstractContext.stroke();
            abstractContext.closePath();
        }

        // Display dates
        abstractContext.font = '12px Arial';
        abstractContext.fillStyle = '#333';
        abstractContext.fillText(item.date, x - 20, abstractCanvas.height - 10);
    });

    // Add tooltip interaction
    abstractCanvas.addEventListener('mousemove', (event) => {
        const rect = abstractCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        let hoverDetected = false;

        abstractContext.clearRect(0, 0, 300, 120);

        data.forEach((item, index) => {
            const x = (index + 1) * (abstractCanvas.width / (data.length + 1));
            const y = abstractCanvas.height - item.happiness * 20;
            const radius = item.socialInteractions * 5;

            if (
                mouseX > x - radius &&
                mouseX < x + radius &&
                mouseY > y - radius &&
                mouseY < y + radius
            ) {
                hoverDetected = true;
                tooltipOpacity = Math.min(tooltipOpacity + 0.1, 1);
                abstractContext.globalAlpha = tooltipOpacity;

                abstractContext.fillStyle = '#000';
                abstractContext.fillRect(mouseX + 10, mouseY + 10, 260, 120);
                abstractContext.fillStyle = '#fff';
                abstractContext.font = '14px Arial';
                abstractContext.fillText(`Date: ${item.date}`, mouseX + 15, mouseY + 30);
                abstractContext.fillText(`Happiness: ${item.happiness}`, mouseX + 15, mouseY + 50);
                abstractContext.fillText(`Stress: ${item.stress}`, mouseX + 15, mouseY + 70);
                abstractContext.fillText(`Exercise: ${item.exercise} mins`, mouseX + 15, mouseY + 90);
                abstractContext.fillText(`Sleep: ${item.sleep} hrs`, mouseX + 15, mouseY + 110);
                abstractContext.globalAlpha = 1;
            }
        });

        if (!hoverDetected) {
            tooltipOpacity = Math.max(tooltipOpacity - 0.1, 0);
        }
    });
}

// Smooth animation loop
function updateCanvas() {
    requestAnimationFrame(updateCanvas);
    drawAbstractVisualization();
}

updateCanvas();
