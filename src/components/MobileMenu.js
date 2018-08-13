import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import LinkWrapper from './LinkWrapper';
import { FormattedMessage } from 'react-intl';

class MobileMenu extends React.Component {
  static propTypes = {
    isMenuOpen: React.PropTypes.bool.isRequired,
    onClickCloseBtn: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="transition"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
        {
          this.props.isMenuOpen &&
          <nav
            className={classnames('MobileMenu', this.props.className)}
            key="MobileMenu">
            <div 
              className="MobileMenu-closeBtn"
              onClick={this.props.onClickCloseBtn}>
              <div className="MobileMenu-closeIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17">
                  <g fill="#333333" fillRule="evenodd">
                    <path d="M0.387104431,2.1977646 L14.5522354,16.3628956 C14.9364097,16.7470699 15.4852814,16.8210678 15.7781746,16.5281746 C16.0710678,16.2352814 15.9970699,15.6864097 15.6128956,15.3022354 L1.4477646,1.13710443 C1.0635903,0.752930128 0.514718626,0.678932188 0.221825407,0.971825407 C-0.0710678119,1.26471863 0.00293012774,1.8135903 0.387104431,2.1977646 Z"/>
                    <path d="M1.4477646,16.3628956 L15.6128956,2.1977646 C15.9970699,1.8135903 16.0710678,1.26471863 15.7781746,0.971825407 C15.4852814,0.678932188 14.9364097,0.752930128 14.5522354,1.13710443 L0.387104431,15.3022354 C0.00293012774,15.6864097 -0.0710678119,16.2352814 0.221825407,16.5281746 C0.514718626,16.8210678 1.0635903,16.7470699 1.4477646,16.3628956 Z"/>
                  </g>
                </svg>
              </div>
            </div>
            {
              [
                {
                  title: <FormattedMessage id="MobileMenu.homeTtile"/>,
                  description: <FormattedMessage id="MobileMenu.homeDescription"/>,
                  to: '/'
                },
                {
                  title: <FormattedMessage id="MobileMenu.projectTtile"/>,
                  description: <FormattedMessage id="MobileMenu.projectDescription"/>,
                  to: '/projects'
                },
                {
                  title: <FormattedMessage id="MobileMenu.contactTtile"/>,
                  description: <FormattedMessage id="MobileMenu.contactDescription"/>,
                  to: '/contact'
                }
              ].map(({ title, description, to }, idx) => (
                <div 
                  className="MobileMenu-item"
                  key={idx}>
                  <LinkWrapper
                    to={to}
                    className="MobileMenu-itemLink"
                    key={idx}
                    onClick={this._onClickItemLink}>
                    <h4 className="MobileMenu-itemTitle">
                      {title}
                    </h4>
                    <div className="MobileMenu-itemDescription">
                      {description}
                    </div>
                  </LinkWrapper>
                </div>
              ))
            }
          </nav>
        }
      </ReactCSSTransitionGroup>
    );
  }

  _onClickItemLink = () => {
    this.props.onClickCloseBtn();
  };
}

export default MobileMenu;
