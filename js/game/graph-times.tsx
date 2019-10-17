import * as React from 'react';
import { IGameStatsResponse, IPlayedSpan } from '../models/graphs';
import isAfter from 'date-fns/isAfter';

import TimeLine from '../components/graphs/time-line';

interface Props {
    gameName: string;
}

interface State {
    data: IGameStatsResponse;
    pastYearTimeline: IPlayedSpan;
    graphDataParsed: boolean;
}

export class GameGraphTimes extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: null,
            pastYearTimeline: null,
            graphDataParsed: false
        };
    }

    componentDidMount() {
        fetch(`/api/time/game/all-stats/${this.props.gameName}`).then(res => res.json()).then(response => {
            let timePoints: IPlayedSpan = [];

            const timeLineData = response.past_year;
            const now = new Date();
    
            for (let i = timeLineData.length - 1; i >= 0; --i) {
                const curr = timeLineData[i];
    
                const time = new Date(curr.date);
    
                if (isAfter(time, now))
                    break;
    
                timePoints.push({
                    t: time.toISOString(),
                    y: curr.time
                });
            }

            this.setState({
                data: response,
                graphDataParsed: true,
                pastYearTimeline: timePoints
            });
        });
    }

    static getDerivedStateFromProps(props: Props, state: State): State {
        // If data has been processed, nothing to do.
        if (!state.graphDataParsed) {
            return state;
        }

        let timePoints: IPlayedSpan = [];

        const timeLineData = state.data.past_year;
        const now = new Date();

        for (let i = timeLineData.length - 1; i >= 0; --i) {
            const curr = timeLineData[i];

            const time = new Date(curr.date);

            if (isAfter(time, now))
                break;

            timePoints.push({
                t: time.toISOString(),
                y: curr.time
            });
        }

        return { ...state, graphDataParsed: true, pastYearTimeline: timePoints };
    }

    render() {
        return (
            <>
                <TimeLine unit="month" firstHour={new Date()} entries={this.state.pastYearTimeline} yAxisLabel="Hours Played" />
            </>
        )
    }
}

export default GameGraphTimes;