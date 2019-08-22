import * as React from 'react';
import { IGameFeedItem } from '../../models/feed';
import parseISO from 'date-fns/parseISO'
import subMilliseconds from 'date-fns/subMilliseconds';

interface Props {
    feedEntry: IGameFeedItem;
}

export const LiveFeedItem: React.StatelessComponent<Props> = props => {
    const endDate = parseISO(props.feedEntry.sessionEnd);
    const diff = subMilliseconds(new Date(), endDate.getTime());

    let playedAgoString = '';
    
    if (diff.getDate() > 0) {
        playedAgoString = `${diff.getDate()} days ago`;
    } else if (diff.getHours() > 0) {
        playedAgoString = `${diff.getHours()} hours ago`;
    } else if (diff.getMinutes() > 0) {
        playedAgoString = `${diff.getMinutes()} minutes ago`;
    } else {
        playedAgoString = `${diff.getSeconds()} seconds ago`;
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