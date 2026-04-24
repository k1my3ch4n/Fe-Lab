import { create } from 'zustand';

export type RecordingStatus = 'idle' | 'recording' | 'processing';

interface AudioStreamStore {
  status: RecordingStatus;
  error: string | null;
  setStatus: (status: RecordingStatus) => void;
  setError: (error: string | null) => void;
}

export const useAudioStreamStore = create<AudioStreamStore>((set) => ({
  status: 'idle',
  error: null,
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
}));
