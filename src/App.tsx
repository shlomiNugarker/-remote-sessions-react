import './assets/scss/global.scss'

import { useEffect } from 'react'
import hljs from 'highlight.js'

import 'highlight.js/styles/github.css'

export default function App() {
  const markdown = `
    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
 
`

  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <div className="App">
      <h1>title</h1>
      <pre>
        <code className="language-js">{markdown}</code>
      </pre>
    </div>
  )
}
