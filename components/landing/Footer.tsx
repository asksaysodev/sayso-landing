/**
 * Site footer: logo, newsletter signup and social links on the left,
 * three link columns (Programs, Get in Touch, Legal) on the right, copyright
 * underneath.
 */
import Image from 'next/image';
import Link from 'next/link';
import { footerNav } from '@/lib/navigation';

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/asksayso',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/asksayso',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t-[5px] border-[#FFDE59] bg-[#1D4871] text-sm text-white/80">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-8 pt-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Sayso home" className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE59]">
            <Image src="/logos/logo-neg-transparent-horizontal.png" alt="Sayso" width={84} height={27} />
          </Link>
          <div className="mt-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FFDE59]">Subscribe to our newsletter</h3>
            <iframe
              src="https://subscribe-forms.beehiiv.com/de7b925b-6f1f-4557-9fde-cf8005c34c5f"
              className="h-[57px] w-full max-w-[414px] border-0"
              data-test-id="beehiiv-embed"
              data-analytics-id="form-newsletter-footer"
              scrolling="no"
              style={{ backgroundColor: 'transparent' }}
              title="Newsletter signup"
            />
          </div>
          <div className="mt-5 flex gap-2.5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Sayso on ${s.label}`}
                className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border-2 border-white/25 transition-colors hover:border-[#FFDE59] hover:text-[#FFDE59]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 content-start gap-6">
          {footerNav.map((section) => (
            <div key={section.label}>
              <h3 className="mb-2.5 font-comic text-base tracking-wider text-[#FFDE59]">{section.label.toUpperCase()}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-analytics-id={link.dataAnalyticsId}
                        className="block py-1 text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        data-analytics-id={link.dataAnalyticsId}
                        className="block py-1 text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-white/15 px-6 py-5 text-white/60">
        &copy; 2026 AskSayso, Inc.
      </div>
    </footer>
  );
}
