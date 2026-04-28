import { useEffect, useRef, useState } from 'react'
import { useRecordAudio, RecordButton } from '@/features/record-audio'
import { useExtractActionItem } from '@/features/extract-action-item'
import { AudioVisualizer } from '@/widgets/audio-visualizer'
import { ActionItemCardList } from '@/widgets/action-item-card-list'
import { useAudioStreamStore } from '@/entities/audio-stream/model'
import { useActionItemStore } from '@/entities/action-item/model'
import { ErrorBoundary } from '@/shared/ui'
import { getApiKey } from '@/shared/api'

type SetupIssue = 'apiKey' | 'microphone'

function SetupRequiredScreen({ issues }: { issues: SetupIssue[] }) {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">VoxTask 설정 필요</h1>
        <p className="text-gray-400 text-sm">시작하기 전에 아래 항목을 설정해주세요.</p>
      </div>

      <ul className="w-full max-w-xs flex flex-col gap-3">
        {issues.includes('apiKey') && (
          <li className="flex items-start gap-3 bg-gray-800 rounded-lg px-4 py-3">
            <span className="text-red-400 mt-0.5">✕</span>
            <div>
              <p className="text-sm font-medium">Groq API 키 미설정</p>
              <p className="text-xs text-gray-400 mt-0.5">녹음 및 분석에 필요합니다.</p>
            </div>
          </li>
        )}
        {issues.includes('microphone') && (
          <li className="flex items-start gap-3 bg-gray-800 rounded-lg px-4 py-3">
            <span className="text-red-400 mt-0.5">✕</span>
            <div>
              <p className="text-sm font-medium">마이크 권한 미허용</p>
              <p className="text-xs text-gray-400 mt-0.5">음성 녹음에 필요합니다.</p>
            </div>
          </li>
        )}
      </ul>

      <button
        onClick={() => chrome.runtime.openOptionsPage()}
        className="w-full max-w-xs bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium py-2.5 rounded-lg"
      >
        설정하러 가기
      </button>
    </main>
  )
}

export function SidePanelPage() {
  const [setupIssues, setSetupIssues] = useState<SetupIssue[] | null>(null)
  const { processChunk } = useExtractActionItem()
  const { startRecording, stopRecording, analyserNode, status } = useRecordAudio({
    onChunk: processChunk,
  })
  const error = useAudioStreamStore((state) => state.error)
  const itemCount = useActionItemStore((state) => state.items.length)

  const startRef = useRef(startRecording)
  const stopRef = useRef(stopRecording)
  useEffect(() => { startRef.current = startRecording }, [startRecording])
  useEffect(() => { stopRef.current = stopRecording }, [stopRecording])

  useEffect(() => {
    async function checkSetup() {
      const issues: SetupIssue[] = []

      const apiKey = await getApiKey()
      if (!apiKey) {
        issues.push('apiKey')
      }

      try {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        if (result.state === 'denied') {
          issues.push('microphone')
        }
      } catch {
        // permissions API 미지원 환경은 통과
      }

      setSetupIssues(issues)
    }

    checkSetup()

    const handleStorageChange = (changes: Record<string, chrome.storage.StorageChange>) => {
      if ('groqApiKey' in changes) {
        checkSetup()
      }
    }
    chrome.storage.sync.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.sync.onChanged.removeListener(handleStorageChange)
  }, [])

  useEffect(() => {
    chrome.storage.session.set({ recordingStatus: status })
  }, [status])

  useEffect(() => {
    chrome.storage.session.set({ itemCount })
  }, [itemCount])

  useEffect(() => {
    const handleMessage = (message: { type: string }) => {
      if (message.type === 'startRecording') { startRef.current() }
      else if (message.type === 'stopRecording') { stopRef.current() }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [])

  if (setupIssues === null) {
    return <main className="min-h-screen bg-gray-950" />
  }

  if (setupIssues.length > 0) {
    return <SetupRequiredScreen issues={setupIssues} />
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h1 className="text-base font-bold">VoxTask</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{itemCount} items</span>
          <button
            onClick={() => chrome.runtime.openOptionsPage()}
            className="text-gray-400 hover:text-white transition-colors text-sm"
            title="Settings"
          >
            ⚙
          </button>
        </div>
      </header>

      <section className="px-4 pt-4">
        <ErrorBoundary>
          <AudioVisualizer analyserNode={analyserNode} />
        </ErrorBoundary>
      </section>

      <section className="px-4 py-3 flex flex-col items-center gap-2">
        <RecordButton onStart={startRecording} onStop={stopRecording} />
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </section>

      <section className="flex-1 px-4 pb-4 min-h-0">
        <ErrorBoundary>
          <ActionItemCardList />
        </ErrorBoundary>
      </section>
    </main>
  )
}
