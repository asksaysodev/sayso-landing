/** The white Sayso wordmark, used as the header of Sayso's navy Compare column and card. */
import Image from 'next/image';

export function SaysoLogo({ className }: { className?: string }) {
  return <Image src="/logos/logo-neg-transparent-horizontal.png" alt="Sayso" width={1584} height={507} className={className} />;
}
