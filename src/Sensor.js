import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from 'reactstrap';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import moment from 'moment'
import actions from './actions'

class Sensor extends Component {
  toggleSensor() {
    this.props.dispatch(actions.toggleSelected(this.props.id))
  }

  render() {
    let color = this.props.sensor.selected ? 'primary' : 'secondary'
    return <Button color={color} onClick={this.toggleSensor.bind(this)}>{this.props.id}</Button>
  }
}

function stateToProps(state, props) {
  return {
    sensor: state.sensorData[props.id]
  }
}
export default connect(stateToProps)(Sensor)
