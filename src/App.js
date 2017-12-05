import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from './Sensor';
import actions from './actions';
import Graph from './Graph';

import { Container, Col, Row } from 'reactstrap'

//const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(actions.connect('ws://104.196.115.111/'))
  }

  componentWillUnmount() {
    this.props.dispatch(actions.disconnect())
  }

  render() {
    return (
        <Container style={{height: '100%'}}>
          <Row>
            <h1>Sensor Viewer</h1>
          </Row>
          <Row style={{height: 'calc(100% - 69px)'}}>
            <Col xs='2' sm='2' md='2' lg='2' xl='2'>
                <SensorList sensors={this.props.sensors}/>
            </Col>
            <Col xs='10' sm='10' md='10' lg='10' xl='10' style={{height: '100%'}}>
                <Graph sensors={this.props.sensors}/>
            </Col>
      </Row>
        </Container>
    )
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
          <Row>
            <Sensor key={key} id={key}/>
          </Row>
      )
    })

    return (<div>{listBody}</div>)
  }

  render() {
    return (<div className='sensor-list'>
      {this.renderSensors()}
    </div>)
  }
}
