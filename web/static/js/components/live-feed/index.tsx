import 'es6-promise';

import * as React from 'react';
import { IGameFeedItem } from '../../models/feed';

interface Props {
    userId: string;
}

interface State {
    feedItems: IGameFeedItem[];
    error: any;
}

export class LiveFeedComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            feedItems: [],
            error: undefined
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/time/feed/${this.props.userId}`)
            .then(response => response.json()).then((data: IGameFeedItem[]) => {
                this.setState({
                    feedItems: data
                });
            }).catch(err => {
                this.setState({
                    error: err
                });
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.feedItems.map(item => <div key={item._id}>{item.gameName}</div>)
                }
            </div>
        )
    }
}

export default LiveFeedComponent;