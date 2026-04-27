import { useEffect, useRef } from 'react'
import { useRecordAudio, RecordButton } from '@/features/record-audio'
import { useExtractActionItem } from '@/features/extract-action-item'
import { AudioVisualizer } from '@/widgets/audio-visualizer'
import { ActionItemCardList } from '@/widgets/action-item-card-list'
import { useAudioStreamStore } from '@/entities/audio-stream/model'
import { useActionItemStore } from '@/entities/action-item/model'

export function SidePanelPage() {
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
        <AudioVisualizer analyserNode={analyserNode} />
      </section>

      <section className="px-4 py-3 flex flex-col items-center gap-2">
        <RecordButton onStart={startRecording} onStop={stopRecording} />
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </section>

      <section className="flex-1 px-4 pb-4 min-h-0">
        <ActionItemCardList />
      </section>
    </main>
  )
}
