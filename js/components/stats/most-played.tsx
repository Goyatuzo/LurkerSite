import * as React from 'react';
import { Chart } from 'chart.js';
import { IMostPlayedItem } from '../../models/graphs';

export interface MFPCProps {
    chartId: string;
    entries: IMostPlayedItem[];
    names: string[];
}

export interface MFPCState {

}

export class MostPlayedComponent extends React.Component<MFPCProps, MFPCState> {
    private chart: Chart;

    private updateChart(): void {
        if (this.props.entries && this.props.entries.length > 0) {
            if (!this.chart) {
                this.chart = new Chart(document.getElementById(this.props.chartId) as HTMLCanvasElement, {
                    type: 'bar',
                    data: {
                        labels: this.props.names,
                        datasets: [{
                            label: 'Hours Played',
                            data: this.props.entries.map(time => Number(time.time.toFixed(3))),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            } else {
                this.chart.data = {
                    labels: this.props.names,
                    datasets: [{
                        label: 'Hours Played',
                        data: this.props.entries.map(time => Number(time.time.toFixed(3))),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                }
                this.chart.update();
            }
        }
    }

    componentDidMount() {
        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    render() {
        return (
            <canvas id={this.props.chartId}></canvas>
        )
    }
}

export default MostPlayedComponent;