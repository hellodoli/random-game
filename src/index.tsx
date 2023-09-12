/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './configStore'
import App from './App'
import 'antd/dist/reset.css'
import './styles/index.scss'
console.log('init')
console.log({ store: store.getState() })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
