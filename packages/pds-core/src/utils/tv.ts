/**
 * PDS 전용 `tv` 팩토리. `tailwind-variants` 의 `createTV` 에 PDS typography
 * 그룹을 알려주는 twMerge config 를 주입해서, `text-body2` 같은 커스텀 사이즈
 * 유틸과 `text-[color:...]` 가 한 className 안에 같이 있어도 한쪽이 드롭되지
 * 않게 한다.
 *
 * pds-ui 컴포넌트는 `tailwind-variants` 에서 직접 `tv` 를 가져오지 말고 이 모듈
 * 의 `tv` 를 사용해야 한다. 외부 소비자도 PDS typography group 을 인지하는
 * `tv` 가 필요하면 `@fluxloop-ai/pds-core` 에서 가져오면 된다.
 */
import { createTV } from "tailwind-variants";
import { twMergeConfig } from "./tw-merge-config.js";

const tv = createTV({ twMergeConfig });

export type { VariantProps } from "tailwind-variants";
export { tv };
