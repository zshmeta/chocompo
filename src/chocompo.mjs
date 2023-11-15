#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';



const red = chalk.red;
const green = chalk.green;
const blue = chalk.blue;
const yellow = chalk.yellow;
const cyan = chalk.cyan;


const askQuestionWithOptions = async (message, choices, allowCancel = true) => {
  if (allowCancel) {
    choices.push(red('Cancel'));
  }
  const { answer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message,
      choices,
    },
  ]);

  return choices.indexOf(answer);
};

// Questions to ask the user
const compoTypeOptions = ['Component', 'Layout', 'Page'];

const elementOptions = [
  'None',
  blue('Button'),
  yellow('Media'),
  green('Text'),
  cyan('Container'),
];

const compoStyleOptions = [blue('Styled Compo'), green('Scss Compo')];

const typeOptions = [yellow('No'), blue('Yes')];

const lazyOptions = [blue('Yes'), yellow('No')];

const storyOptions = [blue('Yes'), yellow('No')];

const createTestOptions = [blue('Yes'), yellow('No')];


// Check if the user wants to cancel the script
const checkForCancel = (index, options) => {
  return options[index] === red('Cancel');
};

// chocompo function to execute the script
async function chocompo() {
  let createAnotherComponent = true;
  while (createAnotherComponent) {
    // Ask questions and store the answers
    const compoTypeIndex = await askQuestionWithOptions(
      `What kind of Components would you like to create?`,
      compoTypeOptions.map((option) => {
        const colorMap = { Component: yellow, Layout: green, Page: blue };
        return colorMap[option](option);
      })
    );

    const compoType = compoTypeOptions[compoTypeIndex];

    if (checkForCancel(compoTypeIndex, compoTypeOptions)) {
      createAnotherComponent = false;
      break;
    }

    const typeIndex = await askQuestionWithOptions(
      `Would you like to include types for your ${compoType}? (Default: None)`,
      typeOptions
    );

    if (checkForCancel(typeIndex, typeOptions)) {
      createAnotherComponent = false;
      break;
    }
    const isTypeScript = typeOptions[typeIndex] === blue('Yes');

    if (compoType === 'Page') {
      compoStyleOptions.push(yellow('No Style'));
    }

    const compoStyleIndex = await askQuestionWithOptions(
      `Would you like to use a styled ${compoType} or a module.scss ${compoType}?`,
      compoStyleOptions
    ) 

    if (checkForCancel(compoStyleIndex, compoStyleOptions)) {
      createAnotherComponent = false;
      break;
    }

    if (compoStyleOptions === red('Cancel')) {
      createAnotherComponent = false;
      break;
    };

    const compoStyle = compoStyleOptions[compoStyleIndex];

    const elementIndex = await askQuestionWithOptions(
      `Would you like to add an element to your ${compoType}?`,
      elementOptions
    );

    const elementType = elementOptions[elementIndex];

    if (checkForCancel(elementIndex, elementOptions)) {
      createAnotherComponent = false;
      break;
    }

    let customElementName = '';

    if (elementType === 'Custom') {
      const { customName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'customName',
          message: `Please enter the name of the custom element:`,
        },
      ]);
      customElementName = customName;
    }

    const createTestIndex = await askQuestionWithOptions(
      `Would you like to create test units for your ${compoType}?`,
      createTestOptions
    );

    const createTest = createTestOptions[createTestIndex];

    // Set default savePath
    const savePathDefault = `./src/${compoType.toLowerCase()}s/`;

    // Set default compoName
    const componames = [
      'Azur',
      'Indigo',
      'Cyan',
      'Teal',
      'Lime',
      'Amber',
      'Purple',
      'DeepPurple',
      'Blue',
      'LightBlue',
        'Green',
    ];
    const compoNameDefault = `${componames[Math.floor(Math.random() * componames.length)]}${compoType}`;

    // Ask the user for the savePath and compoName
    const { savePath, compoName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'savePath',
        message: `Where would you like to save the ${compoType} (default: ${savePathDefault})?`,
        default: savePathDefault,
      },
      {
        type: 'input',
        name: 'compoName',
        message: `What would you like to name the ${compoType} (default: ${compoNameDefault})?`,
        default: compoNameDefault,
      },
    ]);

    // Create the compo folder and files
    const compomerci = (
      compoName,
      compoStyle,
      createTest,
      savePath
    ) => {
      const compoPath = path.join(savePath, compoName);
      fs.mkdirSync(compoPath, { recursive: true });

      // Create the compo JS file
      const compoJS = `
import React, { useState } from 'react';
${compoStyle === blue('Styled Compo') ? `import { ${compoName}Wrapper } from './${compoName}.styled';` : `import styles from './${compoName}.module.scss';`}

${isTypeScript ? `type ${compoName}Props = {
  ${elementType !== 'None' ? `${elementType.toLowerCase()}?: ${elementType === 'Custom' ? customElementName : 'React.ReactNode'};` : ''}
};` : ''}

const ${compoName}${isTypeScript ? `: React.FC<${compoName}Props>` : ''} = ({ ${elementType !== 'None' ? `${elementType.toLowerCase()},` : ''} ...props }) => {
  ${elementType === 'Button' ? ` const handleClick = () => {
    // Handle click events or other interactions here
    setCount(count + 1);
  };` : ''}

  return (
    <${compoStyle === blue('Styled Compo') ? `${compoName}Wrapper` : `div`} className={styles.${compoName}} {...props}>
      ${elementType === 'Button' ? `<button onClick={handleClick}>{${elementType.toLowerCase()} || 'Default Button'}</button>` : ''}
      ${elementType === 'Text' ? `<h1>{${elementType.toLowerCase()} || 'Hello'}</h1>
                                  <h3>{${elementType.toLowerCase()} || 'World'}</h3>
                                  <p>{${elementType.toLowerCase()} || 'Wesh le Monde'}</p>` : ''}
      ${elementType === 'Media' ? `<img src={https://cdn.zshmeta.dev/zshmetapunk.svg} || 'default-image.png'} alt="media" />` : ''}
      ${elementType === 'Input' ? `<input type="text" value={${elementType.toLowerCase()} || 'Default Input'} />` : ''}
    </${compoStyle === blue('Styled Compo') ? `${compoName}Wrapper` : `div`}>
  );
};
`;

  fs.writeFileSync(
    path.join(compoPath, `${compoName}.jsx`),
    compoJS
  );
      // Create the compo CSS file
  if (compoStyle === blue('Styled Compo')) {
  const compoCSS = `
import styled from 'styled-components';

export const ${compoName}Wrapper = styled.div\`
  display: block;
  padding: 10px;
  color: #fff;
  background-color: #000;
\``;
  fs.writeFileSync(
      path.join(compoPath, `${compoName}.styled.js`),
      compoCSS
    );
  } else {
  const compoSCSS = `
.${compoName} {
  display: block;
  padding: 10px;
  color: #fff;
  background-color: #000;
}
`;

  fs.writeFileSync(
      path.join(compoPath, `${compoName}.scoped.scss`),
      compoSCSS
    );
  }

      // Create the compo test file if (createTest) {
  if (createTest === blue('Yes')) {
  const compoTest = `
"// Import necessary functions from the testing library
import { render, screen } from '@testing-library/react';

// Import the component you want to test
import ${compoName} from './${compoName}';

// Group related tests using the describe function
describe('${compoName} ${compoType}', () => {
  // Test case: Check if the CompoName component renders correctly
  it('renders ${compoName} ${compoType}', async () => {
    // Render the ${compoName} ${compoType}
    render(<${compoName} />);

    // Check if the element is in the document
    expect(${compoName}Element).toBeInTheDocument();
  });

  // Test case: Check if a specific CSS class is applied to an element
  it('applies the correct CSS class to an element', async () => {
    // Render the ${compoName} ${compoType}
    render(<${compoName} />);

    // Find the element with the specified CSS class
    const cssClassElement = await screen.findByTestId('element-with-css-class');

    // Check if the element has the expected CSS class
    expect(cssClassElement).toHaveClass('expected-css-class');
  });

  // Test case: Renders without crashing
  test('renders without crashing', () => {
    render(<${compoName} />);
  });

  // Test case: Matches snapshot
  test('matches snapshot', () => {
    const { asFragment } = render(<${compoName} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Additional generic test case
  test('generic test case', () => {
    // Add your generic test implementation here
  });
});`;
  
  fs.writeFileSync(
      path.join(compoPath, `${compoName}.test.js`),
      compoTest
    );
  }

      // Create the compo index file
  const compoIndex = `
import ${compoName} from './${compoName}';

export { default } from './${compoName}'
`;

  fs.writeFileSync(path.join(compoPath, 'index.js'), compoIndex);
    // Create the compo README file
  const compoReadmeTemplate = `
# ${compoName}

*by zshmeta*

**${compoName}.README - A Quick Overview**

### What is this

(TODO: Write a brief description of the compo.)

## Why is This?

(TODO: Explain why this compo exists or its purpose in your project.)

## How is this?

(TODO: Describe how to use this compo or any relevant information about its implementation.)

#### A Word from the dev...

(TODO: Any personal notes from the developer about this compo.)

Special thanks goes to me, zshmeta. All rights reserved.
  `;

  fs.writeFileSync(
      path.join(compoPath, `${compoName}.Readme.md`),
      compoReadmeTemplate
    );
  };


    // Create the compo folder and files
    compomerci(
      compoName,
      compoStyle,
      createTest,
      savePath
    );


    console.log(chalk.yellow(`${compoType} ${compoName} created successfully!`));
    console.log(chalk.blue(`${compoType} saved to ${savePath}${compoName}`));
    // Ask the user if they want to create another component
    const { continueCreating } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueCreating',
        message: 'Do you want to create another component?',
      },
    ]);

    createAnotherComponent = continueCreating;
    if (!createAnotherComponent) {
      console.log(chalk.bgYellowBright('All done!'));
      console.log(chalk.bgRedBright('Happy'), chalk.bgGreenBright('Hacking!'));

      break;
    }
  }
}
// Export the chocompo function
export default chocompo;