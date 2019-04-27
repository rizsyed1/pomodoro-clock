import React from 'react';
import { mount } from 'enzyme';
import TimeAdjuster from './TimeAdjuster.js'
import App from '../App.js'

describe(('TimeAdjuster'), () => {
    it('when rendering Session Length should render a downwards-pointing FontAwesome arrow icon whose onClick callback decrements workTime length time by one minute', () => {
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

    it('when rendering Session Length should should render a upwards-pointing FontAwesome arrow icon whose onClick callback increments workTime by one minute', () => {
        const AppWrapper = mount(<App />)
        const mockUpArrowClick = jest.fn(() => {
            AppWrapper.setState({
              workTime: AppWrapper.state().workTime + 1
            })
        })
        const wrapper = mount(<TimeAdjuster time={AppWrapper.state().workTime} upArrowClick={mockUpArrowClick} timeAdjusterName='Session Length' />);
        wrapper.find('.arrowUp').simulate('click');
        const wrapper2 =  mount(<TimeAdjuster time={AppWrapper.state().workTime} upArrowClick={mockUpArrowClick} timeAdjusterName='Session Length' />);
        expect(wrapper2.contains(<span className='time'>{26}</span>)).toEqual(true)
    });

    it('when rendering Break Length should should render a downwards-pointing FontAwesome arrow icon whose onClick callback decrements restTime by one minute', () => {
        const AppWrapper = mount(<App />)
        const mockDownArrowClick = jest.fn(() => {
            AppWrapper.setState({
              restTime: AppWrapper.state().restTime - 1
            })
        })
        const wrapper = mount(<TimeAdjuster time={AppWrapper.state().restTime} downArrowClick={mockDownArrowClick} timeAdjusterName='Break Length' />);
        wrapper.find('.arrowDown').simulate('click');
        const wrapper2 =  mount(<TimeAdjuster time={AppWrapper.state().restTime} downArrowClick={mockDownArrowClick} timeAdjusterName='Break Length' />);
        expect(wrapper2.contains(<span className='time'>{4}</span>)).toEqual(true)
    });

    it('when rendering Break Length should should render a upwards-pointing FontAwesome arrow icon whose onClick callback increments restTime by one minute', () => {
        const AppWrapper = mount(<App />)
        const mockUpArrowClick = jest.fn(() => {
            AppWrapper.setState({
              restTime: AppWrapper.state().restTime + 1
            })
        })
        const wrapper = mount(<TimeAdjuster time={AppWrapper.state().restTime} upArrowClick={mockUpArrowClick} timeAdjusterName='Break Length' />);
        wrapper.find('.arrowUp').simulate('click');
        const wrapper2 =  mount(<TimeAdjuster time={AppWrapper.state().restTime} upArrowClick={mockUpArrowClick} timeAdjusterName='Break Length' />);
        expect(wrapper2.contains(<span className='time'>{6}</span>)).toEqual(true)
    });
})