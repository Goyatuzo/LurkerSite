import * as React from 'react';

import { IStatsReponse } from '../../models/graphs';
import MostPlayed from './most-played';
import TimeLineGraph from '../graphs/time-line';

export interface StatsProps {

}

export interface StatsState {
    response: IStatsReponse;
}

export class StatsComponent extends React.Component<StatsProps, StatsState> {
    constructor(props: StatsProps) {
        super(props);

        this.state = {
            response: {
                game_names: [],
                most_played: [],
                played_hours: []
            }
        }
    }

    componentDidMount() {
        fetch(`/api/time/stats`).then(response => response.json())
            .then((data: IStatsReponse) => {
                this.setState({
                    response: data
                });
            });
    }

    render() {
        return (
            <div>
                <h2>2 weeks most played games</h2>
                <div className="ui two column stackable grid">
                    <div className="column">
                        <MostPlayed names={this.state.response.game_names} entries={this.state.response.most_played} />
                    </div>
                </div>

                <h2>48 hours number of players</h2>
                <TimeLineGraph yAxisLabel="Numbers of Players" entries={this.state.response.played_hours} firstHour={new Date()} unit="hour" />
            </div>
        )
    }
}

export default StatsComponent;