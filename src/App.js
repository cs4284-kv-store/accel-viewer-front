import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from './Sensor';
import actions from './actions';
import Graph from './Graph';

//const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(actions.connect('ws://localhost:8080/'))
  }

  componentWillUnmount() {
    this.props.dispatch(actions.disconnect())
  }

  render() {
    return <div><SensorList sensors={this.props.sensors}/><Graph sensors={this.props.sensors}/></div>
  }
}

function stateToProps(state) {
  return {
    sensors: state.sensorData,
    socket: state.socket
  }
}

export default connect(stateToProps)(App)





class SensorList extends Component {
  constructor(props) {
    super(props)

    this.renderSensors = this.renderSensors.bind(this)
  }

  renderSensors() {
    let sensors = this.props.sensors
    let keys = Object.keys(sensors)
    let listBody = keys.map(key => {
      return (
        <Sensor key={key} id={key}/>
      )
    })

    return (<div>{listBody}</div>)
  }

  render() {
    return (<div className='sensor-list'>
      <h1>LIST OF SENSORS</h1>
      {this.renderSensors()}
    </div>)
  }
}
