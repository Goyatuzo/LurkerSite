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
        events: ['click'],
        onClick: (evt, elements) => {
            if (!elements || !canDrillDeeper) return;
            
            const active = elements[0];
            const urlComponents = window.location.href.split('?');

            const label = stackedBar.data.labels[(active as any)._index] as string;

            let redirectUrl = `${urlComponents[0]}/${encodeURIComponent(label)}`;

            if (urlComponents[1]) {
                redirectUrl += `?${urlComponents[1]}`;
            }

            window.location.href = redirectUrl;
        }
    }
});