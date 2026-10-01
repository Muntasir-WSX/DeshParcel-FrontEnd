import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
      {/* SVG Icon with OKLCH Red Color */}
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg 
        id="logo" 
        width="44" 
        height="34" 
        viewBox="0 0 52 40" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <g id="logomark">
          <path 
            fill="oklch(0.577 0.245 27.325)" 
            d="M52 40H33L25.6569 32.6569C24.596 31.596 24 30.1571 24 28.6569C24 25.5327 26.5327 23 29.6569 23H36L45 32H52V40ZM29 40H9L0 31V23H8.27208C10.659 23 12.9482 23.9482 14.636 25.636L29 40ZM19 12H0V3H28L31 0L46 15V23H36L22 9L19 12ZM0 13H10V14H0V13ZM0 15H10V16H0V15ZM0 17H10V18H0V17ZM0 19H10V20H0V19ZM0 21H10V22H0V21Z"
          />
        </g>
      </svg>

      {/* Brand Text & Slogan */}
      <div className="flex flex-col">
        <span className="font-heading text-[#061528] font-extrabold text-xl tracking-tight text-foreground leading-none">
          Desh<span style={{ color: "oklch(0.577 0.245 27.325)" }}>Parcel</span>
        </span>
        <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground mt-0.5">
          logistics & co.
        </span>
      </div>
    </Link>
  );
}