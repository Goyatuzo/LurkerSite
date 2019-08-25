import 'es6-promise';

import * as React from 'react';
import LiveFeedItem from './item';
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

    fetchData(): void {
        fetch(`/api/time/feed/${this.props.userId}`)
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

    private boundFetchData = this.fetchData.bind(this);

    componentDidMount() {
        this.boundFetchData();

        setInterval(this.boundFetchData, 8000);
    }

    render() {
        const now = new Date();

        return (
            <div>
                <h2>Recent activity</h2>
                <table className="ui very basic table">
                    <thead>
                        <tr>
                            <th>Game Name</th>
                            <th>Game State</th>
                            <th>Game Detail</th>
                            <th>Duration</th>
                            <th>Played</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.feedItems.map(item => <LiveFeedItem key={item._id} feedEntry={item} currentTime={now} />)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default LiveFeedComponent;