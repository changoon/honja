import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import smoothScroll from 'smooth-scroll';

import FixedHeader from './FixedHeader';

class ProjectsHeroSection extends React.Component {
  render() {
    return (
      <section className={classnames('ProjectsHeroSection', this.props.className)}>
        <FixedHeader
          className="ProjectsHeroSection-fixedHeader"
          targetClass="ProjectsHeroSection"
        />
        <div className="ProjectsHeroSection-bg"/>
        <div className="ProjectsHeroSection-cloudBg"/>
        <div className="ProjectsHeroSection-content">
          <h1 className="ProjectsHeroSection-title">
            <FormattedMessage 
              id="ProjectsHeroSection.title"
              values={{
                name: <strong>{'LJ PLUS'}</strong>
              }}
            />
          </h1>
        </div>
        <div 
          className="ProjectsHeroSection-downArrowIcon"
          onClick={this._onClickDownArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="24" viewBox="0 0 46 24">
            <path fill="#333333" fillRule="evenodd" d="M698.53033,744.46967 C698.237437,744.176777 697.762563,744.176777 697.46967,744.46967 C697.176777,744.762563 697.176777,745.237437 697.46967,745.53033 L720,768.06066 L742.53033,745.53033 C742.823223,745.237437 742.823223,744.762563 742.53033,744.46967 C742.237437,744.176777 741.762563,744.176777 741.46967,744.46967 L720,765.93934 L698.53033,744.46967 Z" transform="translate(-697 -744)"/>
          </svg>
        </div>
      </section>
    )
  };

  _onClickDownArrow = () => {
    var anchor = document.querySelector('#ProjectsGallery');
    smoothScroll.animateScroll(anchor);
  };
}

export default ProjectsHeroSection;
