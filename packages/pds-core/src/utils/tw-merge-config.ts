/**
 * PDS typography utilities (`text-body2`, `text-title1` ...) 는 Tailwind v4 `@theme`
 * 의 `--text-{name}` 으로 등록돼 font-size 유틸리티로 emit 된다. 하지만 기본
 * tailwind-merge 는 `body2` 같은 커스텀 size 이름을 모르고, 결과적으로
 * `text-body2` 와 `text-[color:...]` 를 동일 그룹으로 보고 한쪽을 드롭한다.
 *
 * 이 config 는 PDS typography 변종을 `font-size` 그룹에 등록해서 색상 유틸과
 * 충돌 없이 공존하게 한다. `tv()` 와 `cn()` 둘 다 같은 config 를 공유한다.
 */
const PDS_TYPOGRAPHY_VARIANTS = [
  "display1",
  "title1",
  "title2",
  "title3",
  "heading1",
  "heading2",
  "headline1",
  "body1",
  "body1-reading",
  "body2",
  "label1",
  "label2",
  "caption1",
  "caption2",
  "code",
] as const;

const twMergeConfig = {
  extend: {
    classGroups: {
      "font-size": [{ text: [...PDS_TYPOGRAPHY_VARIANTS] }],
    },
  },
};

export { PDS_TYPOGRAPHY_VARIANTS, twMergeConfig };
