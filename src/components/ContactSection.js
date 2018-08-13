import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import LinkWrapper from './LinkWrapper';

import Footer from './Footer.js';
import FixedHeader from './FixedHeader';

class ContactSection extends React.Component {
  render() {
    return (
      <section className={classnames('ContactSection', this.props.className)}>
        <FixedHeader
          className="ContactSection-fixedHeader"
          targetClass="ContactSection"
          subtitle={<FormattedMessage id="ContactSection.headerSubtitle"/>}
        />
        <div className="ContactSection-content">
          <h3 className="ContactSection-title">
            <FormattedMessage id="ContactSection.title"/>
          </h3>
          <div className="ContactSection-description">
            <FormattedMessage id="ContactSection.description"/>
          </div>
          <LinkWrapper 
            className="ContactSection-askLink"
            to="/contact">
            <FormattedMessage id="ContactSection.ask"/>
          </LinkWrapper>
          <Footer
            className="ContactSection-footer"
          />
        </div>
      </section>
    );
  }
}

export default ContactSection;
