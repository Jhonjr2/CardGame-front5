import ReactDOM from 'react-dom/client'
import "bootswatch/dist/lux/bootstrap.min.css";
import { Provider } from 'react-redux'
import store from './reduxStore/store';
import App from './App';
import './config/i18nextConfig'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
