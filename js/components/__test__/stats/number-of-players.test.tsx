import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import parseISO from 'date-fns/parseISO';

import { playedHours } from '../data/played-hours';
import NumberOfPlayers, { NOPProps, NOPState } from '../../stats/number-of-players';

configure({ adapter: new Adapter() });
describe(`Number of Players (Line Graph)`, () => {
    let comp: ShallowWrapper<NOPProps, NOPState>;
    const time = new Date(playedHours[0].t);

    beforeAll(() => {
        comp = shallow(<NumberOfPlayers chartId="playah-id" entries={playedHours} firstHour={time} />)
    });

    describe('state', () => {
        it('default test case shoul have 4 points', () => {
            expect(comp.state().timePoints).toHaveLength(4);
        });

        it('dataLoaded should be set to true', () => {
            expect(comp.state().dataLoaded).toBeTruthy();
        })
    });
});