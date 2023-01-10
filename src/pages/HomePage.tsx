import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { codeBlockService } from '../services/codeBlockService'
import { ICodeBlock } from '../interfaces/ICodeBlock'

import loadingGif from '../assets/imgs/loading.gif'

export default function Home() {
  const navigate = useNavigate()

  const [codeBlocksIds, setCodeBlocks] = useState<ICodeBlock[] | null>(null)

  const loadCodeBlocks = async () => {
    try {
      const codeBlocks = await codeBlockService.queryIds()
      setCodeBlocks(codeBlocks)
    } catch (err) {
      alert("couldn't load code blocks...")
      setCodeBlocks([])
    }
  }

  useEffect(() => {
    loadCodeBlocks()
  }, [])

  if (!codeBlocksIds)
    return (
      <div className="home-page">
        <img className="loading-gif" src={loadingGif} alt="" />
      </div>
    )

  if (!codeBlocksIds.length)
    return <div className="home-page">No block codes yet. 🙂</div>

  return (
    <section className="home-page">
      <h1>Choose code block:</h1>

      <div className="code-blocks">
        {codeBlocksIds.map((codeBlock: ICodeBlock) => (
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
