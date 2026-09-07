import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PlaceholderPanel } from '@/components/ui/PlaceholderPanel';
import { ROUTES } from '@/config/constants';

export function LoginPage() {
  return (
    <Container width="feed">
      <PlaceholderPanel
        title="Sign in"
        description="Supabase Auth will power sign-in here. Sessions will be exposed through the application auth provider once implemented."
      >
        <ButtonLink to={ROUTES.signup} variant="secondary">
          Create an account
        </ButtonLink>
      </PlaceholderPanel>
    </Container>
  );
}
