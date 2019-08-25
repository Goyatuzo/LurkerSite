import * as React from 'react';
import { IGameFeedItem } from '../../models/feed';
import parseISO from 'date-fns/parseISO'

interface Props {
    feedEntry: IGameFeedItem;
}

export const LiveFeedItem: React.StatelessComponent<Props> = props => {
    const endDate = parseISO(props.feedEntry.sessionEnd);
    const now = new Date();
    const diff = now.getTime() - endDate.getTime();

    let playedAgoString = '';

    if (diff > 86400000) {
        playedAgoString = `${(diff / 86400000).toFixed(0)} days ago`;
    } else if (diff > 3600000) {
        playedAgoString = `${(diff / 3600000).toFixed(0)} hours ago`;
    } else if (diff > 60000) {
        playedAgoString = `${(diff / 60000).toFixed(0)} minutes ago`;
    } else {
        playedAgoString = `${(diff / 1000).toFixed(0)} seconds ago`;
    }

    return (
        <tr>
            <td>{props.feedEntry.gameName}</td>
            <td>{props.feedEntry.gameDetail}</td>
            <td>{props.feedEntry.gameState}</td>
            <td>{props.feedEntry.time.toFixed(2)} hours</td>
            <td>{playedAgoString}</td>
        </tr>
    )
}

export default LiveFeedItem;