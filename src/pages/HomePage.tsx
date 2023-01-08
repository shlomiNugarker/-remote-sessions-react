import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { codeBlockService } from '../services/codeBlockService'
import { ICodeBlock } from '../interfaces/ICodeBlock'

export default function Home() {
  const navigate = useNavigate()
  const [codeBlocks, setCodeBlocks] = useState<ICodeBlock[] | null>(null)

  const loadCodeBlocks = async () => {
    try {
      const codeBlocks = await codeBlockService.query()
      setCodeBlocks(codeBlocks)
    } catch (err) {
      alert("can't load code blocks...")
      console.log(err)
    }
  }

  useEffect(() => {
    loadCodeBlocks()
  }, [])

  if (!codeBlocks) return <div className="home-page">Loading...</div>

  return (
    <section className="home-page">
      <h1>Choose code block:</h1>

      <div className="codeBlocks">
        {codeBlocks.map((codeBlock: any) => (
          <button
            key={codeBlock._id}
            onClick={() => navigate(`/${codeBlock._id}`)}
          >
            {codeBlock.title}
          </button>
        ))}
      </div>
    </section>
  )
}
