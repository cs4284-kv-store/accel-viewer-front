import { combineReducers } from 'redux';

const initialState = {
  socketState: 'DISCONNECTED',
  sensorData: {},
  selectedSensors: []
}

const sensors = function(state=initialState, action) {
  switch(action.type) {
    case 'CONNECTING': 
    case 'CONNECTED': 
    case 'DISCONNECTED':
      return {
        ...state,
        socketState: action.type
      }
    case 'SENSOR_UPDATE':
      /* TODO: add to sensor data */
      let reading = action.data

      let id = reading.id
      delete reading.id

      let utc_updated = reading.updated + ' UTC'
      reading.updated = new Date(utc_updated)

      let oldState = state.sensorData[id];
      if(!oldState)
        oldState = []

      let newState = [reading, ...oldState]

      return {
        ...state,
        sensorData: {
          ...state.sensorData,
          [id]: newState
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  sensors
})
