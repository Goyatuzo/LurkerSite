import * as React from 'react';

import { IStatsReponse } from '../../models/graphs';
import {useQuery} from "react-query";
import {PieWrapper} from "../graphs/pie-wrapper";

export interface StatsProps {

}

export const StatsComponent: React.FC<StatsProps> = _ => {
    const { isLoading, data } = useQuery<IStatsReponse>('allUsersTwoWeeksGame', () =>
        fetch(`/api/time/stats`).then(response => response.json())
    )

    if (!isLoading) {
        return (
            <div>
                <h2>2 weeks most played games</h2>
                <div className="ui two column stackable grid">
                    <div className="column">
                        <PieWrapper names={data.game_names} entries={data.most_played}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default StatsComponent;