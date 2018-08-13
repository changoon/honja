import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import EventListener from 'fbjs/lib/EventListener';
import lodashThrottle from 'lodash/throttle';
import domHelperOffset from 'dom-helpers/query/offset';
import domHelperScrollTop from 'dom-helpers/query/scrollTop';
import domHelperQuerySelectorAll from 'dom-helpers/query/querySelectorAll';

import LinkWrapper from './LinkWrapper';

class FixedHeader extends React.Component {
  static propTypes = {
    targetClass: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.node
  };

  state = {
    style: {}
  };

  render() {
    return (
      <header 
        className={classnames('FixedHeader', this.props.className)}
        style={this.state.style}>
        <div className="FixedHeader-left">
          <LinkWrapper
            className="FixedHeader-logoLink"
            to={`/`}>
            <FormattedMessage id="FixedHeader.logo"/>
          </LinkWrapper>
          {
            this.props.subtitle &&
            <div className="FixedHeader-splitter"/>
          }
          {
            this.props.subtitle &&
            <div className="FixedHeader-subtitle">
              {this.props.subtitle}
            </div>
          }
        </div>
        <div className="FixedHeader-right">
          <LinkWrapper
            className="FixedHeader-projectLink"
            to={`/projects`}>
            <FormattedMessage id="FixedHeader.project"/>
          </LinkWrapper>
          <LinkWrapper
            className="FixedHeader-contactLink"
            to={`/contact`}>
            <FormattedMessage id="FixedHeader.contact"/>
          </LinkWrapper>
        </div>
      </header>
    );
  }

  componentDidMount() {
    this._scrolling = false;

    this._targetNode = domHelperQuerySelectorAll(document, `.${this.props.targetClass}`)[0];

    this._attachScrollListener();
  }

  componentWillUnmount() {
    this._detachScrollListener();
  }

  _attachScrollListener = () => {
    this._scrollListener = EventListener.listen(window, 'scroll', this._onScrollOrResize);
    this._resizeListener = EventListener.listen(window, 'resize', lodashThrottle(this._onScrollOrResize, 50));

    this._onScrollOrResize();
  };

  _detachScrollListener = () => {
    if (this._scrollListener) {
      this._scrollListener.remove();
      this._scrollListener = null;
    }
    if (this._resizeListener) {
      this._resizeListener.remove();
      this._resizeListener = null;
    }
  };

  _onScrollOrResize = () => {
    this._updateStyles();

    if (!this._scrolling) {
      this._scrolling = true;
    }

    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
      this._scrollTimeout = null;
    }

    this._scrollTimeout = setTimeout(() => {
      this._scrolling = false;
    }, 100);
  };

  _updateStyles = () => {
    const scrollTop = domHelperScrollTop(window);

    const { 
      top: targetTop,
      height: targetHeight
    } = domHelperOffset(this._targetNode);

    const clipTop = targetTop - scrollTop;
    if (clipTop > 55) {
      this.setState({
        style: {
          display: 'none',
          clip: `rect(55px,auto,auto,auto)`
        }
      });
    } else if (clipTop < targetHeight * -1) {
      this.setState({
        style: {
          display: 'none',
          clip: `rect(${targetHeight * -1}px,auto,auto,auto)`
        }
      });
    } else {
      this.setState({
        style: {
          clip: `rect(${clipTop}px,auto,auto,auto)`
        }
      });
    }
  };
}

export default FixedHeader;
