import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeAdjuster from './TimeAdjuster.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

describe(('TimeAdjuster'), () => {
    it('should render a div', () => {
        const wrapper = mount(<TimeAdjuster time={25} />);
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render an upwards-pointing FontAwesome arrow icon', () => {
        const wrapper = mount(<TimeAdjuster time={25}/>);
        expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faArrowUp} />)).toEqual(true);
    });

    it('should render an upwards-pointing FontAwesome arrow icon that calls the onClick callback when clicked', () => {
        const wrapper = // use enzyme's simulate method to test onClick - see this link too: 
    })

    it('should render a <span> element that contains the time', () => {
        const wrapper = mount(<TimeAdjuster time={25}/>);
        expect(wrapper.find('span').length).toEqual(1);
    });

    it('should render a downwards-pointing FontAwesome arrow icon', () => {
        const wrapper = mount(<TimeAdjuster time={25}/>);
        expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faArrowDown} />)).toEqual(true);
    });


})