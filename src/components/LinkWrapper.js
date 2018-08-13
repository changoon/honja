import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import smoothScroll from 'smooth-scroll';

class LinkWrapper extends React.Component {
  static contextTypes = {
    pathname: React.PropTypes.string
  };

  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    onClick: React.PropTypes.func
  };

  render() {
    // eslint-disable-next-line
    const { className, children, onClick, ...others } = this.props;
    return (
      <Link
        className={classnames('LinkWrapper', className)}
        {...others}
        onClick={this._onClickLink}>
        {children}
      </Link>
    )
  };

  _onClickLink = evt => {
    if (this.props.to === this.context.pathname) {
      evt.preventDefault();
      smoothScroll.animateScroll(0);
    }

    const { onClick } = this.props;
    if (onClick && typeof(onClick) === 'function') {
      onClick(evt);
    }
  };
}

export default LinkWrapper;
