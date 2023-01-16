import { useState } from 'react'
import AceEditor from 'react-ace'
import { ICodeBlock } from '../interfaces/ICodeBlock'
import { codeBlockService } from '../services/codeBlockService'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

type Props = {
  loadCodeBlocksIds: () => Promise<void>
}

export default function AddCodeBlockPage({ loadCodeBlocksIds }: Props) {
  const navigate = useNavigate()
  const [codeBlock, setCodeBlock] = useState<ICodeBlock | null>({
    code: "'use strict'",
    title: 'New code block',
    solution: '',
    createdBy: '',
  })

  const addCodeBlock = async () => {
    const loggedUser = authService.getLoggedUser()
    if (!codeBlock?.code || !codeBlock.title || !loggedUser) return
    try {
      await codeBlockService.save({ ...codeBlock, createdBy: loggedUser._id })
      loadCodeBlocksIds()
      navigate('/')
    } catch (err) {
      alert("Couldn't add code block..")
    }
  }

  return (
    <div className="add-code-block-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        Back
      </button>
      <input
        autoFocus
        className="edit-input"
        type="text"
        value={codeBlock?.title}
        onChange={(ev) =>
          setCodeBlock(
            (prevVal) =>
              ({
                ...prevVal,
                title: ev.target.value,
              } as ICodeBlock)
          )
        }
      />

      {/* Editor: */}
      <AceEditor
        placeholder="Start coding :)"
        mode="typescript"
        theme="monokai"
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        readOnly={false}
        wrapEnabled={true}
        onChange={(newValue) => {
          setCodeBlock(
            (prevVal) =>
              ({
                ...prevVal,
                code: newValue,
              } as ICodeBlock)
          )
        }}
        name="text-area-block-code"
        value={codeBlock?.code}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 1,
          useWorker: false,
        }}
      />

      <button onClick={addCodeBlock} className="Add-code-block-btn">
        Add
      </button>
    </div>
  )
}
