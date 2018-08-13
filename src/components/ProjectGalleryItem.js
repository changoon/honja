import React from 'react';
import classnames from 'classnames';
import Waypoint from 'react-waypoint';

class ProjectGalleryItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    url: React.PropTypes.string,
    img: React.PropTypes.node
  };

  state = {
    appear: false
  };

  render() {
    return (
      <a 
        className={classnames('ProjectGalleryItem', this.props.className, {
          appear: this.state.appear
        })}
        href={this.props.url}
        target="_blank">
        <Waypoint
          onPositionChange={this._onPositionChange}
        />
        <div className="ProjectGalleryItem-itemImageWrapper">
          <img
            className="ProjectGalleryItem-itemImage"
            src={this.props.img}
            alt={this.props.title}
          />
        </div>
        <div className="ProjectGalleryItem-itemLabels">
          <div className="ProjectGalleryItem-itemTitle">
            {this.props.title}
          </div>
          <div className="ProjectGalleryItem-itemSubtitle">
            {this.props.subtitle}
          </div>
        </div>
      </a>
    )
  };

  _onPositionChange = ({ previousPosition, currentPosition }) => {
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

export default ProjectGalleryItem;