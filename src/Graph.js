import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export default props => {
  let sensors = props.sensors
  let sensorsToDraw = Object.keys(sensors)
    .filter(k => sensors[k].selected)
    .map(k => [k, sensors[k]])
    .map(pair => {
      let k = pair[0]
      let sensor = pair[1]
      return <p id={k}>{k}</p>
    })
  return (
    <XYPlot width={300} height={300}>
      <HorizontalGridLines />
      <LineSeries data={[{x: 1, y:1}]}/>
      <XAxis />
      <YAxis />
    </XYPlot>
  )
}
