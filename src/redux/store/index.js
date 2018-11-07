import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk' //支持action返回函数,异步处理
// import createLogger from 'redux-logger' //日志中间件middleware
import createHistory from 'history/createBrowserHistory' //路由设置
import {  routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

// const loggerMiddleware = createLogger();
//具体配置查看 https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
const history = createHistory();
const routermiddleware = routerMiddleware(history);

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      routermiddleware,
    )
  )
}