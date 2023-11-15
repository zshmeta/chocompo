
  

    // const storyIndex = await askQuestionWithOptions(
    //   `Would you like to create a story file for your ${compoType}?`,
    //   storyOptions
    // );

    // const story = storyOptions[storyIndex];


    // if (storyOptions === red('Cancel')) {
    //   createAnotherComponent = false;
    //   break;
    // }

    // Create the compo story file if (story) {
      if (story === blue('Yes')) {
      const compoStory = `  import React from 'react'; 
import ${compoName} from './${compoName}'; 
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
storiesOf('atoms/${compoName}', module)
  .add('default', () => (
    <${compoName} onClick={action('clicked')}>
      Default
    </${compoName}>
  ))
  // Add desired action (onClick, onHover, etc) to the ${compoName} component
  .add('outlined primary', () => (
    <${compoName} variant="outlined" color="primary" onClick={action('clicked')}>
      Outline Primary
    </${compoName}>
  ))
  .add('contained secondary', () => (
    <${compoName} variant="contained" color="secondary" onClick={action('clicked')}>
      Contained Secondary
    </${compoName}>
  ))
  .add('circle ${compoName}', () => (
    <${compoName} variant="fab" color="primary" aria-label="Add" onClick={action('clicked')}>
      CB
    </${compoName}>
  ))
  .add('disabled ${compoName}', () => (
    <${compoName} variant="contained" color="primary" disabled onClick={action('clicked')}>
      Disabled ${compoName}
    </${compoName}>
  ));
export default { title: '${compoName}', compo: ${compoName}, }; 
const Template = (args) => <${compoName} {...args} />; 
export const Basic = Template.bind({}); 
export const WithProps = Template.bind({}); 
WithProps.args = { text: 'Custom Text' };`;
