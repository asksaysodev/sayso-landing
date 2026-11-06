/** Overlapping round brokerage logos in the hero social proof row. Decorative; the text names the brokerages. */
import Image from 'next/image';
import { PROOF_LOGOS } from '../data';

export function ProofFaces() {
  return (
    <div className="flex" aria-hidden="true">
      {PROOF_LOGOS.map((logo, i) => (
        <span
          key={logo.src}
          className={`grid h-[34px] w-[34px] place-items-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_0_0_1px_rgba(29,72,113,0.14)] ${i ? '-ml-[9px]' : ''}`}
        >
          <Image src={logo.src} alt="" width={26} height={26} className="h-auto max-h-[26px] w-[78%] object-contain" />
        </span>
      ))}
    </div>
  );
}
