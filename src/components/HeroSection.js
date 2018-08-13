import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

import FixedHeader from './FixedHeader';

class HeroSection extends React.Component {
  render() {
    return (
      <section className={classnames('HeroSection', this.props.className)}>
        <FixedHeader
          className="HeroSection-fixedHeader"
          targetClass="HeroSection"
        />
        <div className="HeroSection-bg"/>
        <div id="HeroSection-particleJS" className="HeroSection-particleJS"/>
        <h1 className="HeroSection-title">
          <FormattedMessage id="HeroSection.title"/>
        </h1>
      </section>
    );
  }

  componentDidMount() {
    window.particlesJS.load('HeroSection-particleJS', {
      "particles": {
        "number": {
          "value": 50,
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
          "value": 0.18939543399174544,
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
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 0.7,
          "direction": "none",
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

export default HeroSection;