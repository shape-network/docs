import { FC } from 'react';
import { cn } from '@lib/utils';

type LogoProps = {
  className?: string;
  color?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 799 224"
      className={cn('h-6', className)}
    >
      <circle cx="112" cy="112" r="110" strokeWidth={2} stroke="currentColor" />
      <path
        fill="currentColor"
        d="M308 172.9c-5.9-.3-11.5-1.4-17-3.2-5.5-1.8-10.3-4.3-14.5-7.4-4.2-3.1-7.4-6.9-9.7-11.3l23.2-9c.9 1.4 2.4 2.8 4.4 4.4 2 1.5 4.5 2.8 7.3 3.8s5.9 1.5 9.3 1.5 5.6-.4 8.2-1.1c2.6-.7 4.7-1.8 6.3-3.3 1.6-1.5 2.4-3.4 2.4-5.8s-1-4.5-2.9-5.9c-1.9-1.4-4.3-2.5-7.2-3.2-2.9-.7-5.7-1.4-8.4-2-7.1-1.3-13.8-3.3-19.9-6-6.1-2.7-11-6.3-14.8-10.6-3.7-4.3-5.6-9.6-5.6-15.7s2-12.6 5.9-17.5 9.1-8.7 15.4-11.4c6.4-2.7 13.2-4 20.6-4s17.2 1.7 24.6 5.1c7.5 3.4 13.4 8.1 17.8 14.3l-21.8 11.7c-1.1-1.6-2.5-3.2-4.4-4.6-1.9-1.4-4-2.6-6.4-3.5-2.4-.9-4.9-1.5-7.6-1.6-3.4-.1-6.5.1-9.2.8-2.8.7-5 1.8-6.7 3.5-1.7 1.6-2.5 3.8-2.5 6.6s1.1 4.5 3.4 5.8c2.3 1.3 5 2.2 8.2 2.9 3.2.7 6.3 1.4 9.2 2.3 6.6 2 12.8 4.4 18.7 7.3 5.8 2.9 10.5 6.4 14 10.6 3.5 4.2 5.2 9.2 5.1 15 0 6.6-2.2 12.4-6.5 17.4-4.4 5-10 8.7-16.9 11.3-6.9 2.6-14.2 3.6-22 3.1ZM455.9 106.3v64.8h-25v-58.2c0-4-1-7.7-3-11S423.3 96 420 94c-3.3-1.9-7-2.9-11-2.9s-7.7 1-11 2.9-5.9 4.6-7.9 7.9c-1.9 3.3-2.9 7-2.9 11v58.2h-25V17.3h24.9v60.4c3.6-3.7 7.8-6.6 12.6-8.8 4.9-2.2 10.1-3.2 15.7-3.2s14.2 1.8 20.4 5.5c6.2 3.7 11.1 8.5 14.7 14.7 3.7 6.1 5.5 12.9 5.5 20.4ZM547.6 68.6h25v102.5h-25l-1.1-12.7c-2.8 4.6-6.5 8.3-11.1 11.1-4.6 2.8-10.1 4.3-16.3 4.3s-14.7-1.4-21.3-4.3c-6.6-2.9-12.5-6.8-17.5-11.9-5-5.1-9-10.9-11.8-17.5-2.8-6.6-4.3-13.7-4.3-21.3s1.3-14.2 4-20.6c2.7-6.4 6.5-12.1 11.3-16.9 4.9-4.9 10.5-8.6 16.8-11.4 6.4-2.7 13.2-4.1 20.5-4.1s12.8 1.5 18.2 4.5c5.4 3 9.9 6.8 13.7 11.5l-1.1-13.1Zm-29.2 81c5.3 0 10-1.3 14.1-4s7.3-6.3 9.6-10.8c2.3-4.5 3.5-9.5 3.5-15s-1.2-10.6-3.5-15.1-5.6-8.1-9.7-10.8c-4.1-2.7-8.8-4-14.1-4s-10.1 1.3-14.4 4c-4.3 2.7-7.8 6.3-10.4 10.8s-3.8 9.5-3.8 15.1 1.3 10.6 3.9 15.1c2.6 4.5 6.1 8.1 10.4 10.8 4.3 2.7 9.1 4 14.3 4ZM607.8 222.3h-25V68.6h25v13c3.3-4.6 7.5-8.4 12.4-11.3 4.9-2.9 10.6-4.4 17.2-4.4s14.5 1.4 21 4.2c6.5 2.8 12.2 6.7 17.2 11.6 5 5 8.8 10.7 11.6 17.2 2.8 6.5 4.2 13.5 4.2 20.9s-1.4 14.5-4.2 21c-2.8 6.6-6.6 12.3-11.6 17.3s-10.7 8.8-17.2 11.6c-6.5 2.8-13.5 4.2-21 4.2s-12.3-1.5-17.2-4.4c-4.9-2.9-9-6.7-12.4-11.3v64.1ZM637.1 90c-5.2 0-9.8 1.3-13.9 4s-7.3 6.3-9.6 10.8c-2.3 4.5-3.5 9.5-3.5 15s1.2 10.5 3.5 15 5.5 8.2 9.6 10.9c4.1 2.7 8.7 4 13.9 4s10.1-1.3 14.5-4 7.9-6.3 10.5-10.8c2.6-4.5 3.9-9.6 3.9-15.1s-1.3-10.5-3.9-15c-2.6-4.5-6.1-8.1-10.4-10.8-4.3-2.7-9.2-4-14.5-4ZM748.1 173.7c-9.4 0-18-2.4-25.8-7.3-7.8-4.9-13.9-11.4-18.6-19.6-4.6-8.2-6.9-17.3-6.9-27.2s1.3-14.4 4-21c2.7-6.5 6.3-12.3 11-17.2 4.7-5 10.1-8.8 16.3-11.6 6.2-2.8 12.8-4.2 19.9-4.2s15.3 1.7 22 5.1c6.7 3.4 12.3 8 17 13.9 4.6 5.9 8 12.6 10.1 20.1 2.1 7.5 2.6 15.4 1.4 23.6h-74.9c1 3.8 2.5 7.3 4.7 10.3 2.2 3 5 5.5 8.3 7.3 3.3 1.8 7.1 2.8 11.4 2.8 4.4 0 8.4-1 11.9-3.1 3.6-2.2 6.6-5.1 9-8.8l25.5 5.9c-4.2 9.1-10.4 16.5-18.7 22.3-8.3 5.8-17.5 8.7-27.8 8.7Zm-25.2-64.1h50.4c-.8-4.1-2.3-7.8-4.8-11.1-2.4-3.3-5.4-6-9-7.9-3.6-2-7.4-3-11.5-3s-7.9 1-11.4 2.9-6.4 4.6-8.9 7.9c-2.4 3.3-4.1 7.1-5 11.2Z"
      />
    </svg>
  );
};

export const LogoText: FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 221.585 221.585"
      width="1em"
      height="1em"
      className={cn('h-12', className)}
    >
      <circle cx="110.793" cy="110.793" r="110.793" strokeWidth={0} fill="#000" />
      <path
        strokeWidth={0}
        fill="#fff"
        d="M40.344 127.415a20.564 20.564 0 0 1-5.313-1.011c-1.707-.567-3.218-1.342-4.536-2.327-1.318-.984-2.33-2.16-3.036-3.53l7.272-2.824c.282.428.741.883 1.377 1.364.635.482 1.394.883 2.277 1.203.883.321 1.853.482 2.912.482a9.54 9.54 0 0 0 2.559-.337c.812-.224 1.471-.572 1.977-1.043.506-.47.759-1.08.759-1.829 0-.791-.3-1.407-.9-1.846-.6-.438-1.353-.77-2.259-.995-.906-.225-1.783-.433-2.63-.626-2.236-.406-4.313-1.037-6.23-1.894-1.918-.855-3.459-1.963-4.624-3.321-1.165-1.358-1.747-3.001-1.747-4.926 0-2.118.618-3.947 1.853-5.488s2.847-2.728 4.836-3.562c1.988-.834 4.136-1.252 6.442-1.252 2.8 0 5.371.529 7.713 1.589 2.342 1.059 4.195 2.551 5.56 4.477l-6.813 3.658c-.33-.513-.789-.989-1.377-1.428a8.364 8.364 0 0 0-2.012-1.091 7.678 7.678 0 0 0-2.365-.497c-1.059-.043-2.024.043-2.895.257-.871.214-1.571.578-2.1 1.091-.529.514-.794 1.198-.794 2.054 0 .813.353 1.417 1.059 1.813.706.396 1.559.701 2.559.915 1 .214 1.959.45 2.877.706a37.64 37.64 0 0 1 5.842 2.279c1.823.899 3.288 2.001 4.395 3.306 1.106 1.305 1.636 2.867 1.589 4.685 0 2.075-.683 3.889-2.048 5.439-1.365 1.552-3.124 2.733-5.277 3.546-2.153.813-4.454 1.134-6.901.963ZM86.652 106.556v20.282h-7.831V108.61c0-1.262-.31-2.412-.931-3.45s-1.449-1.861-2.487-2.471-2.187-.915-3.45-.915-2.412.305-3.45.915a6.839 6.839 0 0 0-2.471 2.471c-.61 1.038-.915 2.188-.915 3.45v18.228h-7.83l-.032-48.137h7.83l.032 18.902c1.091-1.155 2.396-2.069 3.915-2.744 1.519-.674 3.155-1.011 4.909-1.011 2.332 0 4.461.573 6.386 1.717a13.06 13.06 0 0 1 4.605 4.589c1.144 1.915 1.717 4.049 1.717 6.402ZM115.341 94.746h7.83v32.091h-7.83l-.353-3.979a10.427 10.427 0 0 1-3.482 3.482c-1.444.888-3.15 1.332-5.119 1.332-2.375 0-4.6-.449-6.675-1.348a17.467 17.467 0 0 1-9.163-9.21c-.888-2.075-1.332-4.3-1.332-6.675 0-2.289.422-4.439 1.268-6.45a16.392 16.392 0 0 1 3.546-5.295 16.71 16.71 0 0 1 5.263-3.562c1.99-.855 4.129-1.284 6.418-1.284 2.118 0 4.016.471 5.696 1.412a14.717 14.717 0 0 1 4.285 3.594l-.353-4.108Zm-9.146 25.385c1.669 0 3.145-.417 4.429-1.251s2.289-1.963 3.017-3.385c.727-1.423 1.091-2.99 1.091-4.702 0-1.733-.364-3.311-1.091-4.734-.727-1.422-1.739-2.551-3.033-3.385-1.295-.834-2.765-1.251-4.413-1.251s-3.15.423-4.508 1.268c-1.359.845-2.439 1.974-3.241 3.385s-1.203 2.985-1.203 4.718.406 3.306 1.219 4.717a9.374 9.374 0 0 0 3.257 3.37c1.358.834 2.85 1.251 4.476 1.251ZM134.21 142.883h-7.83V94.746h7.83v4.076a12.75 12.75 0 0 1 3.867-3.546c1.529-.909 3.321-1.364 5.375-1.364 2.353 0 4.546.439 6.579 1.316a17.164 17.164 0 0 1 5.375 3.642 16.912 16.912 0 0 1 3.626 5.375c.867 2.033 1.3 4.215 1.3 6.547s-.433 4.525-1.3 6.579a16.814 16.814 0 0 1-3.626 5.407 17.141 17.141 0 0 1-5.375 3.642c-2.033.877-4.226 1.316-6.579 1.316-2.054 0-3.846-.455-5.375-1.364a12.738 12.738 0 0 1-3.867-3.546v20.057Zm9.147-41.429c-1.626 0-3.081.423-4.364 1.268-1.284.845-2.289 1.974-3.017 3.385-.727 1.412-1.091 2.974-1.091 4.685s.363 3.279 1.091 4.702c.727 1.423 1.733 2.557 3.017 3.401 1.284.845 2.739 1.268 4.364 1.268 1.647 0 3.156-.417 4.525-1.251s2.46-1.963 3.273-3.385c.813-1.423 1.22-3.001 1.22-4.734 0-1.711-.407-3.274-1.22-4.685a9.507 9.507 0 0 0-3.257-3.385c-1.359-.845-2.872-1.268-4.541-1.268ZM178.111 127.672c-2.953 0-5.643-.76-8.071-2.278-2.428-1.519-4.364-3.562-5.809-6.13-1.444-2.567-2.166-5.402-2.166-8.504 0-2.332.417-4.519 1.251-6.563a17.286 17.286 0 0 1 3.45-5.392 16.033 16.033 0 0 1 5.119-3.642c1.947-.877 4.022-1.316 6.226-1.316 2.503 0 4.797.529 6.883 1.589a15.841 15.841 0 0 1 5.311 4.348c1.455 1.84 2.514 3.936 3.177 6.29.663 2.354.813 4.814.45 7.381h-23.459a9.332 9.332 0 0 0 1.476 3.225 7.612 7.612 0 0 0 2.6 2.278c1.048.567 2.235.862 3.562.883 1.369.021 2.616-.305 3.738-.979 1.123-.674 2.059-1.588 2.808-2.744l7.991 1.861c-1.305 2.846-3.252 5.172-5.84 6.98-2.589 1.808-5.487 2.712-8.697 2.712Zm-7.895-20.089h15.789a8.39 8.39 0 0 0-1.492-3.482 8.71 8.71 0 0 0-2.808-2.487c-1.113-.62-2.311-.93-3.594-.93s-2.471.305-3.562.915-2.017 1.434-2.776 2.471a9.074 9.074 0 0 0-1.557 3.514Z"
      />
    </svg>
  );
};

export const Twitter: FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 1200 1227"
      className={cn('h-5 w-5', className)}
    >
      <path
        fill="currentColor"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      />
    </svg>
  );
};

export const Discord: FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 256 199"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      className={cn('h-5 w-5', className)}
    >
      <path
        d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"
        fill="currentColor"
      />
    </svg>
  );
};
