interface GameTime {
    _id: string,
    time: number
}

declare var gameNames: string[];
declare var gameTimes: GameTime[];

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
        events: ['click'],
        onClick: (evt, elements) => {
            if (!elements) return;
            
            const active = elements[0];

            const label = stackedBar.data.labels[(active as any)._index] as string;
            window.location.href = `${window.location.href}/${encodeURIComponent(label)}`;
        }
    }
});