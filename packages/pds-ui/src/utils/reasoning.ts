/**
 * reasoning 텍스트를 markdown 렌더링에 맞춰 변환.
 * - 전체 라인이 `**title**` 인 경우 `### title` 로 변환
 * - 코드 펜스 블록 안 내용은 원본 유지
 */
export function formatReasoningContent(text: string): string {
  if (!text) return text;

  const lines = text.split("\n");
  const result: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      result.push(line);
      continue;
    }

    if (inFence) {
      result.push(line);
      continue;
    }

    const match = line.match(/^\s*\*\*(.+?)\*\*\s*$/);
    if (match) {
      result.push(`### ${match[1]}`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}
