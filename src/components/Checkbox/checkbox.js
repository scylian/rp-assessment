import React, { Component } from 'react';
import styles from './checkbox.module.scss';

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked
    }
  }

  toggle = (e) => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));

    this.props.updateCheckbox(this.props.name, !this.state.checked);
  }

  onChange = () => {}
  
  render() {
    return (
      <div className={styles.root} onClick={this.toggle}>
        <input type="checkbox" checked={this.state.checked} onChange={this.onChange}/>
        <label>{this.props.label}</label>
      </div>
    )
  }
}

export default Checkbox;