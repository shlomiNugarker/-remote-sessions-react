import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { codeBlockService } from '../services/codeBlockService'

export default function Home() {
  const navigate = useNavigate()

  const loadCodeBlocks = async () => {
    try {
      const codeBlocks = await codeBlockService.query()
      console.log(codeBlocks)
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

      <button onClick={() => navigate('/63bad5e179ba21f8d6dbb475')}>
        code id: 63bad5e179ba21f8d6dbb475
      </button>
    </section>
  )
}
