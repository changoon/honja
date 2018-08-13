import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import LinkWrapper from './LinkWrapper';

import FixedHeader from './FixedHeader';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className={classnames('NotFoundPage', this.props.className)}>
        <FixedHeader
          className="NotFoundPage-fixedHeader"
          targetClass={`NotFoundPage`}
        />
        <div id="NotFoundPage-particleJS" className="NotFoundPage-particleJS"/>
        <div className="NotFoundPage-content">
          <h1 className="NotFoundPage-title">
            <FormattedMessage id="NotFoundPage.title"/>
          </h1>
          <div className="NotFoundPage-description">
            <FormattedMessage id="NotFoundPage.description"/>
          </div>
          <LinkWrapper
            className="NotFoundPage-goHomeLink"
            to="/">
            <FormattedMessage id="NotFoundPage.goHome"/>
          </LinkWrapper>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.particlesJS.load('NotFoundPage-particleJS', {
      "particles": {
        "number": {
          "value": 75,
          "density": {
            "enable": true,
            "value_area": 800
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
          "value": 0.15,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 2.5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.05,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 0.2,
          "direction": "right",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "bubble"
          },
          "onclick": {
            "enable": false,
            "mode": "repulse"
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
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
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
      "retina_detect": false
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
}

export default NotFoundPage;