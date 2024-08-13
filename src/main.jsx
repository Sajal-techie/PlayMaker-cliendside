import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './redux/store.jsx'
import {PersistGate} from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import {QueryClient, QueryClientProvider} from 'react-query'

let persistor = persistStore(store);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}> 
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
)
