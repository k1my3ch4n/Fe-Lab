export interface AudioRecorderOptions {
  onChunk: (chunk: Blob) => void;
  onStop?: () => void;
  chunkIntervalMs?: number;
}

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private chunkTimer: ReturnType<typeof setTimeout> | null = null;
  private isActive = false;
  private readonly options: Required<AudioRecorderOptions>;

  constructor(options: AudioRecorderOptions) {
    this.options = {
      onStop: () => {},
      chunkIntervalMs: 5000,
      ...options,
    };
  }

  async start(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.isActive = true;
    this.startChunk();
  }

  stop(): void {
    this.isActive = false;

    if (this.chunkTimer !== null) {
      clearTimeout(this.chunkTimer);
      this.chunkTimer = null;
    }

    if (this.mediaRecorder?.state !== 'inactive') {
      this.mediaRecorder?.stop();
    } else {
      this.stream?.getTracks().forEach((track) => track.stop());
      this.options.onStop();
    }
  }

  get recording(): boolean {
    return this.isActive;
  }

  private startChunk(): void {
    const chunks: Blob[] = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';

    this.mediaRecorder = new MediaRecorder(this.stream!, { mimeType });

    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    });

    this.mediaRecorder.addEventListener('stop', () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });

      if (blob.size > 0) {
        this.options.onChunk(blob);
      }

      if (this.isActive) {
        this.startChunk();
      } else {
        this.stream?.getTracks().forEach((track) => track.stop());
        this.options.onStop();
      }
    });

    this.mediaRecorder.start();

    this.chunkTimer = setTimeout(() => {
      if (this.mediaRecorder?.state === 'recording') {
        this.mediaRecorder.stop();
      }
    }, this.options.chunkIntervalMs);
  }
}
