import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { once } from 'fetch-mock';


import { gameFeed } from '../data/game-feed';
import LiveFeed, { LiveFeedProps, LiveFeedState } from '../../live-feed';
import LiveFeedItem from '../../live-feed/item';

configure({ adapter: new Adapter() });
describe(`Live Feed`, () => {
    let comp: ShallowWrapper<LiveFeedProps, LiveFeedState>;

    beforeAll(() => {
        once(`/api/time/feed/123`, gameFeed);
        comp = shallow(<LiveFeed userId='123' />)
    });

    describe('successful api call', () => {
        it('should have two LiveFeedItems', () => {
            expect(comp.find(LiveFeedItem)).toHaveLength(2);
        });

        it('error should be undefined', () => {
            expect(comp.state().error).toBeUndefined();
        });
    });
});