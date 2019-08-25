import * as React from 'React';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import addSeconds from 'date-fns/addSeconds'

import { gameFeedOne } from '../data/game-feed';
import LiveFeedItem from '../../live-feed/item';

configure({ adapter: new Adapter() });
describe(`Live Feed Item test`, () => {
    let comp: ShallowWrapper;
    const now = new Date(gameFeedOne.sessionEnd);

    beforeEach(() => {
        comp = shallow(<LiveFeedItem feedEntry={gameFeedOne} currentTime={now} />)
    });

    it('League of Legends text appears', () => {
        expect(comp.contains("League of Legends")).toBeTruthy();
    });

    describe("time span test", () => {
        it('0 seconds ago', () => {
            const currentTime = gameFeedOne.sessionEnd;

            expect(comp.contains("0 seconds ago")).toBeTruthy()
        });

        it('1 seconds ago', () => {
            const now = addSeconds(new Date(gameFeedOne.sessionEnd), 1);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("1 seconds ago")).toBeTruthy()
        });
    });
});