import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import isEmail from 'validator/lib/isEmail';

import ButtonGroup from './ButtonGroup';
import config from '../aws/config.json';

window.AWS.config.update({
  region: config.REGION
});
window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.COGNITO.IDENTITY_POOL_ID
});

const lambda = new window.AWS.Lambda({
  region: config.REGION,
  apiVersion: '2015-03-31'
});

const SENDING_STATE = {
  IDLE: 'idle',
  SENDING: 'sending',
  SENT: 'sent'
};

const MAX_LENGTH = {
  name: 254,
  email: 254,
  message: 1000
};

const SERVICE_ITEMS = [
  { title: <FormattedMessage id="ContactInputSection.service1"/>, keyword: 'Online Store' },
  { title: <FormattedMessage id="ContactInputSection.service2"/>, keyword: 'Brand Website' },
  { title: <FormattedMessage id="ContactInputSection.service3"/>, keyword: 'Portfolio Website' },
  { title: <FormattedMessage id="ContactInputSection.service4"/>, keyword: 'Design' }
];

const INITIAL_STATE = {
  name: '',
  email: '',
  message: '',
  errorInputs: {},
  serviceItemValues: SERVICE_ITEMS.map(_ => false),
  sendingState: SENDING_STATE.IDLE
};

class ContactInputSection extends React.Component {
  static contextTypes = {
    showToast: React.PropTypes.func
  };

  state = INITIAL_STATE;

  render() {
    return (
      <form className={classnames('ContactInputSection', this.props.className, {
        [this.state.sendingState]: true
      })}>
        <div className="ContactInputSection-content">
          <h1 className="ContactInputSection-title">
            <FormattedMessage id="ContactInputSection.title"/>
          </h1>
          <fieldset className="ContactInputSection-fieldSet">
            <div className="ContactInputSection-nameInputContainer">
              <input
                className={classnames('ContactInputSection-nameInput', {
                  error: this.state.errorInputs.hasOwnProperty('name')
                })}
                type="text"
                name="name"
                placeholder={"Name"}
                autoCorrect="off"
                spellCheck="false"
                maxLength={MAX_LENGTH.name}
                value={this.state.name}
                onChange={this._onChangeInput.bind(this, 'name')}
              />
              <div className={classnames('ContactInputSection-nameInputError', {
                visible: this.state.errorInputs.hasOwnProperty('name')
              })}>
                <FormattedMessage id="ContactInputSection.nameError"/>
              </div>
            </div>
            <div className="ContactInputSection-emailInputContainer">
              <input
                className={classnames('ContactInputSection-emailInput', {
                  error: this.state.errorInputs.hasOwnProperty('email')
                })}
                type="email"
                name="email"
                placeholder={"Email address"}
                autoCorrect="off"
                spellCheck="false"
                maxLength={MAX_LENGTH.email}
                value={this.state.email}
                onChange={this._onChangeInput.bind(this, 'email')}
              />
              <div className={classnames('ContactInputSection-emailInputError', {
                visible: this.state.errorInputs.hasOwnProperty('email')
              })}>
                <FormattedMessage id="ContactInputSection.emailError"/>
              </div>
            </div>
            <div className="ContactInputSection-messageContainer">
              <textarea 
                className={classnames('ContactInputSection-messageInput', {
                  error: this.state.errorInputs.hasOwnProperty('message')
                })} 
                name="message"
                placeholder="Tell us about your project"
                autoComplete="off"
                maxLength={MAX_LENGTH.message}
                value={this.state.message}
                onChange={this._onChangeInput.bind(this, 'message')}
              />
              <div className={classnames('ContactInputSection-messageInputError', {
                visible: this.state.errorInputs.hasOwnProperty('message')
              })}>
                <FormattedMessage id="ContactInputSection.messageError"/>
              </div>
            </div>
            <div className="ContactInputSection-serviceButtonGroupTitle">
              <FormattedMessage id="ContactInputSection.serviceTitle"/>
            </div>
            <ButtonGroup
              className="ContactInputSection-serviceButtonGroup"
              items={SERVICE_ITEMS}
              values={this.state.serviceItemValues}
              onChange={this._onChangeServiceButtonGroup}
            />
            <button
              className="ButtonGroup-sendBtn"
              type="submit"
              onClick={this._onClickSendBtn}>
              <FormattedMessage id="ContactInputSection.send"/>
            </button>
          </fieldset>
          <div className="ContactInputSection-spinnerContainer">
            <div className="ContactInputSection-spinner">
              <div className="ContactInputSection-spinnerDone">
                <div className="ContactInputSection-spinnerCheck">
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="22" viewBox="0 0 31 22">
                    <path fill="#283157" fillRule="evenodd" d="M671.536443,405.719631 C670.829314,404.871077 669.568185,404.756429 668.719631,405.463557 C667.871077,406.170686 667.756429,407.431815 668.463557,408.280369 L679.865603,421.962824 L698.414214,403.414214 C699.195262,402.633165 699.195262,401.366835 698.414214,400.585786 C697.633165,399.804738 696.366835,399.804738 695.585786,400.585786 L680.134397,416.037176 L671.536443,405.719631 Z" transform="translate(-668 -400)"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="ContactInputSection-sendingStatusContainer">
              <div className="ContactInputSection-sent">
                <FormattedMessage 
                  id="ContactInputSection.messageSent"
                  values={{
                    email: <strong>{this.state.email}</strong>,
                    name: this.state.name
                  }}
                />
              </div>
              <div
                className="ContactInputSection-newMessage"
                onClick={this._onClickNewMessageBtn}>
                <FormattedMessage id="ContactInputSection.tryNewMessage"/>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  _onChangeServiceButtonGroup = values => {
    this.setState({
      serviceItemValues: values
    })
  };

  _onClickSendBtn = evt => {
    evt.preventDefault();

    // Validate inputs
    const errorInputs = {};
    if (this.state.name.length === 0 || this.state.name.length > MAX_LENGTH.name) {
      errorInputs.name = true;
    }
    if (this.state.email.length === 0 || this.state.email.length > MAX_LENGTH.email || !isEmail(this.state.email)) {
      errorInputs.email = true;
    }
    if (this.state.message.length === 0 || this.state.message.length > MAX_LENGTH.message) {
      errorInputs.message = true;
    }
    if (Object.keys(errorInputs).length > 0) {
      this.setState({
        errorInputs
      });
      return;
    }

    this.setState({
      sendingState: SENDING_STATE.SENDING
    });


    // create variable to hold data returned by the Lambda function
    lambda.invoke({
      FunctionName : config.LAMBDA.FUNCTION_NAME,
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
        lang: 'ko',
        services: SERVICE_ITEMS.filter((_, idx) => this.state.serviceItemValues[idx]).map(item => item.keyword)
      })
    }, (error, data) => {
      if (error) {
        this.setState({
          sendingState: SENDING_STATE.IDLE
        });
        this.context.showToast(
          <FormattedMessage id="ContactInputSection.failToSend"/>
        );
      } else {
        this.setState({
          sendingState: SENDING_STATE.SENT
        });
      }
    });
  };

  _onChangeInput = (input, evt) => {
    const errorInputs = {...this.state.errorInputs};
    delete errorInputs[input];

    this.setState({
      [input]: evt.target.value,
      errorInputs
    });
  };

  _onClickNewMessageBtn = () => {
    this.setState(INITIAL_STATE);
  };

}

export default ContactInputSection;
