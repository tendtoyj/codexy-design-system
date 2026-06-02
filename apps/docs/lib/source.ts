import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";

/**
 * fumadocs-mdx@11.x 는 `Source.files` 를 lazy 함수로 돌려주지만,
 * fumadocs-core@15.x 는 배열을 요구한다. 어댑터로 한 번 감싸 정렬한다.
 * 버전 갭이 좁혀지면 이 어댑터는 제거.
 */
const mdxSource = docs.toFumadocsSource();
const rawFiles = (mdxSource as unknown as { files: unknown }).files;
const files = (
  typeof rawFiles === "function" ? (rawFiles as () => unknown[])() : rawFiles
) as typeof mdxSource.files;

export const source = loader({
  baseUrl: "/docs",
  source: { ...mdxSource, files },
});
