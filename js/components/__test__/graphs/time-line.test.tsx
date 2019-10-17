import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { playedHours } from '../data/played-hours';
import TimeLineComponent, { TimeLineProps, TimeLineState } from '../../graphs/time-line';

configure({ adapter: new Adapter() });
describe(`Number of Players (Line Graph)`, () => {
    let comp: ShallowWrapper<TimeLineProps, TimeLineState>;
    const time = new Date(playedHours[0].t);

    describe('state', () => {
        beforeAll(() => {
            comp = shallow(<TimeLineComponent yAxisLabel="Label" entries={playedHours} firstHour={time} unit="hour" />)
        });

        it('default test case shoul have 4 points', () => {
            expect(comp.state().timePoints).toHaveLength(4);
        });

        it('dataLoaded should be set to true', () => {
            expect(comp.state().graphDataParsed).toBeTruthy();
        });

        it('updating the props should do something', () => {
            comp.setProps({ entries: [] });
            comp.update();

            expect(comp.state().timePoints).toHaveLength(0);
        });
    });

    describe('first hour is latest', () => {
        beforeAll(() => {
            comp = shallow(<TimeLineComponent yAxisLabel="Label" entries={playedHours} firstHour={new Date(playedHours[playedHours.length - 1].t)} unit="hour" />)
        });

        it('should only have one time point', () => {
            expect(comp.state().timePoints).toHaveLength(1);
        });
    });
});