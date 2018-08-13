import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';

import polyfillParticles from './utils/polyfillParticles';
polyfillParticles();

import App from './components/App';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './components/NotFoundPage';

import './index.css';

// Localization
import { loadI18n, configureClientLocales, detectBrowserLocale } from './i18n';

async function startClient() {
  await configureClientLocales();
  
  const locale = detectBrowserLocale();

  const onUpdateRoute = () => {
    window.scrollTo(0, 0);
  };

  ReactDOM.render(
    <IntlProvider
      locale={locale}
      messages={loadI18n(locale)}>
      <Router 
        history={browserHistory}
        onUpdate={onUpdateRoute}>
        <Route path="/" component={App}>
          <IndexRoute component={HomePage} />
          <Route path="projects" component={ProjectsPage}/>
          <Route path="contact" component={ContactPage}/>
          <Route path="*" component={NotFoundPage}/>
        </Route>
      </Router>
    </IntlProvider>,
    document.getElementById('root')
  );
}

startClient();