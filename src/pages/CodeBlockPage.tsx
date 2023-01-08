import { useCallback, useEffect, useState } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { useParams } from 'react-router-dom'
import { codeBlockService } from '../services/codeBlockService'

export default function CodeBlockPage() {
  let { id } = useParams()
  const [codeBlock, setCodeBlock] = useState<any>(null)

  const loadCode = useCallback(async () => {
    if (!id) return
    try {
      const code = await codeBlockService.getById(id)
      setCodeBlock(code)
      hljs.highlightAll()
    } catch (err) {
      alert('cant find code block')
      console.log(err)
    }
  }, [id])

  useEffect(() => {
    loadCode()
  }, [loadCode])

  if (!codeBlock) return <p>Loading...</p>
  return (
    <div className="code-page">
      <h1>{codeBlock.title}</h1>
      <pre>
        <code className="language-js">{codeBlock.code}</code>
      </pre>
    </div>
  )
}
