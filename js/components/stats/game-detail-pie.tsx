import * as React from 'react';
import {useQuery} from "react-query";
import {IGameDetailResponse} from "../../models/graphs";
import {HoursPlayedPie} from "../graphs/hours-played-pie";

export interface GameDetailPieProps {
    detail: 'gameDetail' | 'gameState' | 'gameName' | 'gameType' | 'largeAssetText' | 'smallAssetText'
    userId: string
    gameName: string
}

export const GameDetailPie: React.FC<GameDetailPieProps> = props => {
    const { isLoading, data } = useQuery<IGameDetailResponse>(`userGameDetail${props.detail}`, () =>
        fetch(`/api/time/stats/${props.userId}/${props.gameName}${props.detail}`).then(response => response.json())
    )

    if (isLoading) {
        return null
    }

    return <HoursPlayedPie entries={data.time_data} names={data.names} />
}