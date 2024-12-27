import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import monitorSDK from 'monitor-sdk'

monitorSDK.init()
monitorSDK.Performance()
monitorSDK.Behavior()
createRoot(document.getElementById('root')!).render(
  <App />
)
