import Link from "next/link";

const links = [
  { href: "/organizations", label: "Organizations" },
  { href: "/organization-settings", label: "Organization Settings" },
  { href: "/user-settings", label: "User Settings" },
  { href: "/login", label: "Login" },
];

export default function Toolbar() {
  return (
    <nav className="w-full bg-background border-b px-4 py-2 flex gap-4 items-center shadow-sm">
      <span className="font-bold text-lg mr-4">TalkToYourData</span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-blue-600 hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
