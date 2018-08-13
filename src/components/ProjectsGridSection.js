import React from 'react';
import classnames from 'classnames';

import ProjectsGridItem from './ProjectsGridItem';
import data from '../data/projects';

class ProjectsGridSection extends React.Component {
  state = {
    backgroundColor: data[0].bgColor
  };

  render() {
    return (
      <section
        className={classnames('ProjectsGridSection', this.props.className)}>
        <div
          className="ProjectsGridSection-bg"
          style={{
            backgroundColor: this.state.backgroundColor
          }}
        />
        {
          data.map((item, idx) => (
            <ProjectsGridItem
              key={idx}
              idx={idx}
              {...item}
              onEnter={this._onEnter.bind(this, idx)}
              onLeave={this._onLeave.bind(this, idx)}
            />
          ))
        }
      </section>
    )
  };

  _onEnter = (idx) => {
    this.setState({
      backgroundColor: data[idx].bgColor
    });
  };

  _onLeave = (idx) => {
    this.setState({
      backgroundColor: data[idx - 1].bgColor
    }); 
  };
}

export default ProjectsGridSection;
