import * as React from 'react';
import { IGameFeedItem } from '../../models/feed';

interface Props {
    feedEntry: IGameFeedItem;
}

export const LiveFeedItem: React.StatelessComponent<Props> = props => {
    return (
        <div>
            <p>{props.feedEntry.gameName} - {props.feedEntry.gameDetail} - {props.feedEntry.gameState}</p>
            <p>{props.feedEntry.time} hours</p>
        </div>
    )
}

export default LiveFeedItem;