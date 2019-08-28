import * as React from 'react';

import { IStatsReponse } from '../../models/graphs';
import MostPlayed from './most-played';

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
            <MostPlayed chartId="two-weeks" names={this.state.response.game_names} entries={this.state.response.most_played} />
        )
    }
}

export default StatsComponent;