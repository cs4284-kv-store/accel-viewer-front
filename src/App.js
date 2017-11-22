import React, { Component } from 'react';
import Sensor from './Sensor';

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

export class SensorList extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.renderComponents = this.renderComponents.bind(this)
    this.addSensorReading = this.addSensorReading.bind(this)
  }

  componentWillMount() {
    let ws = new WebSocket('ws://localhost:8080/')

    ws.onopen = () => {
      console.log('connected...')
    }

    ws.onmessage = (evt) => {
      let data = JSON.parse(evt.data)
      this.addSensorReading(data)
    }
  }

  addSensorReading(reading) {
    let id = reading.id
    delete reading.id

    reading.updated = Date.parse(reading.updated)
    let oldState = this.state[id];
    if(!oldState)
      oldState = []

    let newState = [reading, ...oldState]

    this.setState({
      ...this.state,
      [id]: newState
    })
    console.log(this.state)
  }

  renderComponents() {
    let keys = Object.keys(this.state)
    let listBody = keys.map(key => {
      let sensor = this.state[key]

      return (
        <Sensor key={key} id={key} sensor={sensor}/>
      )
    })

    return (<div>{listBody}</div>)
  }

  render() {
    return (<div className='sensor-list'>
      <h1>LIST OF COMPONENTS</h1>
      {this.renderComponents()}
    </div>)
  }
}
