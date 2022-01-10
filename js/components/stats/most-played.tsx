import * as React from 'react';
import { IMostPlayedItem } from '../../models/graphs';
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export interface MFPCProps {
    entries: IMostPlayedItem[];
    names: string[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const MostPlayedComponent: React.FC<MFPCProps> = props => {
    const chartData = {
        labels: props.names,
        datasets: [{
            label: 'Hours Played',
            data: props.entries.map(time => Number(time.time.toFixed(3))),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }

    return <Pie data={chartData} />
}

export default MostPlayedComponent;