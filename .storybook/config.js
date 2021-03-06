import { withInfo } from '@storybook/addon-info';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    name: 'RXJS Timeline',
    theme: themes.dark,
    showAddonPanel: false,
    addonPanelInRight: true,
  },
});

addDecorator(withInfo({ inline: true, header: false, source: true }));

const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
