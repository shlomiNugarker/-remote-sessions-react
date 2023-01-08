import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { codeBlockService } from '../services/codeBlockService'

import { ICodeBlock } from '../interfaces/ICodeBlock'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
// import 'ace-builds/src-noconflict/theme-github'
// import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

import useDebounce from '../hooks/useDebounce'
import { useEffectUpdate } from '../hooks/useEffectUpdate'

export default function CodeBlockPage() {
  const { id } = useParams()
  const [codeBlock, setCodeBlock] = useState<ICodeBlock | null>(null)
  const debouncedValue = useDebounce<ICodeBlock | null>(codeBlock, 1000)

  const loadCode = useCallback(async () => {
    if (!id) return
    try {
      const code = await codeBlockService.getById(id)
      setCodeBlock(code)
    } catch (err) {
      console.log(err)
      alert('cant find code block')
    }
  }, [id])

  const handleChange = (newValue: string) => {
    setCodeBlock((prevVal) => ({ ...prevVal, code: newValue } as ICodeBlock))
  }

  const saveCodeBlock = async () => {
    try {
      if (!codeBlock) return
      console.log('save')
      // const savedCodeBlock = await codeBlockService.save(codeBlock)
    } catch (err) {
      console.log(err)
    }
  }

  useEffectUpdate(() => {
    saveCodeBlock()
  }, [debouncedValue])

  useEffect(() => {
    loadCode()
  }, [loadCode])

  if (!codeBlock) return <p className="code-block-page">Loading...</p>
  return (
    <div className="code-block-page">
      <div className="code-block-edit">
        <h1 className="title">{codeBlock.title}</h1>
        <AceEditor
          placeholder=""
          mode="javascript"
          theme="monokai"
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          onChange={handleChange}
          name="text-area-block-code"
          value={codeBlock.code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  )
}
