import { useRef, useCallback } from 'react';
import { AudioRecorder } from '@/shared/lib';
import { useAudioStreamStore } from '@/entities/audio-stream/model';

interface UseRecordAudioOptions {
  onChunk: (chunk: Blob) => Promise<void>;
}

export function useRecordAudio({ onChunk }: UseRecordAudioOptions) {
  const recorderRef = useRef<AudioRecorder | null>(null);
  const isActiveRef = useRef(false);

  const setStatus = useAudioStreamStore(state => state.setStatus);
  const setError = useAudioStreamStore(state => state.setError);
  const status = useAudioStreamStore(state => state.status);

  const handleChunk = useCallback(async (chunk: Blob) => {
    setStatus('processing');
    await onChunk(chunk);
    if (isActiveRef.current) {
      setStatus('recording');
    } else {
      setStatus('idle');
    }
  }, [onChunk, setStatus]);

  const startRecording = async () => {
    setError(null);

    try {
      const recorder = new AudioRecorder({
        onChunk: handleChunk,
        chunkIntervalMs: 5000,
      });

      await recorder.start();
      isActiveRef.current = true;
      recorderRef.current = recorder;
      setStatus('recording');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
    }
  };

  const stopRecording = useCallback(() => {
    isActiveRef.current = false;
    recorderRef.current?.stop();
    recorderRef.current = null;
    setStatus('idle');
  }, [setStatus]);

  return { startRecording, stopRecording, status };
}
