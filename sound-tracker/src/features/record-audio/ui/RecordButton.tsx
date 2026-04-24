import { useAudioStreamStore } from '@/entities/audio-stream/model';
import { Button } from '@/shared/ui';

interface RecordButtonProps {
  onStart: () => void;
  onStop: () => void;
  className?: string;
}

export function RecordButton({ onStart, onStop, className }: RecordButtonProps) {
  const status = useAudioStreamStore(state => state.status);

  const isActive = status === 'recording' || status === 'processing';

  const label = () => {
    if (status === 'processing') { return 'Processing...'; }
    if (isActive) { return 'Stop Recording'; }
    return 'Start Recording';
  };

  return (
    <Button
      variant={isActive ? 'danger' : 'primary'}
      size="lg"
      onClick={isActive ? onStop : onStart}
      disabled={status === 'processing'}
      className={className}
    >
      {label()}
    </Button>
  );
}
