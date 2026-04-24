import { useCallback } from 'react';
import { transcribeAudio, extractActionItems } from '@/shared/api';
import { useActionItemStore } from '@/entities/action-item/model';
import { useAudioStreamStore } from '@/entities/audio-stream/model';

export function useExtractActionItem() {
  const addItem = useActionItemStore(state => state.addItem);
  const setError = useAudioStreamStore(state => state.setError);

  const processChunk = useCallback(async (chunk: Blob): Promise<void> => {
    if (chunk.size === 0) {
      return;
    }

    try {
      const transcript = await transcribeAudio(chunk);

      if (!transcript.trim()) {
        return;
      }

      const rawItems = await extractActionItems(transcript);
      rawItems.forEach(raw => addItem(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    }
  }, [addItem, setError]);

  return { processChunk };
}
