import React from 'react';
import classnames from 'classnames';
import LinkWrapper from './LinkWrapper';
import { FormattedMessage } from 'react-intl';

class MobileHeader extends React.Component {
  static propTypes = {
    onClickMenuBtn: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <header className={classnames('MobileHeader', this.props.className)}>
        <div className="MobileHeader-left">
          <LinkWrapper
            className="MobileHeader-logoLink"
            to={`/`}>
            <FormattedMessage id="MobileHeader.logo"/>
          </LinkWrapper>
        </div>
        <div
          className="MobileHeader-menuBtn"
          onClick={this.props.onClickMenuBtn}>
          <div className="MobileHeader-menuIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16">
              <g fill="#FFFFFF" fillRule="evenodd">
                <path d="M1.05487805 1.75L21.445122 1.75C21.8896438 1.75 22.25 1.41421356 22.25 1 22.25.585786438 21.8896438.25 21.445122.25L1.05487805.25C.610356177.25.25.585786438.25 1 .25 1.41421356.610356177 1.75 1.05487805 1.75zM5.05487805 8.75L21.445122 8.75C21.8896438 8.75 22.25 8.41421356 22.25 8 22.25 7.58578644 21.8896438 7.25 21.445122 7.25L5.05487805 7.25C4.61035618 7.25 4.25 7.58578644 4.25 8 4.25 8.41421356 4.61035618 8.75 5.05487805 8.75zM3.05487805 15.75L21.445122 15.75C21.8896438 15.75 22.25 15.4142136 22.25 15 22.25 14.5857864 21.8896438 14.25 21.445122 14.25L3.05487805 14.25C2.61035618 14.25 2.25 14.5857864 2.25 15 2.25 15.4142136 2.61035618 15.75 3.05487805 15.75z"/>
              </g>
            </svg>
          </div>
        </div>
      </header>
    );
  }
}

export default MobileHeader;
