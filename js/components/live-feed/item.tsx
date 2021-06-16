import * as React from 'react';
import { IGameFeedItem } from '../../models/feed';
import parseISO from 'date-fns/parseISO'

interface Props {
    feedEntry: IGameFeedItem;
    currentTime: Date;
}

export const LiveFeedItem: React.StatelessComponent<Props> = props => {
    const endDate = parseISO(props.feedEntry.sessionEnd);
    const diff = props.currentTime.getTime() - endDate.getTime();

    let playedAgoString = '';

    if (diff >= 86400000) {
        if (diff < 172800000) {
            playedAgoString = `1 day ago`;
        } else {
            playedAgoString = `${(diff / 86400000).toFixed(0)} days ago`;
        }
    } else if (diff >= 3600000) {
        if (diff < 7200000) {
            playedAgoString = `1 hour ago`;
        } else {
            playedAgoString = `${(diff / 3600000).toFixed(0)} hours ago`;
        }
    } else if (diff >= 60000) {
        if (diff < 120000) {
            playedAgoString = `1 minute ago`;
        } else {
            playedAgoString = `${(diff / 60000).toFixed(0)} minutes ago`;
        }
    } else if (diff >= 1000 && diff < 2000) {
        playedAgoString = `1 second ago`;
    } else {
        playedAgoString = `${(diff / 1000).toFixed(0)} seconds ago`;
    }

    return (
        <tr>
            <td>{props.feedEntry.gameName}</td>
            <td>{props.feedEntry.gameDetail}</td>
            <td>{props.feedEntry.gameState}</td>
            <td>{props.feedEntry.largeAssetText}</td>
            <td>{props.feedEntry.smallAssetText}</td>
            <td className="time-played">{props.feedEntry.time.toFixed(2)} hours</td>
            <td className="last-played">{playedAgoString}</td>
        </tr>
    )
}

export default LiveFeedItem;