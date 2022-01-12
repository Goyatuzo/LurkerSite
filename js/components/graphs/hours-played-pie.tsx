import {ITimePlayedItem} from "../../models/graphs";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import * as React from "react";
import {stringToColor} from "../../helpers/string-to-color";
import {Pie} from "react-chartjs-2";

export interface HoursPlayedPieProps {
    entries: ITimePlayedItem[];
    names: string[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const HoursPlayedPie: React.FC<HoursPlayedPieProps> = props => {
    const chartData = {
        labels: props.names,
        datasets: [{
            label: 'Hours Played',
            data: props.entries.map(time => Number(time.time.toFixed(3))),
            backgroundColor: props.names.map(gameName => stringToColor(gameName)),
            borderColor: props.names.map(gameName => stringToColor(gameName)),
            borderWidth: 1
        }]
    }

    return <Pie data={chartData} />
}