import { useEffect, useState } from 'react'
import { Button, Badge } from '@/shared/ui'

type RecordingStatus = 'idle' | 'recording' | 'processing'

const STATUS_LABEL: Record<RecordingStatus, string> = {
  idle: '대기 중',
  recording: '녹음 중',
  processing: '처리 중',
}

const STATUS_BADGE_VARIANT: Record<RecordingStatus, 'default' | 'recording' | 'processing'> = {
  idle: 'default',
  recording: 'recording',
  processing: 'processing',
}

export function PopupPage() {
  const [status, setStatus] = useState<RecordingStatus>('idle')
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const load = async () => {
      const result = await chrome.storage.session.get(['recordingStatus', 'itemCount'])
      setStatus((result.recordingStatus as RecordingStatus) ?? 'idle')
      setItemCount((result.itemCount as number) ?? 0)
    }
    load()
    const interval = setInterval(load, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleToggle = () => {
    const type = status === 'recording' ? 'stopRecording' : 'startRecording'
    chrome.runtime.sendMessage({ type }).catch(() => {
      // 사이드 패널이 열려있지 않을 때는 no-op
    })
  }

  const handleOpenSidePanel = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.windowId) {
      await chrome.sidePanel.open({ windowId: tab.windowId })
    }
    window.close()
  }

  return (
    <main className="w-64 bg-gray-950 text-white p-4 flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <h1 className="text-sm font-bold">VoxTask</h1>
        <Badge variant={STATUS_BADGE_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
      </header>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">액션 아이템</span>
        <span className="font-semibold">{itemCount}개</span>
      </div>

      <Button
        variant={status === 'recording' ? 'danger' : 'primary'}
        size="sm"
        onClick={handleToggle}
        disabled={status === 'processing'}
        className="w-full"
      >
        {status === 'idle' && '녹음 시작'}
        {status === 'recording' && '녹음 중지'}
        {status === 'processing' && '처리 중...'}
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={handleOpenSidePanel}
        className="w-full"
      >
        사이드 패널 열기
      </Button>
    </main>
  )
}
