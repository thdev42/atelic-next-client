export default function DashedCircle({ color, number, onClick }) {
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-[96px] h-[96px] flex items-center justify-center">
        <svg width="96" height="96" className="absolute top-0 left-0">
          <circle
            cx="48"
            cy="48"
            r="46"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="6,6"
            opacity="1"
          />
        </svg>
        <div
          style={{ color: color }}
          className="relative font-sora z-10 text-3xl font-medium"
        >
          {number}
        </div>
      </div>
    </div>
  );
}
