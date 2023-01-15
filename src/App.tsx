import './assets/scss/global.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CodeBlockPage from './pages/CodeBlockPage'

import { codeBlockService } from './services/codeBlockService'
import { useEffect, useState } from 'react'
import SignIn from './pages/SignIn'

export default function App() {
  const [codeBlocksIds, setCodeBlocksIds] = useState<
    { _id: string; title: string }[] | null
  >(null)

  const loadCodeBlocksIds = async () => {
    try {
      const codeBlocksIds = await codeBlockService.queryIds()
      setCodeBlocksIds(codeBlocksIds)
    } catch (err) {
      alert("couldn't load code blocks...")
      setCodeBlocksIds([])
    }
  }

  useEffect(() => {
    loadCodeBlocksIds()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/:id" element={<CodeBlockPage />} />
        <Route path="/" element={<HomePage codeBlocksIds={codeBlocksIds} />} />
      </Routes>
    </div>
  )
}
