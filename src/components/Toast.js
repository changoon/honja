import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

class Toast extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool,
    message: React.PropTypes.node,
    onClickCloseBtn: React.PropTypes.func
  };

  render() {
    return (
      <ReactCSSTransitionGroup
        className="Toast"
        component="div"
        transitionName="transition"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {
          this.props.show &&
          <div 
            className={classnames('Toast-content', this.props.className)}
            key="Toast"
            onClick={this.props.onClickCloseBtn}>
            <div className="Toast-message">
              {this.props.message}
            </div>
            <div className="Toast-closeBtn">
              <div className="Toast-closeIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                  <path fill="#FFFFFF" fillRule="evenodd" d="M7.3989096,6.54043023 L13.4696699,0.469669914 C13.7625631,0.176776695 14.2374369,0.176776695 14.5303301,0.469669914 C14.8232233,0.762563133 14.8232233,1.23743687 14.5303301,1.53033009 L8.45956977,7.6010904 L14.5303301,13.6718507 C14.8232233,13.9647439 14.8232233,14.4396177 14.5303301,14.7325109 C14.2374369,15.0254041 13.7625631,15.0254041 13.4696699,14.7325109 L7.3989096,8.66175057 L1.32814929,14.7325109 C1.03525607,15.0254041 0.560382334,15.0254041 0.267489115,14.7325109 C-0.0254041039,14.4396177 -0.0254041039,13.9647439 0.267489115,13.6718507 L6.33824943,7.6010904 L0.267489115,1.53033009 C-0.0254041039,1.23743687 -0.0254041039,0.762563133 0.267489115,0.469669914 C0.560382334,0.176776695 1.03525607,0.176776695 1.32814929,0.469669914 L7.3989096,6.54043023 Z"/>
                </svg>
              </div>
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default Toast;