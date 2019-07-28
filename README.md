<h1 align="center">rxjs-timeline</h1>

## Core characteristics

:rocket: React timeline built using hooks and rxjs. Check out the [demo](https://latorante.github.io/rxjs-timeline/).

- Built using hooks api
- Default styled-components using [Emotion](https://www.npmjs.com/package/emotion)
- Using [CSS Grid](https://caniuse.com/#feat=css-grid), let the browser do the work
- Preferment and clean code that subscribes and creates the piping only once

## Currently supported features

- [x] Draggable Timeline Items
- [x] Resizable Timeline Items

## Get started 👩‍🏫

You can install this library via NPM or YARN.

### NPM

```bash
npm i @latorante/rxjs-timeline
```

### YARN

```bash
yarn add @latorante/rxjs-timeline
```

## Usage

```javascript
// App.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div></div>;

ReactDOM.render(<App />, document.getElementById('root'));
```

## Props

| Properties | Types  | Default Value | Description          |
| ---------- | ------ | ------------- | -------------------- |
| name       | string | none          | Determines the name. |

## TODO

- [x] Add storybook
- [x] Add types
- [ ] Add date helpers
- [ ] Add data massagers
- [ ] Add callback props
- [ ] Add render
- [ ] Add arrows
- [ ] Add default props
- [ ] Add default class names for styling outside of this
- [ ] Add dependent children
- [x] Add emotion to style
- [ ] Add tests
- [ ] Publish to NPM

## Issues

Please, open an [issue](https://github.com/latorante/rxjs-timeline/issues) following one of the issues templates. I will do my best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/latorante/rxjs-timeline/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/latorante/rxjs-timeline/blob/master/LICENSE) for more information.
