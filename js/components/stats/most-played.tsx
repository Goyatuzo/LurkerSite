import * as React from 'react';
import { IMostPlayedItem } from '../../models/graphs';
import Chart from 'chart.js';

export interface MFPCProps {
    chartId: string;
    entries: IMostPlayedItem[];
}

export interface MFPCState {

}

export class MostPlayedComponent extends React.Component<MFPCProps, MFPCState> {
    private chart: Chart;

    componentDidMount() {
        this.chart = new Chart(document.getElementById(this.props.chartId) as HTMLCanvasElement, {
            type: 'horizontalBar',
            data: {
                labels: gameNames,
                datasets: [{
                    label: 'Hours Played',
                    data: this.props.entries.map(time => Number(time.time.toFixed(3))),
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
        })
    }

    render() {
        return (
            <canvas id={this.props.chartId}></canvas>
        )
    }
}

export default MostPlayedComponent;