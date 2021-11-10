export default function ChevronDown({ rotate, onClick, name }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotateZ(${rotate}deg)` }}
      onClick={onClick}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#05343A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
