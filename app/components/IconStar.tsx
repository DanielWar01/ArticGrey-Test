export default function IconStar({color, size}: {color: string; size: number}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      className={`${color}`} // Aquí se aplica color y tamaño
    >
      <path
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 9.91 8.65 3 9.24l5.46 4.73L5.82 21z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
