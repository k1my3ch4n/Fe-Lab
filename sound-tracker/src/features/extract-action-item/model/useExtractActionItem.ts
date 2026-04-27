import { useCallback, useRef } from 'react';
import { transcribeAudio, extractActionItems } from '@/shared/api';
import { useActionItemStore } from '@/entities/action-item/model';
import { useAudioStreamStore } from '@/entities/audio-stream/model';

const MAX_CONTEXT_LENGTH = 500;

export function useExtractActionItem() {
  const addItem = useActionItemStore(state => state.addItem);
  const setError = useAudioStreamStore(state => state.setError);
  const contextRef = useRef<string>('');

  const processChunk = useCallback(async (chunk: Blob): Promise<void> => {
    if (chunk.size === 0) {
      return;
    }

    try {
      const transcript = await transcribeAudio(chunk);

      if (!transcript.trim()) {
        return;
      }

      const context = contextRef.current || undefined;
      const rawItems = await extractActionItems(transcript, context);
      rawItems.forEach(raw => addItem(raw));

      const updated = contextRef.current ? `${contextRef.current} ${transcript}` : transcript;
      contextRef.current = updated.length > MAX_CONTEXT_LENGTH
        ? updated.slice(-MAX_CONTEXT_LENGTH)
        : updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    }
  }, [addItem, setError]);

  return { processChunk };
}
