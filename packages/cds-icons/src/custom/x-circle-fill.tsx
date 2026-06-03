import * as React from "react";

/**
 * 채워진 X-원 상태 아이콘. negative/error 피드백용.
 * 원본: thoughts/icons (Name=circleCloseFill). 색은 currentColor 로 상속.
 */
export const XCircleFill = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  function XCircleFill({ width = "1em", height = "1em", ...props }, ref) {
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
          d="M2.09998 12.0001C2.09998 6.53248 6.53235 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53235 21.9001 2.09998 17.4677 2.09998 12.0001ZM9.13634 7.86373C8.78487 7.51225 8.21503 7.51225 7.86356 7.86373C7.51209 8.2152 7.51208 8.78505 7.86356 9.13652L10.7271 12.0001L7.86356 14.8637C7.51208 15.2152 7.51209 15.785 7.86356 16.1365C8.21503 16.488 8.78487 16.488 9.13634 16.1365L11.9999 13.2729L14.8635 16.1365C15.215 16.488 15.7848 16.488 16.1363 16.1365C16.4878 15.785 16.4878 15.2152 16.1363 14.8637L13.2727 12.0001L16.1363 9.13652C16.4878 8.78505 16.4878 8.2152 16.1363 7.86373C15.7848 7.51225 15.215 7.51225 14.8635 7.86373L11.9999 10.7273L9.13634 7.86373Z"
        />
      </svg>
    );
  },
);
