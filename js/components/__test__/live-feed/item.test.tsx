import * as React from 'React';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { gameFeedOne } from '../data/game-feed';
import LiveFeedItem from '../../live-feed/item';

configure({ adapter: new Adapter() });
describe(`Live Feed Item test`, () => {
    it('League of Legends text appears', () => {
        const comp = shallow(<LiveFeedItem feedEntry={gameFeedOne} />)

        expect(comp.contains("League of Legends")).toBeTruthy();
    })
});