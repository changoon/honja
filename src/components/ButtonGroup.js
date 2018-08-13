import React from 'react';
import classnames from 'classnames';

class ButtonGroup extends React.Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.node
    })),
    values: React.PropTypes.arrayOf(React.PropTypes.bool),
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  render() {
    return (
      <div className={classnames('ButtonGroup', this.props.className)}>
        {
          this.props.items.map(({ title }, idx) => (
            <div 
              className="ButtonGroup-inputContainer"
              key={idx}>
              <label
                className={classnames('ButtonGroup-label', {
                  checked: this.props.values[idx]
                })}
                key={idx}>
                <input 
                  className="ButtonGroup-input"
                  type="checkbox"
                  checked={this.props.values[idx]}
                  onChange={this._onChangeInput.bind(this, idx)}
                />
                {title}
              </label>
            </div>
          ))
        }
      </div>
    );
  }

  _onChangeInput = (idx, evt) => {
    const values = [...this.props.values];
    values[idx] = !this.props.values[idx];
    this.props.onChange(values);
  };
}

export default ButtonGroup;
