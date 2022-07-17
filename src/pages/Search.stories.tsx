import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Search from './Search';
import store from '@/store';

export default {
  title: 'Example/Search',
  component: Search,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = () => 
  {
    return <BrowserRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>;
  };

export const Default = Template.bind({});
