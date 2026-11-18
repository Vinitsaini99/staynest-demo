import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from './context/AppContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3200,
            style: { background: '#142D27', color: '#F7F6F2', borderRadius: '2px', fontSize: '0.88rem', border: '1px solid rgba(213,166,91,0.5)' },
            iconTheme: { primary: '#D5A65B', secondary: '#142D27' },
          }}
        />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
