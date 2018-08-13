import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

class Footer extends React.Component {
  render() {
    return (
      <footer className={classnames('Footer', this.props.className)}>
        <div className="Footer-content">
          {
            [
              {
                title: <FormattedMessage id="Footer.contactTitle"/>,
                line1: <FormattedMessage id="Footer.contactAddress"/>,
                line2: null
              },
              {
                title: <FormattedMessage id="Footer.contactTitleUS"/>,
                line1: <FormattedMessage id="Footer.contactAddressUS"/>,
                line2: null
              },
              {
                title: <FormattedMessage id="Footer.contact"/>,
                line1: (
                  <a
                    className="Footer-emailLink" 
                    href="mailto:charles@LJPLUS.co.kr">
                    {`charles@LJPLUS.co.kr`}
                  </a>
                ),
                line2: <FormattedMessage id="Footer.copyright"/>
              }
            ].map(({ title, line1, line2 }, idx) => (
              <div 
                className="Footer-contact"
                key={idx}>
                <div className="Footer-contactTitle">
                  {title}
                </div>
                <div className="Footer-line1">
                  {line1}
                </div>
                <div className="Footer-line2">
                  {line2}
                </div>
              </div>
            ))
          }
        </div>
      </footer>
    );
  }
}

export default Footer;
