import * as React from 'react';

import { IStatsReponse } from '../../models/graphs';
import MostPlayed from './most-played';
import NumberOfPlayers from './number-of-players';

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
                played_hours: {}
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
                <MostPlayed chartId="two-weeks" names={this.state.response.game_names} entries={this.state.response.most_played} />
                <NumberOfPlayers chartId="players" entries={this.state.response.played_hours} />
            </div>
        )
    }
}

export default StatsComponent;