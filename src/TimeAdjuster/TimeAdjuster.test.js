import React from 'react';
import { mount } from 'enzyme';
import TimeAdjuster from './TimeAdjuster.js'
import App from '../App.js'

describe(('TimeAdjuster'), () => {
    it('should render a downwards-pointing FontAwesome arrow icon whose onClick callback increments time by one minute when clicked', () => {
        const AppWrapper = mount(<App />)
  
        const mockdownArrowClick = jest.fn(() => {
            AppWrapper.setState({
              workTime: AppWrapper.state().workTime - 1
            })
        })


        const wrapper = mount(<TimeAdjuster time={AppWrapper.state().workTime} downArrowClick={mockdownArrowClick} timeAdjusterName='Session Length' />);
        wrapper.find('.arrowDown').simulate('click');
        const wrapper2 =  mount(<TimeAdjuster time={AppWrapper.state().workTime} downArrowClick={mockdownArrowClick} timeAdjusterName='Session Length' />);
        expect(wrapper2.contains(<span className='time'>{24}</span>)).toEqual(true)
    });

    // This a partly-written commented out test that I am going to start working on once the above one works properly. 
    // it('should render a upwards-pointing FontAwesome arrow icon whose onClick callback increments time by one minute when clicked', () => {
    //     const wrapper = 
    // })
})