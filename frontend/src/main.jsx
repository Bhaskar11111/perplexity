import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import { store } from './app/app.store.js'
import {Provider} from 'react-redux'
import "prismjs/themes/prism-tomorrow.css";

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
        <App/>
  </Provider>

)
