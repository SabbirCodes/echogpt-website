import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Logo } from "../logo";

const columns = [
  {
    heading: "Product",
    links: [
      ["Features", "#features"],
      ["Models", "#models"],
      ["Pricing", "#pricing"],
      ["Extension", "#extension"],
    ],
  },
  {
    heading: "Company",
    links: [
      ["FAQ", "#faq"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 sm:grid-cols-3 md:grid-cols-4">
          <div className="sm:col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sub">
              One workspace for every top AI model. Chat, compare, and get work
              done without juggling tabs.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EchoGPT on X"
                className="grid size-9 place-items-center rounded-lg border border-line text-sub transition-colors hover:border-brand hover:text-ink"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EchoGPT on GitHub"
                className="grid size-9 place-items-center rounded-lg border border-line text-sub transition-colors hover:border-brand hover:text-ink"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>


          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-sm font-semibold text-ink">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-sub transition-colors hover:text-ink"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-center">
          <p className="text-xs text-sub">
            © {currentYear} EchoGPT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}