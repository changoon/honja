import React from 'react';
import classnames from 'classnames';

import ProjectsHeroSection from './ProjectsHeroSection';
// import ProjectsGridSection from './ProjectsGridSection';
import ProjectsGallery from './ProjectsGallery';
import ContactSection from './ContactSection';

class ProjectsPage extends React.Component {
  render() {
    return (
      <div className={classnames('ProjectsPage', this.props.className)}>
        <div className="ProjectsPage-background"/>
        <ProjectsHeroSection/>
        {/*<ProjectsGridSection/>*/}
        <ProjectsGallery/>
        <ContactSection
          className="ProjectsPage-contact"
        />
      </div>
    )
  };
}

export default ProjectsPage;
