import { groqClient } from './groqClient';

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });

  const transcription = await groqClient.audio.transcriptions.create({
    file,
    model: 'whisper-large-v3-turbo',
    response_format: 'json',
    language: 'ko',
  });

  return transcription.text;
}
