import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import moment from 'moment'

export default class Sensor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.renderButton = this.renderButton.bind(this)
  }

  toggle() {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }

  avgData(data) {
    return data
      .filter(reading => reading.avg)
      .map(reading => ({x: reading.updated, y: reading.avg}))
  }

  renderButton() {
    let data = this.props.sensor
    let latest = data[0]
    let max = latest.max || '---'

    let updated;
    if(!latest.updated) updated = 'never'
    else updated = moment(latest.updated).fromNow()

    return (
      <Button onClick={this.toggle.bind(this)}>
        <span>{this.props.id} {max} {updated}</span>
      </Button>
    )
  }

  render() {
    let button = this.renderButton()
    let avgData = this.avgData(this.props.sensor)
    return (
      <div className='sensor'>
        {button}
        <Collapse isOpen={this.state.open}>
         <XYPlot
          width={1000}
          height={700}
          xType="time">
          <HorizontalGridLines />
          <LineSeries data={avgData}/>
          <XAxis />
          <YAxis />
        </XYPlot>         
        </Collapse>
      </div>)
  }
}
