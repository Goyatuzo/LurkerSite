import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import addSeconds from 'date-fns/addSeconds';
import addMinutes from 'date-fns/addMinutes';
import addHours from 'date-fns/addHours';
import addDays from 'date-fns/addDays';

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

    describe("Played string test", () => {
        it('0 seconds ago', () => {
            const currentTime = gameFeedOne.sessionEnd;

            expect(comp.contains("0 seconds ago")).toBeTruthy()
        });

        it('1 second ago', () => {
            const now = addSeconds(new Date(gameFeedOne.sessionEnd), 1);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("1 second ago")).toBeTruthy()
        });

        it('2 seconds ago', () => {
            const now = addSeconds(new Date(gameFeedOne.sessionEnd), 2);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("2 seconds ago")).toBeTruthy()
        })

        it('1 minute ago', () => {
            const now = addMinutes(new Date(gameFeedOne.sessionEnd), 1);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("1 minute ago")).toBeTruthy()
        });

        it('2 minutes ago', () => {
            const now = addMinutes(new Date(gameFeedOne.sessionEnd), 2);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("2 minutes ago")).toBeTruthy()
        });

        it('1 hour ago', () => {
            const now = addHours(new Date(gameFeedOne.sessionEnd), 1);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("1 hour ago")).toBeTruthy()
        });

        it('2 hours ago', () => {
            const now = addHours(new Date(gameFeedOne.sessionEnd), 2);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("2 hours ago")).toBeTruthy()
        });

        it('1 day ago', () => {
            const now = addDays(new Date(gameFeedOne.sessionEnd), 1);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("1 day ago")).toBeTruthy()
        });

        it('2 days ago', () => {
            const now = addDays(new Date(gameFeedOne.sessionEnd), 2);
            comp.setProps({
                currentTime: now
            });

            expect(comp.contains("2 days ago")).toBeTruthy()
        });
    });
});