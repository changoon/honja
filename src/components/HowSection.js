import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Waypoint from 'react-waypoint';

import FixedHeader from './FixedHeader';

import step1Img from '../images/HowSection-step1.jpg';
import step2Img from '../images/HowSection-step2.jpg';
import step3Img from '../images/HowSection-step3.jpg';

class HowSection extends React.Component {
  state = {
    appears: [
      false,
      false,
      false
    ]
  };

  render() {
    return (
      <section className={classnames('HowSection', this.props.className)}>
        {
          [
            {
              title: <FormattedMessage id="HowSection.step1title"/>,
              description: <FormattedMessage id="HowSection.step1description"/>,
              header: <FormattedMessage id="HowSection.step1headerSubtitle"/>,
              img: step1Img
            },
            {
              title: <FormattedMessage id="HowSection.step2title"/>,
              description: <FormattedMessage id="HowSection.step2description"/>,
              header: <FormattedMessage id="HowSection.step2headerSubtitle"/>,
              img: step2Img
            },
            {
              title: <FormattedMessage id="HowSection.step3title"/>,
              description: <FormattedMessage id="HowSection.step3description"/>,
              header: <FormattedMessage id="HowSection.step3headerSubtitle"/>,
              img: step3Img
            }
          ].map(({ title, description, header, img }, idx) => (
            <div
              className={classnames('HowSection-stepContainer', `HowSection-stepContainer${idx+1}`)}
              key={idx}
              data-depth={idx * 0.2}>
              <Waypoint
                onPositionChange={this._onPositionChange.bind(this, idx)}
                bottomOffset="100px"
              />
              <div
                className={classnames('HowSection-bg', {
                  appear: this.state.appears[idx]
                })}
                style={{
                  backgroundImage: `url(${img})`
                }}
              />
              <FixedHeader
                className="HowSection-fixedHeader"
                targetClass={`HowSection-stepContainer${idx+1}`}
                subtitle={header}
              />
              {
                idx === 2 &&
                <div id="HowSection-particleJS" className="HowSection-particleJS"/>
              }
              <div className="HowSection-stepContent">
                <div className="HowSection-stepNumber">
                  {idx + 1}
                </div>
                <h3 className="HowSection-stepTitle">
                  {title}
                </h3>
                <div className="HowSection-stepDescription">
                  {description}
                </div>
              </div>
            </div>
          ))
        }
      </section>
    );
  }

  componentDidMount() {
    window.particlesJS.load('HowSection-particleJS', {
      "particles": {
        "number": {
          "value": 5,
          "density": {
            "enable": false,
            "value_area": 100
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 2000,
          "color": "#ffffff",
          "opacity": 1,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "bounce",
          "bounce": true,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 71.92807192807193,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  componentWillUnmount() {
    try {
      if (window.pJSDom instanceof Array && window.pJSDom.length > 0) {
        window.pJSDom
          .map(element => element.pJS.fn.vendors)
          .forEach(vendors => {
            vendors.destroypJS();
          });
        window.pJSDom = [];
      }      
    } catch (err) {}
  }

  _onPositionChange = (idx, { currentPosition }) => {
    const appears = [...this.state.appears];

    if (currentPosition === 'above' || currentPosition === 'inside') {
      appears[idx] = true;
    } else if (currentPosition === 'below') {
      appears[idx] = false;
    }

    this.setState({
      appears
    });
  };
}

export default HowSection;
