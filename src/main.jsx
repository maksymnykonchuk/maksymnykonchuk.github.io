import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('root')).render(<App locale={document.documentElement.lang} />)
