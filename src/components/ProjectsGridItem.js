import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Waypoint from 'react-waypoint';

import FixedHeader from './FixedHeader';

class ProjectsGridItem extends React.Component {
  static propTypes = {
    idx: React.PropTypes.number,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    description: React.PropTypes.string,
    url: React.PropTypes.string,
    img: React.PropTypes.node,
    onEnter: React.PropTypes.func,
    onLeave: React.PropTypes.func
  };

  render() {
    return (
      <div className={classnames('ProjectsGridItem', `ProjectsGridItem-${this.props.idx}`, this.props.className)}>
        <FixedHeader
          className="ProjectsGridItem-fixedHeader"
          targetClass={`ProjectsGridItem-${this.props.idx}`}
          subtitle={<FormattedMessage id="ProjectsGridItem.header"/>}
        />
        <div
          className="ProjectsGridItem-image"
          style={{
            backgroundImage: `url(${this.props.img})`
          }}
        />
        <div className="ProjectsGridItem-content">
          <Waypoint
            onEnter={this._handleWaypointEnter}
            onLeave={this._handleWaypointLeave}
          />
          <div className="ProjectsGridItem-subtitle">{this.props.subtitle}</div>
          <h4 className="ProjectsGridItem-title">{this.props.title}</h4>
          <div className="ProjectsGridItem-description">{this.props.description}</div>
          <a
             className="ProjectsGridItem-link"
             href={this.props.url}
             target="_blank">
            <FormattedMessage id="ProjectsGridItem.link"/>
          </a>
        </div>
      </div>
    )
  };

  _handleWaypointEnter = ({ previousPosition, currentPosition, event }) => {
    if ((previousPosition === 'below' || typeof previousPosition === 'undefined') && currentPosition === 'inside') {
      this.props.onEnter();
    }
  };

  _handleWaypointLeave = ({ previousPosition, currentPosition, event }) => {
    if (this.props.idx > 0 && previousPosition === 'inside' && currentPosition === 'below') {
      this.props.onLeave();
    }
  };
}

export default ProjectsGridItem;
