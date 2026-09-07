import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PlaceholderPanel } from '@/components/ui/PlaceholderPanel';
import { ROUTES } from '@/config/constants';

export function SignupPage() {
  return (
    <Container width="feed">
      <PlaceholderPanel
        title="Join early access"
        description="Account creation is not wired up yet. This route reserves the early-access flow described in the product concept."
      >
        <ButtonLink to={ROUTES.login} variant="secondary">
          Already have an account
        </ButtonLink>
      </PlaceholderPanel>
    </Container>
  );
}
