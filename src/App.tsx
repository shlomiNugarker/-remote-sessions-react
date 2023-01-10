import './assets/scss/global.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CodeBlockPage from './pages/CodeBlockPage'

import { codeBlockService } from './services/codeBlockService'
import { ICodeBlock } from './interfaces/ICodeBlock'
import { useEffect, useState } from 'react'

export default function App() {
  const [codeBlocksIds, setCodeBlocks] = useState<
    { _id: string; title: string }[] | null
  >(null)

  const loadCodeBlocksIds = async () => {
    try {
      const codeBlocks = await codeBlockService.queryIds()
      setCodeBlocks(codeBlocks)
    } catch (err) {
      alert("couldn't load code blocks...")
      setCodeBlocks([])
    }
  }

  useEffect(() => {
    loadCodeBlocksIds()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<CodeBlockPage />} />
        <Route path="/" element={<HomePage codeBlocksIds={codeBlocksIds} />} />
      </Routes>
    </div>
  )
}
