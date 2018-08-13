import React from 'react';
import classnames from 'classnames';

import HeroSection from './HeroSection';
import PortfolioSection from './PortfolioSection';
import AboutSection from './AboutSection';
import HowSection from './HowSection';
import ContactSection from './ContactSection';

class HomePage extends React.Component {
  render() {
    return (
      <div className={classnames('HomePage', this.props.className)}>
        <HeroSection/>
        <PortfolioSection/>
        <AboutSection/>
        <HowSection/>
        <ContactSection/>
      </div>
    );
  }
}

export default HomePage;
