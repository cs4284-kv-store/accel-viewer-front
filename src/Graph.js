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

    avgSeries(key, data) {
        let avg = data
            .filter(reading => reading.avg)
            .map(this.readingToXY('avg'))

        return <LineSeries key={'avg-' + key}  data={avg}/>
    }
    
    minSeries(key, data) {
        let min = data
            .filter(reading => reading.min)
            .map(this.readingToXY('min'))

        return <LineSeries key={'min-' + key}  data={min}/>
    }

    maxSeries(key, data) {
        let max = data
            .filter(reading => reading.max)
            .map(this.readingToXY('max'))

        return <LineSeries key={'max-' + key}  data={max}/>

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
        let sensorsToDraw = Object.keys(sensors)
            .filter(k => sensors[k].selected)
            .map(k => ({key: k, data: this.dataSeries(sensors[k])}))

        let avg = sensorsToDraw
            .map(obj => this.avgSeries(obj.key, obj.data))
        let min = sensorsToDraw
            .map(obj => this.minSeries(obj.key, obj.data))
        let max = sensorsToDraw
            .map(obj => this.maxSeries(obj.key, obj.data))

        return (
         <FlexibleXYPlot xType="time" xDomain={this.state.domain} yDomain={[-1, 1]}>
            <HorizontalGridLines />
            {avg}
            {min}
            {max}
            <XAxis />
            <YAxis />
            </FlexibleXYPlot>
        )
    }
}
export default Graph;
