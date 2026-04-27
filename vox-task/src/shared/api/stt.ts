import { getGroqClient } from './groqClient';

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const client = await getGroqClient();
  const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });

  try {
    const transcription = await client.audio.transcriptions.create({
      file,
      model: 'whisper-large-v3-turbo',
      response_format: 'json',
      language: 'ko',
    });
    return transcription.text;
  } catch (error) {
    throw new Error(`음성 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}
