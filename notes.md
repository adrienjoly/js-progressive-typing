# Prévenir les bugs sans tout migrer en TypeScript, grâce à TSDoc et type stripping

On a tous vécu ce moment d’embarras (et parfois de rage) quand notre code JavaScript plante en production à cause d’une variable, d’un paramètre ou d’une propriété undefined. D’un cas qu’on avait pas prévu !

Les réponses classiques pour réduire ce risque sont la migration vers TypeScript et l’écriture de tests automatisés de diverses sortes: unitaires, composants, intégration, end-to-end… Saviez-vous qu’en maîtrisant l’art du type checking on pouvait non seulement réduire le besoin en tests, et qu’il n’y a même pas besoin de migrer toute sa codebase en TypeScript pour en bénéficier ?

Dans ce talk, nous verrons ensemble:

- comment aider notre IDE (vscode) à trouver plus d’erreurs de types dans nos fichiers JS, grâce à TSDoc et un peu de configuration
- plusieurs exemples de cas où un test automatisé est rendu inutile grâce à l’emploi astucieux de la validation de types, ex: type guards, validation d’exhaustivité sur les blocks switch, l’usage de unknown au lieu de any, etc…

## CFP

- [Détecter les bugs depuis son IDE: TSDoc et autres recettes pratiques · Issue #228 · parisjs/talks](https://github.com/parisjs/talks/issues/228)
- [Détecter les bugs depuis son IDE: TSDoc et autres recettes pratiques · Issue #68 · ParisTypeScript/talks](https://github.com/ParisTypeScript/talks/issues/68)

## Slides

WIP: [Détecter les bugs depuis son IDE: TSDoc et autres recettes pratiques - Google Slides](https://docs.google.com/presentation/d/1IiDmJ_rWsdvczRHhJUZubABJF89_-sEcaGvARVnAcy0/edit#slide=id.g328fe9c0464_0_28)

Code, WIP: [adrienjoly/js-progressive-typing: code for an upcoming meetup talk](https://github.com/adrienjoly/js-progressive-typing)

## Points à traiter

- intro
    - probleme: exemples de bugs
        - `TypeError: Cannot read property 'name' of undefined`
        - `ReferenceError: myVar is not defined`
        - `NaN` (manipulation de valeurs avec type implicites)
        - `Uncaught exception/rejection`
    - en quoi les tests aident
    - en quoi typescript aide, en mieux
    - raisons de pas vouloir tout migrer en TypeScript
- type checking sans transpilation
    - new in nodejs: (avant node 23: `NODE_OPTIONS="--experimental-strip-types"`), à condition de respecter [certaines limites](https://x.com/Neolectron/status/1878190304014049728)
    - jsdoc/tsdoc => type checking dans VSCode, avec `@typedef`, `@param`, `@return`, `@type`... (ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
    - possibilité de migration progressive avec `// @ts-check` (avant imports!)
    - `@ts-ignore` vs `@ts-expect-error`
    - ...et vous pouvez toujours créer des types dans des fichiers TS !
    - `npx tsc --noEmit --allowJS **/*.js` ou  `npx tsc --project tsconfig.json`
- exemples de patterns (en TS+TSDoc)
    - [x] exhaustive match dans switch
    - [x] bases: `any` VS `unknown`
    - [x] settings typescript importants, dans tsconfig.json ou [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig)
        - `strict` => `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`
        - [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)
        - `noImplicitThis`
        - `alwaysStrict` (=> `use strict`)
        - optim: `skipLibCheck`, `exclude` node_modules et build
        - et cf recoms de https://gils-blog.tayar.org/posts/jsdoc-typings-all-the-benefits-none-of-the-drawbacks/
        - et cheatsheet: [JSDoc as an alternative TypeScript syntax](https://alexharri.com/blog/jsdoc-as-an-alternative-typescript-syntax)
    - [ ] cas où un appel peut retourner `null` ou `undefined`, ex: `Cannot destructure property 'html' of 'undefined'`
    - [x] assertions de types: declaration VS cast VS hard cast VS satisfies
    - [x] type guards, cf [typescript-type-guard-function-using-jsdoc.js](https://gist.github.com/adrienjoly/779abbfd705f3b3a963af395cfa4a9b2) et [Type Guards in Javascript Using JSDoc Comments - goulet.dev](https://goulet.dev/posts/type-guard-in-jsdoc/)
- pour aller plus loin
    - survol de protections supplémentaires fournies par ESlint et ses plugings, ex: `@typescript-eslint/no-floating-promises`, `jsdoc/valid-types` + `overrides` pour migrer progressivement
    - et, pour aller plus loin: validation avec zod, cf [Types at the edges of your system | Understand Legacy Code](https://understandlegacycode.com/typing-the-edges/)
    - bonus: [Total TypeScript - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)

## Etapes du live coding

- `dispatchOrder.js` et `getProvider.js` => que se passe t-il si on ajoute un provider dans le front mais qu'on oublie de l'intégrer dans ce switch côté back ?
- rename all files to TS + update imports => `node dispatchOrder.ts` works but VSCode shows `'provider' is possibly 'undefined'` error
- ... but ordering sushi from front leads still leads to a error 500! => let's define a contract between back and front 

## Idée générique

Can you generate the opening credits of the "X Files" tv show, will the following changes in text:
- The X Files --> The JS Fails
- Paranormal activity --> Cannot read property 'name' of undefined
- starring David Duchovny --> Uncaught exception
- government denies knowledge --> ReferenceError: user is not defined
- Gillian Anderson --> ReferenceError: user is not defined
- created by chris carter --> "Let's add a try-catch block..."

## App sequence diagram

Made with https://sequencediagram.org/:

```mermaid
title An app to order food

participant BFF API
participant OrdersAPI
participant FoodProviders
participant DeliveryAPI

BFF API->OrdersAPI:dispatchOrder('pizza', '168 rue S. Maur')
activate OrdersAPI
OrdersAPI->FoodProviders:getProvider('pizza')
activate FoodProviders
OrdersAPI<--FoodProviders:provider
deactivate FoodProviders
OrdersAPI->DeliveryAPI:sendOrder(provider.phoneNumber, customerAddress);
activate DeliveryAPI
OrdersAPI<--DeliveryAPI:order
deactivate DeliveryAPI
BFF API<--OrdersAPI:orderConfirmation
```
