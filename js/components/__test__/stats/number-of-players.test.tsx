import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { playedHours } from '../data/played-hours';
import NumberOfPlayers, { NOPProps, NOPState } from '../../stats/number-of-players';

configure({ adapter: new Adapter() });
describe(`Number of Players (Line Graph)`, () => {
    let comp: ShallowWrapper<NOPProps, NOPState>;
    const time = new Date(playedHours[0].t);

    describe('state', () => {
        beforeAll(() => {
            comp = shallow(<NumberOfPlayers chartId="playah-id" entries={playedHours} firstHour={time} />)
        });

        it('default test case shoul have 4 points', () => {
            expect(comp.state().timePoints).toHaveLength(4);
        });

        it('dataLoaded should be set to true', () => {
            expect(comp.state().dataLoaded).toBeTruthy();
        });

        it('updating the props should do nothing', () => {
            comp.setProps({ entries: [] });
            comp.update();

            expect(comp.state().timePoints).toHaveLength(4);
        });
    });

    describe('first hour is latest', () => {
        beforeAll(() => {
            comp = shallow(<NumberOfPlayers chartId="playah-id" entries={playedHours} firstHour={new Date(playedHours[playedHours.length - 1].t)} />)
        });

        it('should only have one time point', () => {
            expect(comp.state().timePoints).toHaveLength(1);
        });
    });
});