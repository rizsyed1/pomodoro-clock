import React from 'react';
import { mount } from 'enzyme';
import TimeAdjuster from './TimeAdjuster.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import App from '../App.js'

describe(('TimeAdjuster'), () => {
    it('should render a downwards-pointing FontAwesome arrow icon whose onClick callback increments time by one minute when clicked', () => {
        const AppWrapper = mount(<App />)

        const mockdownArrowClick = () => {
            AppWrapper.setState({
              workTime: AppWrapper.state.workTime - 1
            })
        }
        
        const wrapper = mount(<TimeAdjuster time={25} downArrowClick={mockdownArrowClick} timeAdjusterName='Session Length' />);
        wrapper.find('.arrowDown').simulate('click');
        expect(wrapper.contains(<span className='time'>{24}</span>)).toBe(true);
    });

    // it('should render a upwards-pointing FontAwesome arrow icon whose onClick callback increments time by one minute when clicked', () => {
    //     const wrapper = 
    // })
})