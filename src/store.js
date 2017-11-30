import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import socketMiddleware from './socketMiddleware'

import reducer from './reducer'

const loggerMiddleware = createLogger()

export default createStore(
  reducer,
  applyMiddleware(
    thunk, 
    socketMiddleware,
    loggerMiddleware
  )
)
