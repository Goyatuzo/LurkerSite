import * as React from 'react';
import { Chart } from 'chart.js';
import { IPlayedSpan } from '../../models/graphs';

import parseISO from 'date-fns/parseISO';
import isAfter from 'date-fns/isAfter';

export interface NOPProps {
    chartId: string;
    entries: IPlayedSpan;
    firstHour: Date;
}

export interface NOPState {
    timePoints: { t: Date, y: number }[];
    dataLoaded: boolean;
}

export class NumberOfPlayersComponent extends React.Component<NOPProps, NOPState> {
    private chart: Chart;
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: NOPProps) {
        super(props);

        this.state = {
            timePoints: [],
            dataLoaded: false
        };

        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    private updateChart(): void {
        if (this.state.timePoints && this.state.timePoints.length > 0) {
            if (!this.chart && this.canvasRef.current) {
                const maxY = Math.max(...this.state.timePoints.map(point => point.y));

                this.chart = new Chart(this.canvasRef.current, {
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
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: maxY / 10 < 1 ? 1 : maxY / 10,
                                    max: maxY
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

        for (let i = props.entries.length - 1; i >= 0; --i) {
            const curr = props.entries[i];

            const time = parseISO(curr.t);

            if (isAfter(time, props.firstHour))
                break;

            timePoints.push({
                t: time,
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
            <canvas ref={this.canvasRef}></canvas>
        )
    }
}

export default NumberOfPlayersComponent;