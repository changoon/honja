import React from 'react';
import classnames from 'classnames';

import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';
import Toast from './Toast';

class App extends React.Component {
  static childContextTypes = {
    showToast: React.PropTypes.func,
    pathname: React.PropTypes.string
  };

  getChildContext() {
    return {
      showToast: this._showToast,
      pathname: this.props.location.pathname
    };
  }

  state = {
    isMenuOpen: false,
    showToast: false,
    toastMessage: ''
  }

  render() {
    return (
      <div className={classnames('App', this.props.className, {
        isMenuOpen: this.state.isMenuOpen
      })}>
        <MobileHeader
          onClickMenuBtn={this._onClickMenuBtn}
        />
        <div className="App-content">
          {this.props.children}
        </div>
        <MobileMenu
          isMenuOpen={this.state.isMenuOpen}
          onClickCloseBtn={this._onClickCloseBtn}
        />
        <Toast
          show={this.state.showToast}
          message={this.state.toastMessage}
          onClickCloseBtn={this._hideToast}
        />
      </div>
    );
  }

  _onClickMenuBtn = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  _onClickCloseBtn = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  _showToast = messageNode => {
    this.setState({
      showToast: true,
      toastMessage: messageNode
    });
    this._toastTimer = setTimeout(this._hideToast, 4500);
  };

  _hideToast = () => {
    clearTimeout(this._toastTimer);
    this.setState({
      showToast: false
    });
  };

}

export default App;