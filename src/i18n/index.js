import { addLocaleData } from 'react-intl';
import koLocaleData from 'react-intl/locale-data/ko';
import enLocaleData from 'react-intl/locale-data/en';

// List of locales
import ko from './ko';
import en from './en';

export const i18nMap = {
  ko,
  en
};

export const DEFAULT_LOCALE = 'ko';

export function loadI18n(locale) {
  return i18nMap[i18nMap.hasOwnProperty(locale) ? locale : DEFAULT_LOCALE];
}

export function configureClientLocales() {
  return new Promise((resolve, reject) => {
    addLocaleData([
      ...koLocaleData,
      ...enLocaleData
    ]);
    
    if (!global.Intl) {
      console.log('global.Intl does not exist.');
      require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        'intl/locale-data/jsonp/ko.js'
      ], function (require) {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/ko.js');
        console.log('Polyfilled global.Intl.');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

export function detectBrowserLocale() {
  let locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
  locale = locale.replace(/-[a-zA-Z]{2}$/, '');
  return i18nMap.hasOwnProperty(locale) ? locale : DEFAULT_LOCALE;
}