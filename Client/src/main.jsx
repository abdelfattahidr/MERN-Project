import React from 'react'
import ReactDOM from 'react-dom/client'
import { store, persistore } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate loading={null} persistor={persistore}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
        <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </PersistGate>
)
