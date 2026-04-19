import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

export function NavbarMinimal() {
  return (
    <nav className="bg-background border-b border-primary/10 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Text as="span" className="font-bold text-xl text-primary">
            Sayso
          </Text>
          <Button variant="primary" href="#cta" data-analytics-id="cta-get-started-navbar-minimal">
            Get Started
          </Button>
        </div>
      </Container>
    </nav>
  );
}
