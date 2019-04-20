import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import TimeAdjuster from './TimeAdjuster.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

describe(('TimeAdjuster'), () => {
    it('should render a div', () => {
        const wrapper = mount(<TimeAdjuster time={25} />);
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a element of className arrowUp', () => {
        const wrapper = mount(<TimeAdjuster time={25} />) 
        expect(wrapper.find('.arrowUp').length).toEqual(1);
    })

    it('should render an element of className arrowDown', () => {
        const wrapper = mount(<TimeAdjuster time={25} />)
        expect(wrapper.find('.arrowDown').length).toEqual(1);
    })

    it('should render an upwards-pointing FontAwesome arrow icon', () => {
        const wrapper = mount(<TimeAdjuster time={25}/>);
        expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faArrowUp} />)).toEqual(true);
    });

    it('should render an upwards-pointing FontAwesome arrow icon that calls the onClick callback when clicked', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(<TimeAdjuster upArrowClick={mockCallBack} time={25}/>);
        wrapper.find('.arrowUp').simulate('click');
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    })

    it('should render a <span className="time"> element that contains the time', () => {
        const wrapper = mount(<TimeAdjuster time={25}/>);
        expect(wrapper.find('.time').length).toEqual(1);
    });

    it('should render a downwards-pointing FontAwesome arrow icon', () => {
        const wrapper = mount(<TimeAdjuster time={25}/>);
        expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faArrowDown} />)).toEqual(true);
    });

    it('should render a downwards-pointing FontAwesome arrow icon that calls the onClick callback when clicked', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(<TimeAdjuster downArrowClick={mockCallBack} time={25}/>);
        wrapper.find('.arrowDown').simulate('click');
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    })
})