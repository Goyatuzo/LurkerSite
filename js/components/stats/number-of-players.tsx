import * as React from 'react';
import { Chart } from 'chart.js';
import { IPlayedSpan } from '../../models/graphs';

import parseISO from 'date-fns/parseISO';

export interface NOPProps {
    chartId: string;
    entries: IPlayedSpan;
}

export interface NOPState {
    timePoints: { t: Date, y: number }[];
    dataLoaded: boolean;
}

export class NumberOfPlayersComponent extends React.Component<NOPProps, NOPState> {
    private chart: Chart;

    constructor(props: NOPProps) {
        super(props);

        this.state = {
            timePoints: [],
            dataLoaded: false
        };
    }

    private updateChart(): void {
        if (this.state.timePoints && this.state.timePoints.length > 0) {
            if (!this.chart) {
                this.chart = new Chart(document.getElementById(this.props.chartId) as HTMLCanvasElement, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'Number of Players',
                            data: this.state.timePoints,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'hour'
                                }
                            }]
                        }
                    }
                });
            }
        }
    }

    componentDidMount() {
        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    static getDerivedStateFromProps(props: NOPProps, state: NOPState): NOPState {
        // If data has been processed, nothing to do.
        if (state.dataLoaded || Object.keys(props.entries).length === 0) {
            return null;
        }
        
        let timePoints: { t: Date, y: number }[] = [];

        for (let i = 0; i < props.entries.length; ++i) {
            const curr = props.entries[i];

            timePoints.push({
                t: parseISO(curr.t),
                y: curr.y
            })
        }

        return {
            timePoints: timePoints,
            dataLoaded: true
        }
    }

    shouldComponentUpdate(nextProps: NOPProps): boolean {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render() {
        return (
            <canvas id={this.props.chartId}></canvas>
        )
    }
}

export default NumberOfPlayersComponent;