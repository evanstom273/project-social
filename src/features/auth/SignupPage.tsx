import { ButtonLink } from '@/components/ui/Button';
import { PlaceholderPanel } from '@/components/ui/PlaceholderPanel';
import { ROUTES } from '@/config/constants';

export function SignupPage() {
	return (
		<PlaceholderPanel
			title="Join early access"
			description="Account creation is not wired up yet. This route reserves the early-access flow described in the product concept."
		>
			<ButtonLink to={ROUTES.login} variant="secondary">
				Already have an account
			</ButtonLink>
		</PlaceholderPanel>
	);
}
