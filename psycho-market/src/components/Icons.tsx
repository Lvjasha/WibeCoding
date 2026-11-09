export type IconName = 'leaf' | 'bulb' | 'plane' | 'heart' | 'users' | 'child'

const paths: Record<IconName, JSX.Element> = {
  leaf: (
    <>
      <path d="M20 4c-9 0-14 4-14 10 0 2 .6 3.7 1.6 5C9 16 12 13 16 11c-3 2.5-5.6 5.4-7.4 9" />
      <path d="M5 20c1-3 2.4-5.5 4-7.5" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.7V16h5.2v-.4c0-.7.3-1.3.9-1.7A6 6 0 0 0 12 3z" />
    </>
  ),
  plane: (
    <>
      <path d="M21 4 3 11l6 2 2 6 4-5 6-10z" />
      <path d="M9 13l7-7" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.4-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.6 12 20 12 20z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9" r="2.6" />
      <path d="M16 14.2c2.6.5 4.5 2.7 4.5 5.3" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6.5" r="3" />
      <path d="M12 9.5v6M8.5 12.5h7M12 15.5 9.5 21M12 15.5 14.5 21" />
    </>
  ),
}

export function Icon({ name, size = 26 }: { name: IconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}
