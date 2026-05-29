type IconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, string[]> = {
  whatsapp: [
    "M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5Z",
    "M8.9 7.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.5.6c-.1.2-.2.3 0 .6.4.8 1.1 1.5 1.8 2 .3.2.5.2.6 0l.8-.9c.2-.2.4-.2.7-.1l1.8.8c.3.1.4.3.4.6 0 .6-.4 1.5-1 1.8-.8.4-2.3.1-3.8-.8-1.9-1.1-3.5-2.8-4.2-4.7-.5-1.2-.1-2.1.2-2.4Z",
  ],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  back: ["M19 12H5", "m11 6-6-6 6-6"],
  factory: ["M3 20h18", "M5 20V9l5 3V9l5 3V5h4v15", "M8 17h2", "M13 17h2"],
  shirt: ["M8 4 5 6l-2 4 4 2v8h10v-8l4-2-2-4-3-2a4 4 0 0 1-8 0Z"],
  tag: ["M20 10 12 18 4 10V4h6l10 10Z", "M7 7h.1"],
  globe: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z", "M3 12h18", "M12 3c2.5 2.4 3.7 5.4 3.7 9S14.5 18.6 12 21", "M12 3c-2.5 2.4-3.7 5.4-3.7 9S9.5 18.6 12 21"],
  shield: ["M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z", "m9 12 2 2 4-5"],
  ruler: ["M4 17 17 4l3 3L7 20 4 17Z", "m14 7-2-2", "m11 10-2-2"],
  wave: ["M4 8c3-2 5 2 8 0s5 2 8 0", "M4 13c3-2 5 2 8 0s5 2 8 0", "M4 18c3-2 5 2 8 0s5 2 8 0"],
  mail: ["M4 6h16v12H4z", "m4 7 8 6 8-6"],
  info: ["M12 17v-5", "M12 8h.1", "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"],
  box: ["M21 8 12 3 3 8l9 5 9-5Z", "M3 8v8l9 5 9-5V8", "M12 13v8"],
  check: ["M20 6 9 17l-5-5"],
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M22 21v-2a4 4 0 0 0-3-3.9", "M16 3.1a4 4 0 0 1 0 7.8"],
  clinic: ["M12 5v14", "M5 12h14", "M4 4h16v16H4z"],
  handshake: ["M8 12 5 9l4-4 3 3", "M16 12l3-3-4-4-3 3", "M9 13l3 3 3-3"],
  headset: ["M4 12a8 8 0 0 1 16 0v4", "M4 14h3v4H4z", "M17 14h3v4h-3z", "M14 20h-3"],
  clipboard: ["M9 4h6v4H9z", "M8 6H6v15h12V6h-2", "M9 13h6", "M9 17h4"],
};

export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      {(paths[name] ?? paths.check).map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
