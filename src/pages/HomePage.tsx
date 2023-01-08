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
      console.log(err)
    }
  }

  useEffect(() => {
    loadCodeBlocks()
  }, [])
  return (
    <section className="home-page">
      <h1>Choose code block:</h1>

      {codeBlocks?.map((codeBlock: any) => (
        <button
          key={codeBlock._id}
          onClick={() => navigate(`/${codeBlock._id}`)}
        >
          code id: {codeBlock._id}
        </button>
      ))}
    </section>
  )
}
