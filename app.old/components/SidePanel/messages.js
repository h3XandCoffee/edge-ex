/*
 * Side Panel Messages
 *
 * This contains all the text for the Side Panel component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.SidePanel';

export default defineMessages({
    button: {
      id: `${scope}.button`,
      defaultMessage: '☰',
    },
    toggleTheme: {
      id: `${scope}.toggleTheme`,
      defaultMessage: 'Toggle Theme',
    }
});
