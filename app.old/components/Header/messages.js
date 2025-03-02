/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  livechart: {
    id: `${scope}.livechart`,
    defaultMessage: 'Live Chart',
  },
});

/*
const MyComponent = ({ intl }) => (
  <span>{intl.formatMessage({ id: "app.hello", defaultMessage: "Hello, World!" })}</span>
);
export default injectIntl(MyComponent);
*/
