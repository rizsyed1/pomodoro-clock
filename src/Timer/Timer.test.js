import React from 'react';
import { mount } from 'enzyme';
import Timer from './Timer.js'

describe(('Timer'), () => {
    it('should render a div element with className "container" ', () => {
        const wrapper = mount(<Timer  />);
        expect(wrapper.find('.container').length).toEqual(1);
    })

    it('should render a <p> element with className "header", that should contain childNode text "session" ', () => {
        const wrapper = mount(<Timer />);
        expect(wrapper.containsMatchingElement(<p>Session</p>)).toEqual(true);
    })
    
    
})