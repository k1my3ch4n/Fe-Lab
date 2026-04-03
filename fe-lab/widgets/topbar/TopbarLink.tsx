import Link from "next/link";

interface TopbarLinkProps {
  href: string;
  label: string;
  currentPath: string;
}

export default function TopbarLink({
  href,
  label,
  currentPath,
}: TopbarLinkProps) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`
        font-[family-name:var(--font-mono)] text-[11px] px-3.5 py-1.5 rounded-md
        border transition-all duration-200 no-underline
        ${
          isActive
            ? "bg-accent-cyan-dim border-accent-cyan text-accent-cyan"
            : "border-border-subtle bg-transparent text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
        }
      `}
    >
      {label}
    </Link>
  );
}
