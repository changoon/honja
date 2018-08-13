import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

import FixedHeader from './FixedHeader';
import ProjectGalleryItem from './ProjectGalleryItem';
import data from '../data/projects';

class ProjectsGallery extends React.Component {
  render() {
    const leftData = data.filter((_, idx) => idx % 2 === 0);
    const rightData = data.filter((_, idx) => idx % 2 === 1);
    return (
      <section 
        className={classnames('ProjectsGallery', this.props.className)}
        id="ProjectsGallery">
        <FixedHeader
          className="ProjectsGallery-fixedHeader"
          targetClass="ProjectsGallery"
          subtitle={<FormattedMessage id="ProjectsGallery.title"/>}
        />
        <div className="ProjectsGallery-content">
          <div className="ProjectsGallery-items">
            <div className="ProjectsGallery-left">
              {leftData.map((itemData, idx, arr) => (
                <ProjectGalleryItem
                  className="ProjectsGallery-item"
                  key={idx}
                  {...itemData}
                />
              ))}
            </div>
            <div className="ProjectsGallery-right">
              {rightData.map((itemData, idx, arr) => (
                <ProjectGalleryItem
                  className="ProjectsGallery-item"
                  key={idx}
                  {...itemData}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  };

  _getItemEl = ({ title, subtitle, url, img }) => (
    <div
      className="ProjectsGallery-item"
      key={url}>
      <div className="ProjectsGallery-itemImageWrapper">
        <img
          className="ProjectsGallery-itemImage"
          src={img}
          alt={title}
        />
      </div>
      <div className="ProjectsGallery-itemTitle">
        {title}
      </div>
      <div className="ProjectsGallery-itemSubtitle">
        {subtitle}
      </div>
    </div>
  )
}

export default ProjectsGallery;
