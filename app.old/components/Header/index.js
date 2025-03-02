import React from 'react';
import { injectIntl } from 'react-intl';

import A from '../A';
import Img from '../Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
//import messages from './messages';
import SidePanel from '../SidePanel';

const Header = ({ intl }) => {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink href="/">
          {intl.formatMessage(app.home)}
        </HeaderLink>
        <HeaderLink href="/features">
          {intl.formatMessage(app.features)}
        </HeaderLink>
        <HeaderLink href="/livechart">
          {intl.formatMessage(app.livechart)}
        </HeaderLink>
      </NavBar>
      <SidePanel></SidePanel>
    </div>
  );

/*
  const MyComponent = ({ intl }) => (
      <span>{intl.formatMessage({ id: "app.hello", defaultMessage: "Hello, World!" })}</span>
    );  
  export default injectIntl(MyComponent); 
*/
}

export default injectIntl(Header);
