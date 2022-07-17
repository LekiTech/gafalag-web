import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import store from '@/store';
import SearchBar from './index';
import { Provider } from 'react-redux';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SearchBar',
  component: SearchBar,
  // // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof SearchBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchBar> = (args) => 
  (
    <Provider store={store}>
      <SearchBar {...args} />
    </Provider>
  );
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};