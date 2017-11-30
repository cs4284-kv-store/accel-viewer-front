export default {
  connected: () => ({ type: 'CONNECTED' }),
  connecting: () => ({ type: 'CONNECTING' }),
  disconnected: () => ({ type: 'DISCONNECTED' }),
  connect: url => ({
    type: 'CONNECT',
    url
  }),
  disconnect: () => ({ type: 'DISCONNECT' }),
  sensorUpdate: data => ({
    type: 'SENSOR_UPDATE',
    data
  })
}
