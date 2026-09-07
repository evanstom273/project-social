import { PlaceholderPanel } from '@/components/ui/PlaceholderPanel';

type FeaturePlaceholderPageProps = {
	title: string;
	description: string;
};

export function FeaturePlaceholderPage({
	title,
	description,
}: FeaturePlaceholderPageProps) {
	return <PlaceholderPanel title={title} description={description} />;
}
