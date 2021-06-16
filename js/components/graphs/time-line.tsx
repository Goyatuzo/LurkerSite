import * as React from 'react';
import { Chart } from 'chart.js';
import { IPlayedSpan } from '../../models/graphs';

import parseISO from 'date-fns/parseISO';
import isAfter from 'date-fns/isAfter';

export interface TimeLineProps {
    entries?: IPlayedSpan;
    firstHour: Date;
    unit: Chart.TimeUnit;
    url?: string;
    yAxisLabel: string;
}

export interface TimeLineState {
    timePoints: { t: Date, y: number }[];
    graphDataParsed: boolean;
}

export class TimeLineComponent extends React.Component<TimeLineProps, TimeLineState> {
    private chart: Chart<"line", any>;
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: TimeLineProps) {
        super(props);

        this.state = {
            timePoints: [],
            graphDataParsed: false
        };

        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    private updateChart(): void {
        if (this.state.timePoints.length > 0 && !this.chart && this.canvasRef.current) {
            const maxY = Math.max(...this.state.timePoints.map(point => point.y));

            this.chart = new Chart(this.canvasRef.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: this.props.yAxisLabel,
                        data: this.state.timePoints,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        xAxis: {
                            type: 'time',
                            time: {
                                unit: this.props.unit
                            }
                        },
                        yAxis: {
                            ticks: {
                                //beginAtZero: true,
                                stepSize: maxY / 10 < 1 ? 1 : maxY / 10,
                                //max: maxY
                            }
                        }
                    }
                }
            });
        }
    }

    componentDidMount() {
        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    static getDerivedStateFromProps(props: TimeLineProps, state: TimeLineState): TimeLineState {
        // If data has been processed, nothing to do.
        if (state.graphDataParsed || !props.entries || !Object.keys(props.entries)) {
            return {
                timePoints: [],
                graphDataParsed: false
            };
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
            graphDataParsed: true
        }
    }

    shouldComponentUpdate(nextProps: TimeLineProps): boolean {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render() {
        return (
            <canvas ref={this.canvasRef}></canvas>
        )
    }
}

export default TimeLineComponent;