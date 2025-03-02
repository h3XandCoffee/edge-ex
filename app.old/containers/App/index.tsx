/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { injectIntl } from "react-intl";

import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

//import Home from "./index";
//import About from "../../../pages/about";
//import Home from "../../../pages/home";
//import Login from "../../../pages/login";
//import Register from "../../../pages/register";
//import Features from "../../../pages/features";
//import Chart from "../../../pages/chart";
//import Protected from "../../../pages/protected";

import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import RegisterPage from '../RegisterPage/Loadable';
import ProtectedPage from '../ProtectedPage/Loadable';
import FeaturePage from '../FeaturePage/Loadable';
import LiveDepthPage from '../LiveDepthPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import ProtectedRoute from '../../components/ProtectedRoute';
/*
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/livechart" component={LiveDepthPage} />
        <ProtectedRoute path="/protected" component={ProtectedPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
*/

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

//export default function App() {
const App: React.FC<{ intl, children: React.ReactNode }> = ({ intl, children }) => {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <>
        <Header />
        <Home />
      </>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

export default injectIntl(App);
