import React from 'react';
import { mount } from 'enzyme';
import TimeAdjuster from './TimeAdjuster.js'
import App from '../App.js'

describe(('TimeAdjuster'), () => {
    it('when rendering Session Length should render a downwards-pointing FontAwesome arrow icon whose onClick callback decrements timeLeft length time by one minute', () => {
        const AppWrapper = mount(<App />);

        const mockdownArrowClick = jest.fn(() => {
            AppWrapper.setState({
                timeAdjusterWorkTime: AppWrapper.state().timeAdjusterWorkTime - 60
            })
        });

        const timeDisplay = jest.fn(( seconds ) => {
            return Math.floor(seconds / 60)
        });
        
        const wrapper = mount(
            <TimeAdjuster 
                time={AppWrapper.state().timeAdjusterWorkTime} 
                downArrowClick={mockdownArrowClick} 
                timeAdjusterName='Session Length' 
            />
        );

        wrapper.find('.arrowDown').simulate('click');
       
        const wrapper2 =  mount(
            <TimeAdjuster 
                time={AppWrapper.state().timeAdjusterWorkTime} 
                downArrowClick={mockdownArrowClick} 
                timeAdjusterName='Session Length' 
            />
        );

        expect(wrapper2.contains(<span className='time'>{timeDisplay(1440)}</span>)).toEqual(true)
    });


    it('when rendering Session Length should should render a upwards-pointing FontAwesome arrow icon whose onClick callback increments timeLeft by one minute', () => {
        const AppWrapper = mount(<App />);

        const mockUpArrowClick = jest.fn(() => {
            AppWrapper.setState({
              timeAdjusterWorkTime: AppWrapper.state().timeAdjusterWorkTime + 60
            })
        });

        const timeDisplay = jest.fn(( seconds ) => {
            return Math.floor(seconds / 60)
        });

        const wrapper = mount(
            <TimeAdjuster 
            time={AppWrapper.state().timeAdjusterWorkTime} 
            upArrowClick={mockUpArrowClick} 
            timeAdjusterName='Session Length' 
        />
        );

        wrapper.find('.arrowUp').simulate('click');

        const wrapper2 =  mount(
            <TimeAdjuster 
            time={AppWrapper.state().timeAdjusterWorkTime} 
            upArrowClick={mockUpArrowClick} 
            timeAdjusterName='Session Length' 
            />
        );

        expect(wrapper2.contains(<span className='time'>{timeDisplay(1560)}</span>)).toEqual(true)
    });


    it('when rendering Break Length should should render a downwards-pointing FontAwesome arrow icon whose onClick callback decrements timeLeft by one minute', () => {
        const AppWrapper = mount(<App />);

        const mockDownArrowClick = jest.fn(() => {
            AppWrapper.setState({
                timeAdjusterBreakTime: AppWrapper.state().timeAdjusterBreakTime - 60
            })
        });

        const timeDisplay = jest.fn(( seconds ) => {
            return Math.floor(seconds / 60)
        });

        const wrapper = mount(
            <TimeAdjuster 
            time={AppWrapper.state().timeAdjusterBreakTime} 
            downArrowClick={mockDownArrowClick} 
            timeAdjusterName='Break Length' 
            />
        );

        wrapper.find('.arrowDown').simulate('click');

        const wrapper2 =  mount(
            <TimeAdjuster 
            time={AppWrapper.state().timeAdjusterBreakTime} 
            downArrowClick={mockDownArrowClick} 
            timeAdjusterName='Break Length' 
            />
        );

        expect(wrapper2.contains(<span className='time'>{timeDisplay(240)}</span>)).toEqual(true)
    });

    
    it('when rendering Break Length should should render a upwards-pointing FontAwesome arrow icon whose onClick callback increments timeLeft by one minute', () => {
        const AppWrapper = mount(<App />);

        const mockUpArrowClick = jest.fn(() => {
            AppWrapper.setState({
                timeAdjusterBreakTime: AppWrapper.state().timeAdjusterBreakTime + 60
            })
        });

        const timeDisplay = jest.fn(( seconds ) => {
            return Math.floor(seconds / 60)
        });
        
        const wrapper = mount(
            <TimeAdjuster 
            time={AppWrapper.state().timeAdjusterBreakTime} 
            upArrowClick={mockUpArrowClick} 
            timeAdjusterName='Break Length' 
            />
        );

        wrapper.find('.arrowUp').simulate('click');

        const wrapper2 =  mount(
            <TimeAdjuster 
            time={AppWrapper.state().timeAdjusterBreakTime} 
            upArrowClick={mockUpArrowClick} 
            timeAdjusterName='Break Length' 
            />
        );
        expect(wrapper2.contains(<span className='time'>{timeDisplay(360)}</span>)).toEqual(true)
    });
})