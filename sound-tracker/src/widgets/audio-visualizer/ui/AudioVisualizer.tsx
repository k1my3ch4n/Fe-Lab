import { useEffect, useRef } from 'react';
import { useAudioStreamStore } from '@/entities/audio-stream/model';

interface AudioVisualizerProps {
  analyserNode: AnalyserNode | null;
}

const BAR_COUNT = 40;
const IDLE_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, index) =>
  4 + Math.sin(index * 0.5) * 3
);

export function AudioVisualizer({ analyserNode }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const status = useAudioStreamStore((state) => state.status);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { return; }

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (analyserNode && status === 'recording') {
        drawLiveWaveform(ctx, analyserNode, width, height);
      } else if (status === 'processing') {
        drawProcessingAnimation(ctx, width, height);
      } else {
        drawIdleState(ctx, width, height);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyserNode, status]);

  return (
    <figure className="flex flex-col items-center gap-2 w-full">
      <canvas
        ref={canvasRef}
        width={280}
        height={64}
        className="w-full rounded-lg bg-gray-50"
      />
      <figcaption className="text-xs text-gray-400">
        {status === 'recording' && '녹음 중...'}
        {status === 'processing' && 'AI 분석 중...'}
        {status === 'idle' && '대기 중'}
      </figcaption>
    </figure>
  );
}

function drawLiveWaveform(
  ctx: CanvasRenderingContext2D,
  analyser: AnalyserNode,
  width: number,
  height: number
) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  const barWidth = width / BAR_COUNT;
  const step = Math.floor(bufferLength / BAR_COUNT);

  for (let index = 0; index < BAR_COUNT; index++) {
    const value = dataArray[index * step] / 255;
    const barHeight = Math.max(4, value * (height - 8));
    const x = index * barWidth;
    const y = (height - barHeight) / 2;

    const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#6366f1');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x + 1, y, barWidth - 2, barHeight, 2);
    ctx.fill();
  }
}

function drawProcessingAnimation(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const time = Date.now() / 600;
  const barWidth = width / BAR_COUNT;

  for (let index = 0; index < BAR_COUNT; index++) {
    const wave = Math.sin(time + index * 0.4) * 0.5 + 0.5;
    const barHeight = 6 + wave * (height * 0.6);
    const x = index * barWidth;
    const y = (height - barHeight) / 2;

    ctx.fillStyle = `rgba(234, 179, 8, ${0.4 + wave * 0.6})`;
    ctx.beginPath();
    ctx.roundRect(x + 1, y, barWidth - 2, barHeight, 2);
    ctx.fill();
  }
}

function drawIdleState(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const barWidth = width / BAR_COUNT;

  for (let index = 0; index < BAR_COUNT; index++) {
    const barHeight = IDLE_HEIGHTS[index];
    const x = index * barWidth;
    const y = (height - barHeight) / 2;

    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.roundRect(x + 1, y, barWidth - 2, barHeight, 2);
    ctx.fill();
  }
}
