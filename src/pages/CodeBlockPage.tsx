import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { codeBlockService } from '../services/codeBlockService'
import { ICodeBlock } from '../interfaces/ICodeBlock'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

import useDebounce from '../hooks/useDebounce'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { socketService } from '../services/socketService'

export default function CodeBlockPage() {
  const { id } = useParams()

  const [isEditTitle, setIsEditTitle] = useState(false)
  const [codeBlock, setCodeBlock] = useState<ICodeBlock | null>(null)
  const debouncedValue = useDebounce<ICodeBlock | null>(codeBlock, 2000)

  const loadCode = useCallback(async () => {
    if (!id) return
    try {
      const code = await codeBlockService.getById(id)
      setCodeBlock(code)
    } catch (err) {
      console.log(err)
      alert("couldn't find code-block")
    }
  }, [id])

  const saveCodeBlock = async () => {
    try {
      if (!codeBlock) return
      console.log('save')
      await codeBlockService.save(codeBlock)
    } catch (err) {
      console.log(err)
      alert("couldn't save code-block")
    }
  }

  useEffect(() => {
    socketService.on('update-code-block', (codeBlock: ICodeBlock) => {
      console.log(codeBlock)
    })
    return () => {
      socketService.off('update-code-block')
    }
  }, [])

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
        {!isEditTitle && (
          <p className="title" onClick={() => setIsEditTitle(true)}>
            {codeBlock.title}
          </p>
        )}

        {isEditTitle && (
          <p>
            <input
              autoFocus
              className="edit-input"
              type="text"
              value={codeBlock.title}
              onBlur={() => setIsEditTitle(false)}
              onChange={(ev) =>
                setCodeBlock(
                  (prevVal) =>
                    ({ ...prevVal, title: ev.target.value } as ICodeBlock)
                )
              }
            />
          </p>
        )}

        <AceEditor
          placeholder=""
          mode="javascript"
          theme="monokai"
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          onChange={(newValue) =>
            setCodeBlock(
              (prevVal) => ({ ...prevVal, code: newValue } as ICodeBlock)
            )
          }
          name="text-area-block-code"
          value={codeBlock.code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
          }}
        />
      </div>
    </div>
  )
}
