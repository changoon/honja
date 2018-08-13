import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Waypoint from 'react-waypoint';

import LinkWrapper from './LinkWrapper';
import FixedHeader from './FixedHeader';

class PortfolioSection extends React.Component {
  state = {
    appear: false
  };

  render() {
    return (
      <section className={classnames('PortfolioSection', this.props.className, {
        disappear: !this.state.appear
      })}>
        <FixedHeader
          className="PortfolioSection-fixedHeader"
          targetClass="PortfolioSection"
          subtitle={<FormattedMessage id="PortfolioSection.headerSubtitle"/>}
        />
        <div className="PortfolioSection-content">
          <div className="PortfolioSection-titleContainer">
            <h3 className="PortfolioSection-title">
              <FormattedMessage id="PortfolioSection.title"/>
            </h3>
          </div>
          <div className="PortfolioSection-descriptionContainer">
            <div className="PortfolioSection-description">
              <FormattedMessage id="PortfolioSection.description"/>
            </div>
            <LinkWrapper
              className="PortfolioSection-projectLink"
              to={`/projects`}>
              <FormattedMessage id="PortfolioSection.viewProject"/>
            </LinkWrapper>
          </div>
        </div>
        <div className="PortfolioSection-screenshotContainer">
          <Waypoint
            onPositionChange={this._onPositionChange}
            bottomOffset="300px"
          />
          <figure className="PortfolioSection-screenshot1"/>
          <figure className="PortfolioSection-screenshot2"/>
          <figure className="PortfolioSection-screenshot3"/>
          <figure className="PortfolioSection-screenshot4"/>
          <figure className="PortfolioSection-screenshot5"/>
        </div>
      </section>
    );
  }

  _onPositionChange = ({ currentPosition }) => {
    if (currentPosition === 'above' || currentPosition === 'inside') {
      this.setState({
        appear: true
      });
    } else if (currentPosition === 'below') {
      this.setState({
        appear: false
      });
    }
  };
}

export default PortfolioSection;
