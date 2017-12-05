import React, { Component } from 'react'
import {FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import moment from 'moment'

class Graph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      interval: null,
      domain: null
    }
  }

  readingToXY = key => reading => ({x: reading.updated, y: reading[key]})

  dataSeries(sensor) {
    return sensor.data
      .filter(reading => moment(reading.updated).isAfter(this.state.domain[0]))
  }

  avgSeries(key, data, color) {
    let avg = data
      .filter(reading => reading.avg)
      .map(this.readingToXY('avg'))

    return <LineSeries key={'avg-' + key}  data={avg}/>
  }

  minSeries(key, data, color) {
    let min = data
      .filter(reading => reading.min)
      .map(this.readingToXY('min'))

    return <LineSeries key={'min-' + key}  data={min} color={color}/>
  }

  maxSeries(key, data, color) {
    let max = data
      .filter(reading => reading.max)
      .map(this.readingToXY('max'))

    return <LineSeries key={'max-' + key}  data={max} color={color}/>

  }

  setDomain() {
    let now = moment()
    let minAgo = moment().subtract(1, 'minute')
    this.setState({...this.state, domain: [minAgo, now]})
  }

  componentDidMount() {
    /* Change the domain every second. */
    let interval = setInterval(this.setDomain.bind(this), 1000)
    this.setState({interval: interval, ...this.state})
  }

  componentDidUnmount() {
    /* this.state may or may not exist at this stage... */
    clearInterval(this.state.interval)
  }

  render() {
    let sensors = this.props.sensors

    let colorMap = {}

    let allKeys = Object.keys(sensors)
    let keysToDraw = allKeys
      .filter(k => sensors[k].selected)
      .map((key, index, keysToDraw) => {
        
        colorMap[key] = index / keysToDraw.length
        
        return {
          key: key, 
          data: this.dataSeries(sensors[key])
        }
      })

    let avg = keysToDraw
      .map(obj => this.avgSeries(obj.key, obj.data, colorMap[obj.key]))
    let min = keysToDraw
      .map(obj => this.minSeries(obj.key, obj.data, colorMap[obj.key]))
    let max = keysToDraw
      .map(obj => this.maxSeries(obj.key, obj.data, colorMap[obj.key]))

    return (
      <FlexibleXYPlot xType="time" xDomain={this.state.domain} yDomain={[-0.05, 0.05]} colorRange="linear" colorDomain={[0, 1]}>
      <HorizontalGridLines />
      <LineSeries data={[{x: moment(), y: -1}]} />
      {avg}
      {min}
      {max}
      <XAxis title='Time'/>
      <YAxis title='Accelerometer Readings'/>
      </FlexibleXYPlot>
    )
  }
}
export default Graph;
