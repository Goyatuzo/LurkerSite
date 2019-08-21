/// <reference types="semantic-ui" />

$('.ui .search').search({
    apiSettings: {
        url: '/api/search/names?user={query}'
    },
    minCharacters: 2
});

interface GameTime {
    _id: string,
    time: number
}

declare var gameNames: string[];
declare var gameTimes: GameTime[];
declare var canDrillDeeper: boolean;

var stackedBar = new Chart(document.getElementById("time-chart") as HTMLCanvasElement, {
    type: 'horizontalBar',
    data: {
        labels: gameNames,
        datasets: [{
            label: 'Hours Played',
            data: gameTimes.map(time => Number(time.time.toFixed(3))),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});