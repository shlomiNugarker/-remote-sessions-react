import './assets/scss/global.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CodeBlockPage from './pages/CodeBlockPage'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<CodeBlockPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}
