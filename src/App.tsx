import './assets/scss/global.scss'
import 'highlight.js/styles/github.css'
import { Route, Link, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CodePage from './pages/CodePage'

export default function App() {
  return (
    <div className="App">
      {/* <Link to="/"> Home page</Link> <br />
      <Link to="/someid">Code page</Link> */}
      <Routes>
        <Route path="/:id" element={<CodePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}
