import * as React from "react";

/**
 * 채워진 체크-원 상태 아이콘. positive/success 피드백용.
 * 원본: thoughts/icons (Name=circleCheckFill). 색은 currentColor 로 상속.
 */
export const CheckCircleFill = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function CheckCircleFill({ width = "1em", height = "1em", ...props }, ref) {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.09993 12C2.09993 6.53236 6.53229 2.09998 11.9999 2.09998C17.4675 2.09998 21.8999 6.53236 21.8999 12C21.8999 17.4676 17.4675 21.9 11.9999 21.9C6.53229 21.9 2.09993 17.4676 2.09993 12ZM16.6466 9.87581C16.9923 9.51866 16.983 8.94889 16.6258 8.60319C16.2687 8.2575 15.6989 8.26679 15.3532 8.62394L10.6773 13.4549L8.64747 11.3521C8.30226 10.9945 7.7325 10.9844 7.37488 11.3296C7.01725 11.6748 7.00719 12.2446 7.3524 12.6022L10.0289 15.3749C10.1983 15.5505 10.4318 15.6497 10.6758 15.6499C10.9198 15.65 11.1534 15.5511 11.3231 15.3758L16.6466 9.87581Z"
        />
      </svg>
    );
  },
);
