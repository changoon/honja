import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

import FixedHeader from './FixedHeader';

import designImg from '../images/AboutSection-design.jpg';
import engineeringImg from '../images/AboutSection-engineering.jpg';
import strategyImg from '../images/AboutSection-strategy.jpg';

class AboutSection extends React.Component {
  render() {
    return (
      <section className={classnames('AboutSection', this.props.className)}>
        <div className="AboutSection-content">
          <FixedHeader
            className="AboutSection-fixedHeader"
            targetClass="AboutSection"
            subtitle={<FormattedMessage id="AboutSection.headerSubtitle"/>}
          />
          <h3 className="AboutSection-title">
            <FormattedMessage id="AboutSection.title"/>
          </h3>
          <div className="AboutSection-cardContainer">
            {
              [
                {
                  title: <FormattedMessage id="AboutSection.designTitle"/>,
                  description: <FormattedMessage id="AboutSection.designDescription"/>,
                  img: designImg
                },
                {
                  title: <FormattedMessage id="AboutSection.engineeringTitle"/>,
                  description: <FormattedMessage id="AboutSection.engineeringDescription"/>,
                  img: engineeringImg
                },
                {
                  title: <FormattedMessage id="AboutSection.strategyTitle"/>,
                  description: <FormattedMessage id="AboutSection.strategyDescription"/>,
                  img: strategyImg
                },
              ].map(({ title, description, img, width, height }, idx) => (
                <div 
                  className="AboutSection-card"
                  key={idx}>
                  <figure
                    className="AboutSection-cardImg"
                    style={{
                      backgroundImage: `url(${img})`
                    }}
                  />
                  <div className="AboutSection-cardTitle">{title}</div>
                  <div className="AboutSection-cardDescription">{description}</div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    );
  }
}

export default AboutSection;
