import { combineReducers } from 'redux';

const sensorData = function(state={}, action) {
  switch(action.type) {
    case 'TOGGLE_SELECTED': {
      let id = action.id
      let oldState = state[id]

      if(!oldState)
        return state

      let newState = {
        ...oldState,
        selected: !oldState.selected
      }

      return {
        ...state,
        [id]: newState
      }
    }

    case 'SENSOR_UPDATE': {
      /* TODO: add to sensor data */
      let reading = action.data

      let id = reading.id
      delete reading.id

      let utc_updated = reading.updated + ' UTC'
      reading.updated = new Date(utc_updated)

      let oldState = state[id];
      if(!oldState)
        oldState = {
          selected: false,
          data: []
        }

      let newState = {
        ...oldState,
        data: [reading, ...oldState.data]
      }

      return {
        ...state,
        [id]: newState
      }
    }

    default:
      return state
  }
}

const socket = function(state='DISCONNECTED', action) {
  switch(action.type) {
    case 'CONNECTING': 
    case 'CONNECTED': 
    case 'DISCONNECTED':
      return action.type
    default:
      return state
  }
}

export default combineReducers({
  socket,
  sensorData
})
