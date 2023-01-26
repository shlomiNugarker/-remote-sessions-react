import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { codeBlockService } from '../services/codeBlockService'
import { socketService, socket } from '../services/socketService'

import AceEditor from 'react-ace'

import useDebounce from '../hooks/useDebounce'
import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { ICodeBlock } from '../interfaces/ICodeBlock'

import loadingGif from '../assets/imgs/loading.gif'
import { IUser } from '../interfaces/IUser'

type Props = {
  loggedUser: IUser | null
}

export default function CodeBlockPage({ loggedUser }: Props) {
  const params = useParams()
  const navigate = useNavigate()
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [codeBlock, setCodeBlock] = useState<ICodeBlock | null>(null)
  const debouncedValue = useDebounce<ICodeBlock | null>(codeBlock, 200)
  const [watchers, setWatchers] = useState<string[] | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isUserTyped, setIsUserTyped] = useState(false)

  // Loading specific codeBlock with id:
  const loadCode = useCallback(async () => {
    if (!params.id) return
    try {
      const code = await codeBlockService.getById(params.id)
      setCodeBlock(code)
    } catch (err) {
      alert("couldn't find code-block")
      navigate('/')
    }
  }, [navigate, params.id])
  useEffect(() => {
    loadCode()
  }, [loadCode])

  // Check if the code is correct:
  const checkSolution = () => {
    if (
      codeBlock &&
      codeBlock.solution &&
      !isCorrect &&
      codeBlock.code.trim() === codeBlock.solution.trim()
    ) {
      setIsCorrect(true)
    } else isCorrect && setIsCorrect(false)
  }

  // Save the code after debouncedValue changed:
  const saveCodeBlock = async () => {
    try {
      if (!codeBlock) return
      const savedCodeBlock = await codeBlockService.save(codeBlock)
      socketService.emit('code-block-saved', savedCodeBlock)
    } catch (err) {
      alert("couldn't save code-block")
    }
  }
  useEffectUpdate(() => {
    checkSolution()
    if (debouncedValue && isUserTyped) saveCodeBlock()
  }, [debouncedValue])

  // Handle sockets:
  useEffect(() => {
    if (!codeBlock) return

    // if someone updated the code:
    socketService.on('update-code-block', (codeBlockFromSocket: ICodeBlock) => {
      const isCodeBlockChanged =
        codeBlockFromSocket.code !== codeBlock.code ||
        codeBlockFromSocket.title !== codeBlock.title

      if (isCodeBlockChanged) setCodeBlock(codeBlockFromSocket)
    })

    return () => {
      socketService.off('update-code-block')
    }
  }, [codeBlock])

  useEffect(() => {
    if (!codeBlock?._id) return
    // when the user enter the page:
    socketService.emit('someone-enter-code-block', codeBlock._id)

    if (codeBlock._id) {
      socketService.on(
        'update-watchers-on-specific-code-block',
        (watchersOnCodeBlock: string[]) => {
          setWatchers(watchersOnCodeBlock)
        }
      )
    }

    return () => {
      if (!codeBlock?._id) return
      // when the user left the page:
      socketService.emit('someone-left-code-block', codeBlock._id)

      socketService.off('update-watchers-on-code-block')
    }
  }, [codeBlock?._id])

  // Loading:
  if (!codeBlock)
    return (
      <p className="code-block-page loading">
        <img className="loading-gif" src={loadingGif} alt="loading" />
      </p>
    )

  return (
    <div className="code-block-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        Back
      </button>

      {/* Title - input or paragraph: */}
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
              onChange={(ev) => {
                if (!isUserTyped) setIsUserTyped(true)
                setCodeBlock(
                  (prevVal) =>
                    ({
                      ...prevVal,
                      title: ev.target.value,
                    } as ICodeBlock)
                )
              }}
            />
          </p>
        )}

        {/* More details: */}
        <p>{watchers?.length || 0} browsers are viewing this code</p>
        <p>
          You are a{' '}
          <span className="underline">
            {loggedUser?.isMentor ? 'mentor' : 'student'}
          </span>{' '}
        </p>
        {codeBlock.solution ? (
          isCorrect ? (
            <p className="emoji">
              🙂<span>looks good</span>
            </p>
          ) : (
            <p className="emoji">
              😐<span>fix the code</span>
            </p>
          )
        ) : null}
        {/* Editor: */}
        <AceEditor
          placeholder=""
          mode="typescript"
          theme="monokai"
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          readOnly={false}
          wrapEnabled={true}
          onChange={(newValue) => {
            if (!isUserTyped) setIsUserTyped(true)
            setCodeBlock(
              (prevVal) =>
                ({
                  ...prevVal,
                  code: newValue,
                } as ICodeBlock)
            )
          }}
          name="text-area-block-code"
          value={codeBlock.code}
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
      </div>
    </div>
  )
}
