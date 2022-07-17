import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Home';
import store from '@/store';

export default {
  title: 'Example/Home',
  component: Home,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = () => 
  {
    return <BrowserRouter>
      <Provider store={store}>
        <Home />
      </Provider>
    </BrowserRouter>;
  };

export const Default = Template.bind({});
