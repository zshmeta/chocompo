# CompoMerci
* ... by zshmeta
  
  ## Volia Voila

 Ce fichier permet de créer un composant React personnalisé.
 Il vous suffit de fournir le nom du composant, le type de composant (Styled Component ou Module.scss Component),
 si vous souhaitez créer des unités de test pour le composant, si vous souhaitez créer un fichier lazyjs pour le composant,
 si vous souhaitez créer un fichier story avec le composant et le chemin d'enregistrement du composant.

 Importez les modules nécessaires.
`const fs = require('fs');`
`const path = require('path');`
`const chalk = require('chalk');`
`const readline = require('readline-sync');`

 Demandez à l'utilisateur le type de composant qu'il souhaite créer.
`const componentTypeOptions = ['Button', 'TextInput', 'Modal', 'None'];`
`const componentTypeIndex = readline.keyInSelect(componentTypeOptions, 'Quel typede composant souhaitez-vous créer ?')`;
`const componentType = componentTypeOptions[componentTypeIndex];`

 Demandez à l'utilisateur s'il souhaite utiliser un composant stylé ou un composant module.scss.
`const componentStyleOptions = ['Styled Component', 'Module.scss Component'];`
`const componentStyleIndex = readline.keyInSelect(componentStyleOptions, 'Voulez-vous utiliser un composant stylé ou un composant module.scss ?');`
`const componentStyle = componentStyleOptions[componentStyleIndex];`

 Demandez à l'utilisateur s'il souhaite créer des unités de test pour son composant.
`const createTestOptions = ['Yes', 'No'];`
`const createTestIndex = readline.keyInSelect(createTestOptions, 'Voulez-vous créer des unités de test pour votre composant ?');`
`const createTest = createTestOptions[createTestIndex];`

 Demandez à l'utilisateur s'il souhaite créer un fichier lazyjs pour son composant.
`const lazyOptions = ['Yes', 'No'];`
`const lazyIndex = readline.keyInSelect(lazyOptions, 'Voulez-vous créer un fichier lazyjs pour votre composant ?');`
`const lazy = lazyOptions[lazyIndex];`

 Demandez à l'utilisateur s'il souhaite créer un fichier story avec son composant.
`const storyOptions = ['Yes', 'No'];`
`const storyIndex = readline.keyInSelect(storyOptions, 'Voulez-vous créer un fichier story avec votre composant ?');`
`const story = storyOptions[storyIndex];`

 Définissez le chemin d'enregistrement par défaut.
`const savePathDefault = 'src/components';`

 Définissez le nom du composant par défaut.
`const componentNameDefault = \`compo${Math.floor(Math.random() * 100)}\``;

 Demandez à l'utilisateur où il souhaite enregistrer le composant ou utilisez le chemin d'enregistrement par défaut.
`const savePath = readline.question('Où souhaitez-vous enregistrer le composant(par défaut : ' + savePathDefault + ') ?') || savePathDefault;`

 Demandez à l'utilisateur le nom du composant ou utilisez le nom par défaut.
`const componentName = readline.question('Quel nom souhaitez-vous donner au composant (par défaut : ' + componentNameDefault + ') ?') || componentNameDefault;`

 Créez le dossier et les fichiers du composant.
`const createComponent = (componentName, componentStyle, createTest, lazy, story,savePath) => {
  const componentPath = path.join(savePath, componentName);
  fs.mkdirSync(componentPath);`

   Créez le fichier JS du composant.
  `const componentJS = import React from 'react';
  ${componentStyle === "Styled Component" ? import { ${componentName}Wrapper } from './${componentName}.styled'; : import styles from './${componentName}.module.scss';}
  const ${componentName} = ({ text }) => {
    return (
      <${componentStyle === "Styled Component" ? ${componentName}Wrapper : div className={styles.${componentName}}}>
        {text || 'Default Text'}
      );
  };
  export default ${componentName};;
  fs.writeFileSync(
    path.join(componentPath, ${componentName}.jsx),
    componentJS,......
 `


 #### Conclusion

 Unfortunatly i found myself in a situation where creating my own component seemed like a good idea...

We take the positive now that it's done i will host it on github action so i can call it whenever i want wherever i want


 Malheureusement je me suis retrouvee dans une situation ou creer mes propre composant semblait une bonne idee...

 On retient le positif maintenant que c'est fait je vais hoster sa sur github action pour pouvoir l'appelez quand je veux ou je veux


[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=zshmeta&repo=compomerci)](https://github.com/zshmeta/compomerci)


/*
Copyright (c) 2023, [Your Name]. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
generated with Bard
*/
