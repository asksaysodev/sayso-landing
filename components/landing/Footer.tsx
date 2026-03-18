import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';

export function Footer() {
  return (
    <footer className="relative bg-[#1D4871] border-t-4 border-[#FFDE59]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-10">
          {/* Left Column: Logo + Description */}
          <div className="space-y-3">
            <a
              href="/"
              className="flex items-center gap-2 text-white font-bold text-lg md:text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:ring-offset-2 focus:ring-offset-[#1D4871] rounded-lg px-2 -ml-2 w-fit"
              aria-label="Sayso home"
            >
              <Image src="/logo-neg-transparent-horizontal.png" alt="Sayso" height={32} width={80}/>
            </a>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Win the Moment — your real-time call superpower.
            </p>
            <div className="pt-2">
              <h3 className="text-xs tracking-widest uppercase text-[#FFDE59] font-bold mb-2">Subscribe to our newsletter</h3>
              <iframe
                src="https://subscribe-forms.beehiiv.com/de7b925b-6f1f-4557-9fde-cf8005c34c5f"
                className="w-full max-w-[414px] h-[57px] border-0"
                data-test-id="beehiiv-embed"
                scrolling="no"
                style={{ backgroundColor: 'transparent' }}
                title="Newsletter signup"
              />
            </div>
          </div>

          {/* Right Column: Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-8 lg:gap-10">
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest uppercase text-[#FFDE59] font-bold">Product</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors ">How it works</a></li>
                <li><a href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</a></li>
                {/* <li><a href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</a></li> */}
                <li><a href="/demo" className="text-sm text-white/70 hover:text-white transition-colors ">Demo</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest uppercase text-[#FFDE59] font-bold">Programs</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/referral" className="text-sm text-white/70 hover:text-white transition-colors ">Referral program</a></li>
                <li><a href="/affiliate" className="text-sm text-white/70 hover:text-white transition-colors ">Affiliate program</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest uppercase text-[#FFDE59] font-bold">Company</h3>
              <ul className="space-y-2">
                <li><a href="#security" className="text-sm text-white/70 hover:text-white transition-colors">Security</a></li>
                <li><a href="mailto:support@asksayso.com" className="text-sm text-white/70 hover:text-white transition-colors">Help</a></li>
                <li><a href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest uppercase text-[#FFDE59] font-bold">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-sm text-white/70 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest uppercase text-[#FFDE59] font-bold">Follow Us</h3>
              <div className="flex items-center gap-4 pt-1">
                <a href="https://www.linkedin.com/company/asksayso" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/asksayso" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50 flex items-center gap-1.5">
            <LightningIcon size={12} className="inline-block" />
            &copy; 2026 AskSayso, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <a href="/privacy" className="hover:text-white/70 transition-colors">Privacy</a>
            <span>&bull;</span>
            <a href="/terms" className="hover:text-white/70 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Subtle superhero Easter egg in corner */}
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <Image
          src="/sayso_superhero_point_right.png"
          alt=""
          width={48}
          height={51}
          className="w-10 md:w-12 h-auto opacity-20"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
