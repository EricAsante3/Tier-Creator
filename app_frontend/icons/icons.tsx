const ThreeDotsVertical = ({ size = 24, className = "", fill = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"
        fill={fill}
      />
      <path
        d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
        fill={fill}
      />
      <path
        d="M12 22.5C13.3807 22.5 14.5 21.3807 14.5 20C14.5 18.6193 13.3807 17.5 12 17.5C10.6193 17.5 9.5 18.6193 9.5 20C9.5 21.3807 10.6193 22.5 12 22.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default ThreeDotsVertical;

export const GearIcon = ({ stroke = "#1d1d1b", strokeWidth = 2, ...props }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.89"
        d="M47,27V21H41.51a18.09,18.09,0,0,0-2.76-6.68l3.88-3.87L37.55,5.37,33.68,9.25A18.09,18.09,0,0,0,27,6.49V1H21V6.49a18.09,18.09,0,0,0-6.68,2.76L10.45,5.37,5.37,10.45l3.88,3.87A18.09,18.09,0,0,0,6.49,21H1v6H6.49a18.09,18.09,0,0,0,2.76,6.68L5.37,37.55l5.08,5.08,3.87-3.88A18.09,18.09,0,0,0,21,41.51V47h6V41.51a18.09,18.09,0,0,0,6.68-2.76l3.87,3.88,5.08-5.08-3.88-3.87A18.09,18.09,0,0,0,41.51,27Z"
      />
      <circle
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        cx="24"
        cy="24"
        r="9"
      />
    </svg>
  );
};
