import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { client, isAppwriteConfigured } from './lib/appwrite.ts'

if (isAppwriteConfigured) {
  client.ping().catch((error) => {
    console.warn('Appwrite ping failed:', error);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
