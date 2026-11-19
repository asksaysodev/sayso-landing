import { Button } from '@/components/ui/Button';
import { DEMO_FORM_ID } from '@/components/landing/PersonaAdShared/constants';

interface AdPageCTAButtonProps {
  location: string;
}

/** Closing CTA on the persona ad pages: the blue pill that scrolls back to the demo form. */
export function AdPageCTAButton({ location }: AdPageCTAButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <Button href={`#${DEMO_FORM_ID}`} data-analytics-id={`cta-book-demo-persona-${location}`}>
        Book my demo
      </Button>
    </div>
  );
}
