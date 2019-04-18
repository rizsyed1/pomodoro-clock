import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeAdjuster from './TimeAdjuster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

describe(('LengthSetter'), () => {
    it('should render a div', () => {
        const wrapper = mount(<TimeAdjuster />);
        expect(wrapper.find('div').length).toEqual(1);
    })

    it('should render an upwards-pointing FontAwesome arrow icon', () => {
        const wrapper = mount(<TimeAdjuster />);
        expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faArrowUp} />)).toEqual(true);
    })

    it('should render a downwards-pointing FontAwesome arrow icon', () => {
        const wrapper = mount(<TimeAdjuster />);
        expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faArrowDown} />)).toEqual(true);
    })
})